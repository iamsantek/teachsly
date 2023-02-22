import { useState, useEffect, useContext } from "react";
import { Media as PlatformMedia } from "../../interfaces/Media";
import { Box, Stack, useToast } from "@chakra-ui/react";
import MediaService from "../../services/MediaService";
import { ViewMediaContentModal } from "../../modals/ViewMediaContentModal";
import MediaCRUDModal from "../../modals/MediaCRUDModal";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { isAdmin, isTeacher } from "../../utils/CognitoGroupsUtils";
import { ConfirmationDialog } from "../../components/AlertDialog/ConfirmationDialog";
import { MediaFolderCardsList } from "./folders/MediaFolderCardsList";
import { MediaContentsLines } from "./MediaContentsLines";
import { Media as MediaAPI } from "../../API";
import { FetchType } from "../../enums/Media";
import { useParams } from "react-router-dom";
import { toastConfig } from "../../utils/ToastUtils";
import {
  BulkActions,
  BulkActionType,
} from "../../components/BulkActions/BulkActions";
import { MoveMediaModal } from "../../modals/MoveMediaModal";

interface Props {
  medias: MediaAPI[];
  isLoading: boolean;
  showCRUDModal: boolean;
  onCRUDModalVisibilityChange: (value: boolean) => void;
  fetchType: FetchType;
  folderGroups?: string[];
  onDeleteFolderComplete: () => void;
}

