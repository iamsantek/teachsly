/* eslint-disable no-unused-vars */

import { ToastMessage } from '../components/Toast/ToastWrapper'
import ObservableService from './ObservableService'
import { ObservableTopics } from '../interfaces/ObservableTopics'

export const ToastNotification = (toastMessage: ToastMessage) => ObservableService.notifyListeners(ObservableTopics.ToastNotification, toastMessage)
