
import { useState } from 'react'
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

  ObservableService.addListener(
    ObservableTopics.ToastNotification,
    renderAlert
  )

  if (!toastMessage?.description) {
    return null
  }

  const { status, description } = toastMessage
  return (
    <>
      {Toast({
        description,
        status
      })}
    </>
  )
}

export default ToastWrapper
