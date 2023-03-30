import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Radio,
  Stack,
  RadioGroup,
  Flex,
  Text,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { DeleteFolderMethod } from "../../enums/MediaFolder";
import { DeletingFolder } from "../../interfaces/MediaFolder";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deletingFolder?: DeletingFolder;
  onConfirm: (
    folderToDelete: DeletingFolder,
    method: DeleteFolderMethod
  ) => void;
  isProcessing: boolean;
}

export const DeleteFolderConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  deletingFolder,
  isProcessing,
}: Props) => {
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");
  const [deleteMethod, setDeleteMethod] = useState<DeleteFolderMethod>(
    DeleteFolderMethod.DELETE_FOLDER
  );
  const cancelRef = useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef as any}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {translate("DELETE_FOLDER") +
              " " +
              (deletingFolder?.folderName || "")}
          </AlertDialogHeader>
          <AlertDialogBody display="flex" flexDirection="column" gap={5}>
            <RadioGroup
              defaultValue={DeleteFolderMethod.DELETE_FOLDER}
              onChange={(value) => setDeleteMethod(value as DeleteFolderMethod)}
            >
              <Stack gap={3}>
                <Radio
                  size="md"
                  name="type"
                  value={DeleteFolderMethod.DELETE_FOLDER_AND_MEDIA}
                  colorScheme="brand"
                >
                  {translate("DELETE_FOLDER_DESCRIPTION")}
                </Radio>
                <Radio
                  size="md"
                  name="type"
                  value={DeleteFolderMethod.DELETE_FOLDER}
                  colorScheme="brand"
                >
                  <Flex flexDirection="column">
                    <Text>{translate("DELETE_ONLY_FOLDER_DESCRIPTION")}</Text>
                    <Text fontWeight="light" color="gray.500" fontSize="sm">
                      {translate("DELETE_ONLY_FOLDER_HELPER_TEXT")}
                    </Text>
                  </Flex>
                </Radio>
              </Stack>
            </RadioGroup>
            <Spacer />
            <Text>{translate("DELETE_FOLDER_PLACEHOLDER")}</Text>
            <Input
              value={confirmationMessage}
              onChange={(e) => setConfirmationMessage(e.target.value)}
              variant="outline"
              placeholder={deletingFolder?.folderName}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef.current} onClick={onClose}>
              {translate("CANCEL")}
            </Button>
            <Button
              colorScheme="red"
              onClick={() =>
                onConfirm(deletingFolder as DeletingFolder, deleteMethod)
              }
              ml={3}
              isDisabled={confirmationMessage !== deletingFolder?.folderName}
              isLoading={isProcessing}
              loadingText={translate("PROCESSING")}
            >
              {translate("DELETE")}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
