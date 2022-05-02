import { List, ListItem } from '@chakra-ui/react'
import { useContext } from 'react'
import { EditableInputComponent } from '../../../components/Inputs/EditableInput'
import { UserDashboardContext } from '../../../contexts/UserDashboardContext'
import { MediaDrawer } from '../../../interfaces/Media'
import { isAdmin } from '../../../utils/CognitoGroupsUtils'
import { getFileTypeIcon } from '../../../utils/MediaUtils'

interface Props {
    files: MediaDrawer[]
    onUpdate: (updatedFile: MediaDrawer) => void
    onDelete: (deletedFile: MediaDrawer) => void
}

export const MediaFolderEditableList = ({ files, onUpdate, onDelete }: Props) => {
  const { context: { user } } = useContext(UserDashboardContext)
  const hasAdminRole = !!isAdmin(user)
  if (files.length === 0) {
    return null
  }

  const onComplete = (updatedFile: MediaDrawer, updatedTitle: string) => {
    updatedFile.title = updatedTitle
    onUpdate(updatedFile)
  }

  return (
        <List spacing={3}>
            {files.map((media) => {
              const canEdit = !!(media.owner === user?.cognitoId || !media.isUploaded || isAdmin(user))

              return (
                <ListItem key={media.id} display='flex' gap={3} alignItems='flex-start'>
                    {getFileTypeIcon(media.type)}
                    <EditableInputComponent
                    value={media.title}
                    onComplete={(newValue) => onComplete(media, newValue)}
                    onDelete={() => onDelete(media)}
                    permissions={{
                      canEdit,
                      canDelete: hasAdminRole
                    }}
                    />
                </ListItem>
              )
            })}
        </List>
  )
}
