import { useCallback, useState } from 'react'
import { DragAndDropZone } from '../../../components/DragAndDrop/DragAndDropZone'
import { SectionHeader } from '../../../components/Headers/SectionHeader'
import { MediaWithFile } from '../../../interfaces/Media'
import { MediaFolderEditableListDrawer } from './MediaFolderEditableListDrawer'
import { MediaFolderSettingsInputs } from './MediaFolderSettingsInputs'
import { FormProvider, useForm } from 'react-hook-form'
import { defaultMediaFolder } from '../../../constants/Medias'
import { MediaFolderFilesCounter } from './MediaFolderFilesCounter'
import { mapFilesToMediaWithFile } from '../../../utils/MediaUtils'

export const MediaFolderCRUD = () => {
  const [files, setFiles] = useState<MediaWithFile[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const formControls = useForm({
    defaultValues: defaultMediaFolder
  })

  const {
    watch,
    handleSubmit
  } = formControls

  const onDropSuccess = useCallback((newFiles: File[]) => {
    const mediaWithFile: MediaWithFile[] = mapFilesToMediaWithFile(newFiles)
    setFiles(files => [...files, ...mediaWithFile])
  }, [])

  const onUpdate = useCallback((id: string, displayName: string) => {
    const index = files.findIndex((file) => file.id === id)

    if (index !== -1) {
      const newFiles = [...files]
      newFiles[index].displayName = displayName
      setFiles(newFiles)
    }
  }, [files])

  const onDelete = useCallback((id: string) => {
    const filteredFiles = files.filter((file) => file.id !== id)
    setFiles(filteredFiles)
  }, [files])

  const onSubmit = useCallback((data: any) => {
    console.log(data)
  }, [])

  const drawerTitle = watch('title')

  return (
    <>
      <SectionHeader />
      <FormProvider {...formControls}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MediaFolderSettingsInputs />
          <DragAndDropZone onDropSuccess={onDropSuccess} />
          <MediaFolderFilesCounter files={files} onClick={() => setIsDrawerOpen(true)} />
          <MediaFolderEditableListDrawer
            title={drawerTitle}
            isOpen={isDrawerOpen}
            files={files}
            onClose={() => setIsDrawerOpen(false)}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </form>
      </FormProvider>
    </>
  )
}
