import { List, ListItem } from '@chakra-ui/react'
import { EditableInputComponent } from '../../../components/Inputs/EditableInput'
import { MediaWithFile } from '../../../interfaces/Media'
import { getFileTypeIcon } from '../../../utils/MediaUtils'

interface Props {
    files: MediaWithFile[]
    onUpdate: (id: string, displayName: string) => void
    onDelete: (id: string) => void
}

export const MediaFolderEditableList = ({ files, onUpdate, onDelete }: Props) => {
  if (files.length === 0) {
    return null
  }

  return (
        <List spacing={3}>
            {files.map((mediaWithFile) => (
                <ListItem key={mediaWithFile.id} display='flex' gap={3} alignItems='flex-start'>
                    {getFileTypeIcon(mediaWithFile.file.type)}
                    <EditableInputComponent
                    value={mediaWithFile.displayName}
                    onComplete={(newValue) => onUpdate(mediaWithFile.id, newValue)}
                    onDelete={() => onDelete(mediaWithFile.id)}
                    />
                </ListItem>
            ))}
        </List>
  )
}
