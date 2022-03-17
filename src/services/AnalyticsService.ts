import { Analytics } from 'aws-amplify'
import { LogLevel, LogTypes } from '../enums/LogTypes'

interface AnalyticsEvent<T> {
    name: string,
    type: LogTypes,
    level: LogLevel,
    payload: T
}

class AnalyticsService {
  public recordEvent = <T>(event: AnalyticsEvent<T>) => {
    Analytics.record(event)
  }
}

export default new AnalyticsService()
