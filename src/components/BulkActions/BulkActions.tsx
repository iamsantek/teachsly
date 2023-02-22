import { Flex, Text, useToast, chakra } from "@chakra-ui/react";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BsFolderSymlinkFill } from "react-icons/bs";
import { TooltipHelper } from "../Tooltips/Tooltip";
import { translate } from "../../utils/LanguageUtils";
import { useLocation } from "react-router-dom";

export type BulkActionType = "delete" | "move";

interface Props {
  selectedIds: string[];
  allowedActions?: BulkActionType[];
  onAction?: (action: BulkActionType) => void;
}

type ToastProps = Props & {
  onClose: () => void;
};

const Toast = ({
  selectedIds,
  allowedActions,
  onAction,
  onClose,
}: ToastProps) => {
  const MoveIcon = chakra(BsFolderSymlinkFill);
  const DeleteIcon = chakra(AiFillDelete);

  const handleAction = useCallback(
    (action: BulkActionType) => {
      onAction?.(action);
      onClose();
    },
    [onAction, onClose]
  );

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text>{`${selectedIds.length} ${translate("SELECTED_ELEMENTS")}`}</Text>
      <Flex gap={3}>
        {allowedActions?.includes("move") && (
          <TooltipHelper gutter={25} label={translate("MOVE_TO_FOLDER")}>
            <span>
              <MoveIcon cursor="pointer" onClick={() => handleAction("move")} />
            </span>
          </TooltipHelper>
        )}
        {allowedActions?.includes("delete") && (
          <TooltipHelper gutter={25} label={translate("DELETE_CONTENTS")}>
            <span>
              <DeleteIcon
                cursor="pointer"
                onClick={() => handleAction("delete")}
              />
            </span>
          </TooltipHelper>
        )}
      </Flex>
    </Flex>
  );
};

export const BulkActions = ({
  selectedIds,
  allowedActions,
  onAction,
}: Props) => {
  const toast = useToast();
  const id = "toast-id";
  const toastIdRef = useRef<string | number>();
  const location = useLocation();

  const onClose = useCallback(() => {
    toast.close(toastIdRef?.current as string | number);
  }, [toast]);

  useEffect(() => {
    return () => onClose();
  }, [location.pathname, onClose]);

  const ToastMemoized = useMemo(
    () => (
      <Toast
        selectedIds={selectedIds}
        allowedActions={allowedActions}
        onAction={onAction}
        onClose={onClose}
      />
    ),
    [selectedIds, allowedActions, onAction, onClose]
  );

  if (selectedIds.length > 0 && !toast.isActive(id)) {
    toastIdRef.current = toast({
      title: <>{ToastMemoized}</>,
      duration: null,
      id,
    });
  }

  useEffect(() => {
    if (selectedIds.length === 0) {
      onClose();
      return;
    }

    toast.update(toastIdRef?.current as string | number, {
      description: <>{ToastMemoized}</>,
    });
  }, [selectedIds, toast, ToastMemoized, onClose]);

  return <></>;
};
