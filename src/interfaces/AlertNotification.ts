import ObservableService from "../observables/ObservableService";
import { ObservableTopics } from "./ObservableTopics";

export enum MessageLevel {
  WARNING = "warning",
  ERROR = "danger",
  INFO = "info",
  SUCCESS = "success",
}

export class AlertNotification {
  type: MessageLevel;
  message: string;

  constructor(type: MessageLevel, message: string) {
    this.type = type;
    this.message = message;

    ObservableService.notifyListeners(ObservableTopics.NotificationAlert, this);
  }
}
