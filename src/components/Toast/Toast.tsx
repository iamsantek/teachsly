import {
  AlertStatus,
  createStandaloneToast,
  ToastPositionWithLogical,
  useTheme
} from '@chakra-ui/react'
import { FC } from 'react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { translate } from '../../utils/LanguageUtils'

interface Props {
  description: TranslationsDictionary;
  status: 'INFO' | 'SUCCESS' | 'ERROR';
  position?: ToastPositionWithLogical;
  duration?: number;
}

export const Toast: FC<Props> = ({
  description,
  status,
  position = 'top',
  duration = 5000
}: Props) => {
  const theme = useTheme()
  const toast = createStandaloneToast({ theme })

  return (
    <>
    {toast({
      title: translate(status),
      description: translate(description),
      status: status.toLowerCase() as AlertStatus,
      duration,
      isClosable: true,
      position
    })}
    </>

  )
}
