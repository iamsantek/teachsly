import { ObservableTopics } from '../interfaces/ObservableTopics'

class ObservableService {
  constructor () {
    this.initState()
  }

  private listenersByEvent: any[] = []

  initState () {
    this.listenersByEvent = []
    this.addEvent(ObservableTopics.NotificationAlert)
  }

  private addEvent (eventName: any) {
    if (!this.existEvent(eventName)) {
      this.listenersByEvent[eventName] = []
    }
  }

  addListener (eventName: any, fn: (params?: any) => void) {
    if (this.existEvent(eventName)) {
      this.listenersByEvent[eventName].push(fn)
    }
  }

  existEvent (eventName: any) {
    return this.listenersByEvent[eventName]
  }

  removeListener (eventName: any, fn: () => void) {
    if (this.existEvent(eventName)) {
      const listenerList = this.listenersByEvent[eventName]
      const index = listenerList.indexOf(fn)
      if (index !== -1) {
        listenerList.splice(index, 1)
      }
    }
  }

  notifyListeners<T> (eventName: any, eventParams: T) {
    if (this.existEvent(eventName)) {
      this.listenersByEvent[eventName].forEach((listener: any) =>
        listener(eventParams)
      )
    }
  }
}

export default new ObservableService()
