import Amplify, { Logger, AWSCloudWatchProvider } from 'aws-amplify'
import { BACKEND_ENV } from '../../constants/Environment'
import { AnalyticsEvent } from '../../enums/Analytics'
import { GeneralInformation } from '../../enums/GeneralInformation'
import { BackendEnvironments } from '../../interfaces/BackendEnvironments'

class CloudWatchService {
  public recordEvent = (event: AnalyticsEvent) => {
    if (BACKEND_ENV === BackendEnvironments.QA) {
      return
    }

    const logger = new Logger(GeneralInformation.PROJECT_NAME)
    Amplify.register(logger)
    logger.addPluggable(new AWSCloudWatchProvider())

    logger.error(JSON.stringify(event))
  }
}

export default new CloudWatchService()
