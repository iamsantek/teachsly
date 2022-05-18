import { ANALYTICS_URL } from '../constants/Analytics'
import { BACKEND_ENV } from '../constants/Environment'
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
        env: BACKEND_ENV
      }
    })

    return response
  }
}

export default new AnalyticsService()
