
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { ObservableTopics } from '../../interfaces/ObservableTopics'
import ObservableService from '../../observables/ObservableService'
import { Toast } from './Toast'

export interface ToastMessage {
  description: TranslationsDictionary;
  status: 'INFO' | 'SUCCESS' | 'ERROR';
}

const ToastWrapper = () => {
  const [toastMessage, setToastMessage] = useState<ToastMessage>()
  const renderAlert = (toastMessage: ToastMessage) => {
    setToastMessage(toastMessage)
  }

  useEffect(() => {
    ObservableService.addListener(
      ObservableTopics.ToastNotification,
      renderAlert
    )

    return () => {
      ObservableService.removeListener(
        ObservableTopics.ToastNotification,
        () => {}
      )
    }
  }, [])

  return (

    Toast({
      description: toastMessage?.description as TranslationsDictionary,
      status: toastMessage?.status as any,
      onCloseComplete: () => setToastMessage(undefined)
    })

  )
}

export default ToastWrapper
