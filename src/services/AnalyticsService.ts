import { ANALYTICS_URL } from '../constants/Analytics'
import { AnalyticsEvent } from '../enums/Analytics'
import LocalStorageService, { LocalStorageKeys } from './LocalStorageService'

class AnalyticsService {
  public recordEvent = async (event: AnalyticsEvent) => {
    const user = LocalStorageService.getItem(LocalStorageKeys.USER)

    const response = await fetch(ANALYTICS_URL, {
      method: 'POST',
      body: JSON.stringify({
        ...event,
        timestamp: new Date().toISOString(),
        user
      }),
      headers: {
        'Content-Type': 'application/json',
        env: 'demo'
      }
    })

    return response
  }
}

export default new AnalyticsService()
