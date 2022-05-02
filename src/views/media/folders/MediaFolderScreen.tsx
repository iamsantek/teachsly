import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DragAndDropZone } from '../../../components/DragAndDrop/DragAndDropZone'
import { SectionHeader } from '../../../components/Headers/SectionHeader'
import { MediaDrawer, MediaWithFile } from '../../../interfaces/Media'
import { MediaFolderEditableListDrawer } from './MediaFolderEditableListDrawer'
import { MediaFolderSettingsInputs } from './MediaFolderSettingsInputs'
import { FormProvider, useForm } from 'react-hook-form'
import { defaultMediaFolder } from '../../../constants/Medias'
import { MediaFolderFilesCounter } from './MediaFolderFilesCounter'
import { mapFilesToMediaWithFile, mediaDrawerToUpdateMediaPromises, mediaToMediaDrawer, mediaToUpdateMediaPromises, mediaWithFileToMediaDrawer } from '../../../utils/MediaUtils'
import { UserDashboardContext } from '../../../contexts/UserDashboardContext'
import MediaFolderService from '../../../services/MediaFolderService'
import { useNavigate, useParams } from 'react-router-dom'
import { Media, MediaFolder, UpdateMediaFolderInput } from '../../../API'
import { translate } from '../../../utils/LanguageUtils'
import { transformGroups } from '../../../utils/CourseUtils'
import MediaService from '../../../services/MediaService'
import { Button, Skeleton, Stack } from '@chakra-ui/react'
import { ToastNotification } from '../../../observables/ToastNotification'
import { useUserGroups } from '../../../hooks/useUserGroups'

