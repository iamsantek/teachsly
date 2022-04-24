import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Button, Alert, AlertIcon, Stack } from '@chakra-ui/react'
import { useEffect } from 'react'
import { MediaDrawer } from '../../../interfaces/Media'
import { translate } from '../../../utils/LanguageUtils'
import { MediaFolderEditableList } from './MediaFolderEditableList'

interface Props {
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedFile: MediaDrawer) => void
  onDelete: (deletedFile: MediaDrawer) => void
  onConfirm: () => void
  files: MediaDrawer[]
  title: string
  editMode: boolean
  isProcessing: boolean
  changesNotSaved: boolean
}

export const MediaFolderEditableListDrawer = ({ title, files, isOpen, onClose, onDelete, onUpdate, onConfirm, editMode, isProcessing, changesNotSaved }: Props) => {
  useEffect(() => {
    if (files.length === 0) {
      onClose()
    }
  }, [files, onClose])

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      size='md'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>

        <DrawerBody marginY={3}>
          <Stack spacing={6}>
            <Alert status='info' rounded={4}>
              <AlertIcon />
              {translate('DRAWER_NAME_INFORMATION_ALERT')}
            </Alert>
            <MediaFolderEditableList
              files={files}
              onUpdate={onUpdate}
              onDelete={onDelete} />
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            {translate('CANCEL')}
          </Button>
          <Button
            colorScheme='brand'
            onClick={onConfirm}
            isDisabled={!changesNotSaved}
            isLoading={isProcessing}
            loadingText={translate('PROCESSING')}
          >
            {translate(editMode ? 'UPDATE_FOLDER' : 'UPLOAD_FOLDER')}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
