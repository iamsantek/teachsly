export enum MessageLevel {
  WARNING = "warning",
  ERROR = "danger",
  INFO = "info",
  SUCCESS = "success",
}

export interface AlertNotification {
  type: MessageLevel;
  message: string;
}
