import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react'
import React from 'react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'

interface Props {
    title: TranslationsDictionary;
    description: TranslationsDictionary;
    isOpen: boolean;
    confirmButtonText: TranslationsDictionary;
    onClose: () => void;
    onAction: () => void;
}

export const ConfirmationDialog = ({
  isOpen,
  onClose,
  confirmButtonText,
  description,
  title,
  onAction
} : Props) => {
  const cancelRef = React.useRef()

  return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef as any}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {translate(title)}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        {translate(description)}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef as any} onClick={onClose}>
                            {translate('CANCEL')}
                        </Button>
                        <Button colorScheme='red' onClick={onAction} ml={3}>
                            {translate(confirmButtonText)}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
  )
}
