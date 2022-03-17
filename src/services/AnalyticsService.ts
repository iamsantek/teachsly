import { AnalyticsEvent } from '../enums/Analytics'
import CloudWatchService from './aws/CloudWatchService'

class AnalyticsService {
  public recordEvent = async (event: AnalyticsEvent) => {
    CloudWatchService.recordEvent(event)
  }
}

export default new AnalyticsService()
