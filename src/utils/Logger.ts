import { LogLevel, LogTypes } from "../enums/LogTypes";
import AnalyticsService from "../services/AnalyticsService";

class Logger {
  static log<T>(
    level: LogLevel,
    tag: LogTypes,
    message: string,
    error?: T,
    extraData?: Object
  ) {
    if (level === LogLevel.ERROR) {
      console.error(
        `[${level}] [${tag}]: ${message} \n Error StackTrace:\n ${JSON.stringify(
          error
        )}`
      );
      AnalyticsService.recordEvent({
        name: "ERROR",
        type: tag,
        level,
        payload: JSON.stringify(error),
        extraData,
      });
      return;
    }

    console.log(`[${level}] [${tag}]: ${message}`);
  }
}
export default Logger;
