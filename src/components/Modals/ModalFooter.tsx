import React, { FC } from 'react'
import {
  ModalFooter as ChakraModalFooter,
  HStack,
  Button
} from '@chakra-ui/react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'

interface Props {
  isLoading: boolean;
  onClose: () => void;
  sendButtonText: TranslationsDictionary;
  children?: React.ReactNode;
}

export const ModalFooter: FC<Props> = ({ isLoading, onClose, sendButtonText, children }: Props) => (
  <ChakraModalFooter>
    <HStack>
      {children}
      <Button onClick={onClose}>{translate('CANCEL')}</Button>
      <Button
        colorScheme="brand"
        isLoading={isLoading}
        loadingText={translate('PROCESSING')}
        type="submit"
      >
        {translate(sendButtonText)}
      </Button>
    </HStack>
  </ChakraModalFooter>
)
