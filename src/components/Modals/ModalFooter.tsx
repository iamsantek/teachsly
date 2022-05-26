import React, { FC } from 'react'
import {
  ModalFooter as ChakraModalFooter,
  Button,
  Wrap
} from '@chakra-ui/react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'

interface Props {
  isLoading: boolean
  onClose: () => void;
  sendButtonText: TranslationsDictionary;
  children?: React.ReactNode;
  isDisabled?: boolean
}

export const ModalFooter: FC<Props> = ({ isLoading, onClose, sendButtonText, children, isDisabled }: Props) => (
  <ChakraModalFooter>
    <Wrap gap={4}>
      {children}
        <Button w={['100%', 'auto']} onClick={onClose}>{translate('CANCEL')}</Button>
        <Button
          colorScheme="brand"
          w={['100%', 'auto']}
          isLoading={isLoading}
          isDisabled={isDisabled}
          loadingText={translate('PROCESSING')}
          type="submit"
        >
          {translate(sendButtonText)}
        </Button>
    </Wrap>
  </ChakraModalFooter>
)
