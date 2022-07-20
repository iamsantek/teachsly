import { Divider, Stack } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { MdFolder } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { MediaFolder } from '../../../API'
import { ContentLine } from '../../../components/ContentLine/ContentLine'
import { FetchType } from '../../../enums/Media'
import MediaFolderService from '../../../services/MediaFolderService'
import { CommonContentLineTitle } from '../CommonContentLineTitle'
import { useUserGroups } from '../../../hooks/useUserGroups'
import { BadgeList } from '../../../components/Badges/BadgeList'
import { DeleteFolderConfirmation } from '../../../components/AlertDialog/DeleteFolderConfirmation'
import { DeletingFolder } from '../../../interfaces/MediaFolder'
import { DeleteFolderMethod } from '../../../enums/MediaFolder'
import { ToastNotification } from '../../../observables/ToastNotification'
import { findMatch } from '../../../utils/GeneralUtils'

interface Props {
  fetchType: FetchType
  onDeleteFolderComplete: (folderId: string) => void
}

export const MediaFolderCardsList = ({ fetchType, onDeleteFolderComplete }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [folders, setFolders] = useState<MediaFolder[]>([])
  const [showDeleteFolderMessage, setShowDeleteFolderMessage] = useState<boolean>(false)
  const [deletingFolder, setDeletingFolder] = useState<DeletingFolder | undefined>(undefined)
  const { courseId } = useParams()
  const { hasEditPermission, hasAdminRole, groups } = useUserGroups()
  const navigate = useNavigate()

  const fetchFolders = useCallback(async () => {
    const folders = await MediaFolderService.fetchMediaFolders(fetchType, courseId)

    const matchedFolder = findMatch(folders?.listMediaFolders?.items as MediaFolder[], groups.map(group => group.externalId))

    setFolders(matchedFolder || [])
  }, [fetchType, courseId, groups])

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  const deleteFolder = useCallback(async (folderId: string, deleteMethod: DeleteFolderMethod) => {
    setIsLoading(true)
    const deletedMediaFolder = await MediaFolderService.deleteMediaFolder(folderId, deleteMethod)

    ToastNotification({
      description: deletedMediaFolder ? 'FOLDER_DELETED' : 'FOLDER_DELETE_FAILED',
      status: deletedMediaFolder ? 'SUCCESS' : 'ERROR'
    })

    if (deletedMediaFolder) {
      setFolders(folders => folders.filter((folder) => folder.id !== folderId))
    }

    setShowDeleteFolderMessage(false)
    setDeletingFolder(undefined)
    setIsLoading(false)

    if (deleteMethod === DeleteFolderMethod.DELETE_FOLDER) {
      onDeleteFolderComplete(folderId)
    }
  }, [onDeleteFolderComplete])

  const onDeleteFolder = useCallback((deletedFolder: DeletingFolder, deleteMethod: DeleteFolderMethod) => {
    setDeletingFolder(deletedFolder)
    setShowDeleteFolderMessage(true)
    deleteFolder(deletedFolder.folderId, deleteMethod)
  }, [deleteFolder])

  const showDeleteConfirmation = useCallback((deleteFolder: DeletingFolder) => {
    setShowDeleteFolderMessage(true)
    setDeletingFolder(deleteFolder)
  }, [])

  return (
    <Stack>
      <DeleteFolderConfirmation
        isOpen={showDeleteFolderMessage}
        onClose={() => {
          setShowDeleteFolderMessage(false)
          setDeletingFolder(undefined)
        }}
        deletingFolder={deletingFolder}
        onConfirm={onDeleteFolder}
        isProcessing={isLoading}
      />
      {folders.map((folder) => (
        <ContentLine
          key={folder.id}
          leftIcon={<MdFolder />}
          onView={() => navigate(`/medias/folder/${folder.id}`)}
          onEdit={hasEditPermission ? () => navigate(`/medias/folder/${folder.id}/edit`) : undefined}
          onDelete={hasAdminRole ? () => showDeleteConfirmation({ folderId: folder.id, folderName: folder.name }) : undefined}
        >
          <CommonContentLineTitle title={folder.name}>
            <BadgeList badges={folder.groups} />
          </CommonContentLineTitle>
        </ContentLine>
      ))}
      {folders.length !== 0 && <Divider />}
    </Stack>
  )
}
