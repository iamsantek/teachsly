import { Divider, Stack, useToast } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { MdFolder } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { EnglishLevel, MediaFolder } from "../../../API";
import { ContentLine } from "../../../components/ContentLine/ContentLine";
import { FetchType } from "../../../enums/Media";
import MediaFolderService from "../../../services/MediaFolderService";
import { CommonContentLineTitle } from "../CommonContentLineTitle";
import { useUserGroups } from "../../../hooks/useUserGroups";
import { BadgeList } from "../../../components/Badges/BadgeList";
import { DeleteFolderConfirmation } from "../../../components/AlertDialog/DeleteFolderConfirmation";
import { DeletingFolder } from "../../../interfaces/MediaFolder";
import { DeleteFolderMethod } from "../../../enums/MediaFolder";
import { findMatch } from "../../../utils/GeneralUtils";
import { UserDashboardContext } from "../../../contexts/UserDashboardContext";
import { toastConfig } from "../../../utils/ToastUtils";

interface Props {
  fetchType: FetchType;
  onDeleteFolderComplete: (folderId: string) => void;
}

export const MediaFolderCardsList = ({
  fetchType,
  onDeleteFolderComplete,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [folders, setFolders] = useState<MediaFolder[]>([]);
  const [showDeleteFolderMessage, setShowDeleteFolderMessage] =
    useState<boolean>(false);
  const [deletingFolder, setDeletingFolder] = useState<
    DeletingFolder | undefined
  >(undefined);
  const { courseId, folderId } = useParams();
  const { hasEditPermission, hasAdminRole, groups, userType } = useUserGroups();
  const navigate = useNavigate();
  const {
    context: { user },
  } = useContext(UserDashboardContext);
  const toast = useToast();
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);

  const fetchFolders = useCallback(async () => {
    const folders = await MediaFolderService.fetchMediaFolders(
      fetchType,
      courseId,
      nextToken,
      folderId
    );

    if (folders?.listMediaFolders?.nextToken) {
      setNextToken(folders.listMediaFolders.nextToken);
    }

    const matchedFolder = findMatch(
      folders?.listMediaFolders?.items as MediaFolder[],
      groups.map((group) => group.externalId),
      userType,
      user?.englishLevel as EnglishLevel
    );

    setFolders(matchedFolder || []);
  }, [
    fetchType,
    courseId,
    userType,
    user?.englishLevel,
    nextToken,
    folderId,
    groups,
  ]);

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const deleteFolder = useCallback(
    async (folderId: string, deleteMethod: DeleteFolderMethod) => {
      setIsLoading(true);
      const deletedMediaFolder = await MediaFolderService.deleteMediaFolder(
        folderId,
        deleteMethod
      );

      toast(
        toastConfig({
          description: deletedMediaFolder
            ? "FOLDER_DELETED"
            : "FOLDER_DELETE_FAILED",
          status: deletedMediaFolder ? "success" : "error",
        })
      );

      if (deletedMediaFolder) {
        setFolders((folders) =>
          folders.filter((folder) => folder.id !== folderId)
        );
      }

      setShowDeleteFolderMessage(false);
      setDeletingFolder(undefined);
      setIsLoading(false);

      if (deleteMethod === DeleteFolderMethod.DELETE_FOLDER) {
        onDeleteFolderComplete(folderId);
      }
    },
    [onDeleteFolderComplete]
  );

  const onDeleteFolder = useCallback(
    (deletedFolder: DeletingFolder, deleteMethod: DeleteFolderMethod) => {
      setDeletingFolder(deletedFolder);
      setShowDeleteFolderMessage(true);
      deleteFolder(deletedFolder.folderId, deleteMethod);
    },
    [deleteFolder]
  );

  const showDeleteConfirmation = useCallback((deleteFolder: DeletingFolder) => {
    setShowDeleteFolderMessage(true);
    setDeletingFolder(deleteFolder);
  }, []);

  const onNavigateToFolder = useCallback(
    (folderId: string) => {
      navigate(`/medias/folder/${folderId}`);
      window.scrollTo(0, 0);
    },
    [navigate]
  );

  return (
    <Stack>
      <DeleteFolderConfirmation
        isOpen={showDeleteFolderMessage}
        onClose={() => {
          setShowDeleteFolderMessage(false);
          setDeletingFolder(undefined);
        }}
        deletingFolder={deletingFolder}
        onConfirm={onDeleteFolder}
        isProcessing={isLoading}
      />
      {folders.map((folder) => (
        <ContentLine
          key={folder.id}
          leftIcon={<MdFolder />}
          onView={() => onNavigateToFolder(folder.id)}
          onEdit={
            hasEditPermission
              ? () => navigate(`/medias/folder/${folder.id}/edit`)
              : undefined
          }
          onDelete={
            hasAdminRole
              ? () =>
                  showDeleteConfirmation({
                    folderId: folder.id,
                    folderName: folder.name,
                  })
              : undefined
          }
        >
          <CommonContentLineTitle id={folder.id} title={folder.name}>
            {hasEditPermission && <BadgeList badges={folder.groups} />}
          </CommonContentLineTitle>
        </ContentLine>
      ))}
      {folders.length !== 0 && <Divider />}
    </Stack>
  );
};
