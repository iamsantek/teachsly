
import { useEffect, useState } from 'react'
import { TranslationsDictionary } from '../../dictionaries/dictionary'
import { ObservableTopics } from '../../interfaces/ObservableTopics'
import ObservableService from '../../observables/ObservableService'

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
<>
</>
  )
}

export default ToastWrapper
