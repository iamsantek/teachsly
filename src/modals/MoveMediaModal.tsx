import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Select,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { MediaFolder } from "../API";
import { UserDashboardContext } from "../contexts/UserDashboardContext";
import { FetchType } from "../enums/Media";
import MediaFolderService from "../services/MediaFolderService";
import MediaService from "../services/MediaService";
import { groupsToString } from "../utils/CourseUtils";
import { translate } from "../utils/LanguageUtils";
import { toastConfig } from "../utils/ToastUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mediaIds: string[];
  onBulkComplete: () => void;
}

export const MoveMediaModal = ({
  isOpen,
  onClose,
  mediaIds,
  onBulkComplete,
}: Props) => {
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [bulkActionInProgress, setBulkActionInProgress] =
    useState<boolean>(false);

  const toast = useToast();

  const {
    context: { courses },
  } = useContext(UserDashboardContext);

  const fetchFolders = useCallback(async () => {
    if (!isOpen) {
      return;
    }
    const folders = await MediaFolderService.fetchMediaFolders(
      FetchType.FOLDER,
      null,
      nextPageToken
    );

    if (folders?.listMediaFolders?.items) {
      setFolders((prevFolders) => [
        ...prevFolders,
        ...(folders.listMediaFolders?.items as MediaFolder[]),
      ]);
    }

    if (folders?.listMediaFolders?.nextToken) {
      console.log("AAAAAA");
      setNextPageToken(folders.listMediaFolders.nextToken);
    } else {
      setIsLoading(false);
    }
  }, [nextPageToken, isOpen]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const onMove = async () => {
    setBulkActionInProgress(true);
    const bulkMove = await MediaService.moveToFolderBulk(
      mediaIds,
      selectedFolder
    );
    setBulkActionInProgress(false);

    if (bulkMove) {
      onBulkComplete();
    }

    toast(
      toastConfig({
        description: bulkMove ? "BULK_UPDATE_OK" : "BULK_UPDATE_ERROR",
        status: bulkMove ? "success" : "error",
      })
    );
  };

  return (
    <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle={"paragraph"} flex="1" flexDirection="row">
          {mediaIds.length} {translate("SELECTED_ELEMENTS")}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody marginBottom={3}>
          <Stack spacing={4}>
            <Text textStyle={"title"}>{translate("MOVE_CONTENTS_TO")}</Text>
          </Stack>
          {!isLoading && (
            <Select
              placeholder={translate("SELECT_FOLDER")}
              onChange={(e) => {
                setSelectedFolder(e.target.value);
              }}
            >
              <option value="">{translate("NO_FOLDER")}</option>
              {folders.map((folder) => {
                const groupNames = groupsToString(courses, folder.groups);
                return (
                  <option key={folder.id} value={folder.id}>
                    {folder.name} ({groupNames.join(", ")})
                  </option>
                );
              })}
            </Select>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            onClick={onClose}
            isLoading={bulkActionInProgress}
          >
            {translate("CANCEL")}
          </Button>
          <Button isLoading={bulkActionInProgress} onClick={onMove}>
            {translate("MOVE")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