export const MediaContentsList = ({
  medias,
  isLoading,
  showCRUDModal,
  onCRUDModalVisibilityChange,
  fetchType,
  folderGroups,
  onDeleteFolderComplete,
}: Props) => {
  const [renderMedias, setRenderMedias] = useState<MediaAPI[]>([]);
  const [viewMediaContentModalVisibility, setViewMediaContentModalVisibility] =
    useState<boolean>(false);
  const [moveMediaModalVisibility, setMoveMediaModalVisibility] =
    useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<MediaAPI | undefined>(
    undefined
  );
  const [selectedMediaIds, setSelectedMediaIds] = useState<string[]>([]);
  const [showBulkDeleteConfirmation, setShowBulkDeleteConfirmation] =
    useState<boolean>(false);

  const { folderId } = useParams();
  const toast = useToast();
  const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] =
    useState<boolean>(false);

  useEffect(() => {
    setRenderMedias(medias);
  }, [medias]);

  const onDownload = async (media: MediaAPI) => {
    await MediaService.redirectToMediaUrl(media);
  };

  const onView = (media: MediaAPI) => {
    setSelectedMedia(media);
    setViewMediaContentModalVisibility(true);
  };

  const onEdit = (media: MediaAPI) => {
    setSelectedMedia(media);
    onCRUDModalVisibilityChange(true);
  };

  const onClose = (modal: "ViewMediaContentModal" | "MediaCRUDModal") => {
    setSelectedMedia(undefined);

    modal === "MediaCRUDModal"
      ? onCRUDModalVisibilityChange(false)
      : setViewMediaContentModalVisibility(false);
  };

  const showDeleteContentDialog = (mediaToDelete: MediaAPI) => {
    setShowDeleteUserConfirmation(true);
    setSelectedMedia(mediaToDelete);
  };

  const onDelete = async () => {
    const isSuccessfullyDeleted = await MediaService.deleteMedia(
      selectedMedia?.id as string
    );

    if (isSuccessfullyDeleted) {
      setRenderMedias((medias) =>
        medias.filter((media) => media.id !== selectedMedia?.id)
      );

      setShowDeleteUserConfirmation(false);
      setSelectedMedia(undefined);

      toast(
        toastConfig({
          status: "success",
          description: "MEDIA_DELETED",
        })
      );
    }
  };

  const onUpdate = (updatedMedia: MediaAPI) => {
    const updatedMedias = [...renderMedias];
    const index = renderMedias.indexOf(
      renderMedias.find((media) => media.id === updatedMedia.id) as MediaAPI
    );
    updatedMedias[index] = updatedMedia;
    setRenderMedias(updatedMedias);
  };

  const {
    context: { user },
  } = useContext(UserDashboardContext);
  const hasAdminRole = isAdmin(user);
  const hasTeacherRole = isTeacher(user);

  const onCheckHandler = (id?: string, checked?: boolean) => {
    if (!id) {
      return;
    }
    if (checked) {
      setSelectedMediaIds([...selectedMediaIds, id]);
      return;
    }

    setSelectedMediaIds(selectedMediaIds.filter((mediaId) => mediaId !== id));
  };

  const onBulkAction = (action: BulkActionType) => {
    switch (action) {
      case "delete":
        setShowBulkDeleteConfirmation(true);
        break;
      case "move":
        setMoveMediaModalVisibility(true);
        break;
      default:
        break;
    }
  };

  const onDeleteBulk = async () => {
    const bulkDelete = await MediaService.bulkDelete(selectedMediaIds);

    if (bulkDelete) {
      setRenderMedias((medias) =>
        medias.filter((media) => !selectedMediaIds.includes(media.id))
      );
    }

    toast(
      toastConfig({
        description: bulkDelete ? "BULK_DELETE_OK" : "BULK_DELETE_ERROR",
        status: bulkDelete ? "success" : "error",
      })
    );

    setShowBulkDeleteConfirmation(false);
    setSelectedMediaIds([]);
  };

  return (
    <>
      <ViewMediaContentModal
        media={selectedMedia as PlatformMedia}
        isOpen={viewMediaContentModalVisibility}
        onClose={() => onClose("ViewMediaContentModal")}
      />
      <MoveMediaModal
        isOpen={moveMediaModalVisibility}
        onClose={() => setMoveMediaModalVisibility(false)}
        mediaIds={selectedMediaIds}
        onBulkComplete={() => {
          setMoveMediaModalVisibility(false);
          setSelectedMediaIds([]);
          setRenderMedias((medias) =>
            medias.filter((media) => !selectedMediaIds.includes(media.id))
          );
        }}
      />

      <ConfirmationDialog
        isOpen={showDeleteUserConfirmation || showBulkDeleteConfirmation}
        onClose={() => {
          setShowDeleteUserConfirmation(false);
          setShowBulkDeleteConfirmation(false);
        }}
        title={
          showBulkDeleteConfirmation
            ? "MEDIA_BULK_DELETE_TITLE"
            : "DELETE_MEDIA_TITLE"
        }
        description={
          showBulkDeleteConfirmation
            ? "MEDIA_BULK_DELETE_DESCRIPTION"
            : "DELETE_MEDIA_CONFIRMATION_MESSAGE"
        }
        confirmButtonText={"DELETE"}
        onAction={showBulkDeleteConfirmation ? onDeleteBulk : onDelete}
      />

      {(hasAdminRole || hasTeacherRole) && (
        <MediaCRUDModal
          isOpen={showCRUDModal}
          onUpdate={onUpdate}
          onClose={() => onClose("MediaCRUDModal")}
          onCreate={(media) => setRenderMedias([media, ...medias])}
          mediaToUpdate={selectedMedia}
          folderGroups={folderGroups}
        />
      )}
      <Stack spacing={10} flexDirection="column">
        <Box>
          <MediaFolderCardsList
            fetchType={fetchType}
            onDeleteFolderComplete={onDeleteFolderComplete}
          />
        </Box>
        <Box>
          <BulkActions
            selectedIds={selectedMediaIds}
            allowedActions={["move", "delete"]}
            onAction={onBulkAction}
          />
          <MediaContentsLines
            medias={renderMedias}
            onDownload={onDownload}
            isLoading={isLoading}
            onView={onView}
            onEdit={onEdit}
            onDelete={showDeleteContentDialog}
            showSeenOpacity={true}
            onCheck={onCheckHandler}
            mediaCheckedIds={selectedMediaIds}
          />
        </Box>
      </Stack>
    </>
  );
};