export const MediaFolderScreen = () => {
  const [dragAndDropFiles, setDragAndDropFiles] = useState<MediaWithFile[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingFolder, setEditingFolder] = useState<MediaFolder | null>()
  const [folderMedias, setFolderMedias] = useState<Media[]>([])
  const [deletedIds, setDeletedIds] = useState<string[]>([])
  const [editedMedias, setEditedMedias] = useState<MediaDrawer[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [nextPageToken, setNextPageToken] = useState<string | null | undefined>()

  const { context: { user, courses } } = useContext(UserDashboardContext)
  const { hasAdminRole } = useUserGroups()
  const { folderId } = useParams()
  const hasFolderEditPermissions = hasAdminRole || editingFolder?.owner === user?.cognitoId
  const navigate = useNavigate()

  const formControls = useForm({
    defaultValues: defaultMediaFolder
  })

  const {
    watch,
    handleSubmit,
    reset,
    formState: { isDirty, dirtyFields }
  } = formControls

  const getMediasByFolderId = useCallback(async () => {
    const folderMedias = await MediaService.fetchMediaByFolderId(folderId, nextPageToken)
    setFolderMedias(medias => medias.concat(folderMedias?.listMedia?.items as Media[]))

    if (folderMedias?.listMedia?.nextToken) {
      setNextPageToken(folderMedias.listMedia.nextToken)
    }
  }, [folderId, nextPageToken])

  const getMediaFolder = useCallback(async () => {
    // TODO: Check pagination
    const mediaFolder = await MediaFolderService.fetchMediaFolders()

    if (folderId) {
      const folder = mediaFolder?.listMediaFolders?.items.find(folder => folder?.id === folderId)
      setEditingFolder(folder)

      const groups = transformGroups(courses, folder?.groups as string[] || [])

      reset({
        title: folder?.name as string,
        groups
      })
    }
  }, [folderId, courses, reset])

  useEffect(() => {
    getMediaFolder()
  }, [getMediaFolder])

  useEffect(() => {
    getMediasByFolderId()
  }, [folderId, getMediasByFolderId])

  const onDropSuccess = useCallback((newFiles: File[]) => {
    const mediaWithFile: MediaWithFile[] = mapFilesToMediaWithFile(newFiles)
    setDragAndDropFiles(files => [...files, ...mediaWithFile])
  }, [])

  const onUpdateAlreadyUploaded = useCallback((updatedFile: MediaDrawer) => {
    const editedIndex = editedMedias.findIndex(media => media.id === updatedFile.id)
    const folderMediasIndex = folderMedias.findIndex(media => media.id === updatedFile.id)

    if (editedIndex !== -1) {
      const updatedMedia = [...editedMedias]

      updatedMedia[editedIndex].title = updatedFile.title

      setEditedMedias(updatedMedia)
    } else {
      setEditedMedias(medias => medias.concat(updatedFile))
    }

    if (folderMediasIndex !== -1) {
      const updatedFolderMedias = [...folderMedias]
      updatedFolderMedias[folderMediasIndex].title = updatedFile.title
      setFolderMedias(updatedFolderMedias)
    }
  }, [editedMedias, folderMedias])

  const onUpdateNotYetUploaded = useCallback((updatedFile: MediaDrawer) => {
    const mediaIndex = dragAndDropFiles.findIndex(file => file.id === updatedFile.id)
    dragAndDropFiles[mediaIndex].title = updatedFile.title
    setDragAndDropFiles(files => [...files])
  }, [dragAndDropFiles])

  const onUpdate = useCallback((updatedFile: MediaDrawer) => {
    updatedFile.isUploaded ? onUpdateAlreadyUploaded(updatedFile) : onUpdateNotYetUploaded(updatedFile)
  }, [onUpdateAlreadyUploaded, onUpdateNotYetUploaded])

  const onDeleteNotYetUploaded = useCallback((id: string) => {
    setDragAndDropFiles(files => files.filter(file => file.id !== id))
  }, [])

  const onDeleteAlreadyUploaded = useCallback((id: string) => {
    setDeletedIds(deletedIds => [...deletedIds, id])
    setFolderMedias(files => files.filter(file => file.id !== id))
  }, [])

  const onDelete = useCallback((deletedFile: MediaDrawer) => {
    const { id, isUploaded } = deletedFile
    isUploaded ? onDeleteAlreadyUploaded(id) : onDeleteNotYetUploaded(id)
  }, [onDeleteAlreadyUploaded, onDeleteNotYetUploaded])

  const createFolder = useCallback(async (folderName: string, groups: string[], files: MediaWithFile[]) => {
    setIsProcessing(true)
    const folder = await MediaFolderService.createFolder(
      folderName,
      groups,
      user?.name as string,
      files
    )

    ToastNotification({
      description: folder ? 'CREATE_MEDIA_FOLDER_SUCCESS' : 'CREATE_MEDIA_FOLDER_FAILURE',
      status: folder ? 'SUCCESS' : 'ERROR'
    })

    setIsProcessing(false)
    navigate(`/medias/folder/${folder?.id}`)
  }, [user, navigate])

  const onUpdateMediaFolderInformation = useCallback(async () => {
    const { title, groups } = watch()

    const folder: UpdateMediaFolderInput = {
      id: editingFolder?.id as string,
      name: title,
      groups: groups.map(group => group.value) as string[]
    }

    return MediaFolderService.updateFolder(folder)
  }, [watch, editingFolder])

  const onDeleteMedia = useCallback(async () => {
    return deletedIds.map(async id => (
      MediaService.deleteMedia(id)
    ))
  }, [deletedIds])

  const updateFolder = useCallback(async () => {
    setIsProcessing(true)
    const folderOperationsPromises = []

    // Edit Folder information
    if (isDirty && hasFolderEditPermissions) {
      folderOperationsPromises.push(onUpdateMediaFolderInformation())
    }

    const groupsHasBeenModified = !!dirtyFields.groups
    if (groupsHasBeenModified) {
      const groups = watch('groups').map(group => group.value) as string[]
      const updatedMediasPromises = mediaToUpdateMediaPromises(folderMedias, groups)

      folderOperationsPromises.push(updatedMediasPromises)
    }

    // Deleted medias
    folderOperationsPromises.push(onDeleteMedia())

    // Added medias
    if (dragAndDropFiles.length > 0) {
      const groups = watch().groups.map(group => group.value) as string[]
      const addMediaPromises = MediaFolderService.addMediasToFolder(
        dragAndDropFiles,
        folderId as string,
        user?.name as string,
        groups
      )

      folderOperationsPromises.push(addMediaPromises)
    }

    // Edited medias
    const updatePromises = mediaDrawerToUpdateMediaPromises(editedMedias)

    folderOperationsPromises.push(updatePromises)

    const folderOperationsPromisesResult = await Promise.all(folderOperationsPromises.flat(Infinity))
    const operationsSuccess = folderOperationsPromisesResult.every(operation => operation)

    setIsProcessing(false)

    ToastNotification({
      description: operationsSuccess ? 'UPDATE_MEDIA_FOLDER_SUCCESS' : 'UPDATE_MEDIA_FOLDER_FAILURE',
      status: operationsSuccess ? 'SUCCESS' : 'ERROR'
    })

    if (operationsSuccess) {
      navigate(`/medias/folder/${folderId}`)
    }
  }, [hasFolderEditPermissions, folderId, editedMedias, dragAndDropFiles, isDirty, navigate, watch, onDeleteMedia, user, onUpdateMediaFolderInformation, dirtyFields.groups, folderMedias])

  const onSubmit = useCallback((data: any) => {
    const groups = data.groups.map((group: any) => group.value)

    folderId ? updateFolder() : createFolder(data.title, groups, dragAndDropFiles)
  }, [dragAndDropFiles, updateFolder, folderId, createFolder])

  const { title: drawerTitle } = watch()
  const sectionName = folderId ? `${translate('EDITING')} '${editingFolder?.name ?? translate('FOLDER')}'` : translate('CREATE_FOLDER')
  const fileTypes = useMemo(() => folderId ? [...folderMedias.map(media => media.mimeType) as string[], ...dragAndDropFiles.map(file => file.file.type)] : dragAndDropFiles.map(file => file.file.type), [folderMedias, folderId, dragAndDropFiles])
  const drawerMedia = useMemo(() => folderId ? [...mediaToMediaDrawer(folderMedias), ...mediaWithFileToMediaDrawer(dragAndDropFiles)] : mediaWithFileToMediaDrawer(dragAndDropFiles), [folderId, folderMedias, dragAndDropFiles])
  const isMediaFolderFilesModified = deletedIds.length > 0 || dragAndDropFiles.length > 0 || editedMedias.length > 0
  const isFolderInformationModified = isDirty || isMediaFolderFilesModified

  return (
    <Stack spacing={4}>
      <Skeleton isLoaded={folderId ? !!editingFolder : !editingFolder}>
        <SectionHeader sectionName={sectionName}>
          {isFolderInformationModified && (
            <Button
              colorScheme='brand'
              isLoading={isProcessing}
              loadingText={translate('PROCESSING')}
              onClick={() => updateFolder()}>
              {translate('UPDATE_FOLDER')}
            </Button>
          )}
        </SectionHeader>
      </Skeleton>
      <FormProvider {...formControls}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MediaFolderSettingsInputs readOnly={!hasFolderEditPermissions} />
          <DragAndDropZone onDropSuccess={onDropSuccess} />
          <MediaFolderFilesCounter fileTypes={fileTypes} onClick={() => setIsDrawerOpen(true)} />
          <MediaFolderEditableListDrawer
            title={drawerTitle}
            isOpen={isDrawerOpen}
            files={drawerMedia}
            onClose={() => setIsDrawerOpen(false)}
            onConfirm={() => onSubmit(formControls.getValues())}
            onUpdate={onUpdate}
            onDelete={onDelete}
            editMode={!!folderId}
            isProcessing={isProcessing}
            changesNotSaved={isMediaFolderFilesModified}
          />
        </form>
      </FormProvider>
    </Stack>
  )
}
