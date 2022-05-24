import { useState, useEffect, useContext } from 'react'
import { Media as PlatformMedia } from '../../interfaces/Media'
import { Box, Stack } from '@chakra-ui/react'
import MediaService from '../../services/MediaService'
import { ViewMediaContentModal } from '../../modals/ViewMediaContentModal'
import MediaCRUDModal from '../../modals/MediaCRUDModal'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { ToastNotification } from '../../observables/ToastNotification'
import { isAdmin, isTeacher } from '../../utils/CognitoGroupsUtils'
import { ConfirmationDialog } from '../../components/AlertDialog/ConfirmationDialog'
import { MediaFolderCardsList } from './folders/MediaFolderCardsList'
import { MediaContentsLines } from './MediaContentsLines'
import { Media as MediaAPI } from '../../API'
import { FetchType } from '../../enums/Media'
import { useParams } from 'react-router-dom'

interface Props {
  medias: MediaAPI[]
  isLoading: boolean
  showCRUDModal: boolean
  onCRUDModalVisibilityChange: (value: boolean) => void
  fetchType: FetchType
  folderGroups?: string[]
  onDeleteFolderComplete: () => void
}

export const MediaContentsList = ({ medias, isLoading, showCRUDModal, onCRUDModalVisibilityChange, fetchType, folderGroups, onDeleteFolderComplete }: Props) => {
  const [renderMedias, setRenderMedias] = useState<MediaAPI[]>([])
  const [viewMediaContentModalVisibility, setViewMediaContentModalVisibility] =
    useState<boolean>(false)
  const [selectedMedia, setSelectedMedia] = useState<MediaAPI | undefined>(
    undefined
  )

  const { folderId } = useParams()
  const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] = useState<boolean>(false)

  useEffect(() => {
    setRenderMedias(medias)
  }, [medias])

  const onDownload = async (media: MediaAPI) => {
    await MediaService.redirectToMediaUrl(media)
  }

  const onView = (media: MediaAPI) => {
    setSelectedMedia(media)
    setViewMediaContentModalVisibility(true)
  }

  const onEdit = (media: MediaAPI) => {
    setSelectedMedia(media)
    onCRUDModalVisibilityChange(true)
  }

  const onClose = (modal: 'ViewMediaContentModal' | 'MediaCRUDModal') => {
    setSelectedMedia(undefined)

    modal === 'MediaCRUDModal' ? onCRUDModalVisibilityChange(false) : setViewMediaContentModalVisibility(false)
  }

  const showDeleteContentDialog = (mediaToDelete: MediaAPI) => {
    setShowDeleteUserConfirmation(true)
    setSelectedMedia(mediaToDelete)
  }

  const onDelete = async () => {
    const isSuccessfullyDeleted = await MediaService.deleteMedia(
      selectedMedia?.id as string
    )

    if (isSuccessfullyDeleted) {
      setRenderMedias((medias) =>
        medias.filter((media) => media.id !== selectedMedia?.id)
      )

      setShowDeleteUserConfirmation(false)
      setSelectedMedia(undefined)

      ToastNotification({
        status: 'SUCCESS',
        description: 'MEDIA_DELETED'
      })
    }
  }

  const onUpdate = (updatedMedia: MediaAPI) => {
    const updatedMedias = [...renderMedias]
    const index = renderMedias.indexOf(
      renderMedias.find((media) => media.id === updatedMedia.id) as MediaAPI
    )
    updatedMedias[index] = updatedMedia
    setRenderMedias(updatedMedias)
  }

  const { context: { user } } = useContext(UserDashboardContext)
  const hasAdminRole = isAdmin(user)
  const hasTeacherRole = isTeacher(user)

  return (
    <>
      <ViewMediaContentModal
        media={selectedMedia as PlatformMedia}
        isOpen={viewMediaContentModalVisibility}
        onClose={() => onClose('ViewMediaContentModal')}
      />

      <ConfirmationDialog
        isOpen={showDeleteUserConfirmation}
        onClose={() => setShowDeleteUserConfirmation(false)}
        title='DELETE_MEDIA_TITLE'
        description='DELETE_MEDIA_CONFIRMATION_MESSAGE'
        confirmButtonText={'DELETE'}
        onAction={onDelete}
      />

      {(hasAdminRole || hasTeacherRole) && (
        <MediaCRUDModal
          isOpen={showCRUDModal}
          onUpdate={onUpdate}
          onClose={() => onClose('MediaCRUDModal')}
          onCreate={(media) => setRenderMedias([media, ...medias])}
          mediaToUpdate={selectedMedia}
          folderGroups={folderGroups}
        />
      )}
      <Stack spacing={10} flexDirection='column'>
        {!folderId && (
          <>
            <Box>
              <MediaFolderCardsList
              fetchType={fetchType}
              onDeleteFolderComplete={onDeleteFolderComplete}
              />
            </Box>
          </>
        )}
        <Box>
          <MediaContentsLines
            medias={renderMedias}
            onDownload={onDownload}
            isLoading={isLoading}
            onView={onView}
            onEdit={onEdit}
            onDelete={showDeleteContentDialog}
          />
        </Box>
      </Stack>
    </>
  )
}
