import { LogTypes, LogLevel } from './LogTypes'

export interface AnalyticsEvent {
    name: string,
    type: LogTypes,
    level: LogLevel,
    payload: string
    extraData?: Object;
}
