import Amplify, { Logger, AWSCloudWatchProvider } from 'aws-amplify'
import { AnalyticsEvent } from '../../enums/Analytics'
import { GeneralInformation } from '../../enums/GeneralInformation'

class CloudWatchService {
  public recordEvent = (event: AnalyticsEvent) => {
    if (process.env.NODE_ENV === 'development') {
      return
    }

    const logger = new Logger(GeneralInformation.PROJECT_NAME)
    Amplify.register(logger)
    logger.addPluggable(new AWSCloudWatchProvider())

    logger.error(JSON.stringify(event))
  }
}

export default new CloudWatchService()
