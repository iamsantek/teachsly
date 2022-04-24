import { List, ListItem } from '@chakra-ui/react'
import { EditableInputComponent } from '../../../components/Inputs/EditableInput'
import { MediaDrawer } from '../../../interfaces/Media'
import { getFileTypeIcon } from '../../../utils/MediaUtils'

interface Props {
    files: MediaDrawer[]
    onUpdate: (updatedFile: MediaDrawer) => void
    onDelete: (deletedFile: MediaDrawer) => void
}

export const MediaFolderEditableList = ({ files, onUpdate, onDelete }: Props) => {
  if (files.length === 0) {
    return null
  }

  const onComplete = (updatedFile: MediaDrawer, updatedTitle: string) => {
    updatedFile.title = updatedTitle
    onUpdate(updatedFile)
  }

  return (
        <List spacing={3}>
            {files.map((media) => (
                <ListItem key={media.id} display='flex' gap={3} alignItems='flex-start'>
                    {getFileTypeIcon(media.type)}
                    <EditableInputComponent
                    value={media.title}
                    onComplete={(newValue) => onComplete(media, newValue)}
                    onDelete={() => onDelete(media)}
                    />
                </ListItem>
            ))}
        </List>
  )
}
