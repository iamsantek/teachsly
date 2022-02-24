import { LogLevel, LogTypes } from '../enums/LogTypes'

class Logger {
  static log<T> (level: LogLevel, tag: LogTypes, message: string, error?: T) {
    if (level === LogLevel.ERROR) {
      console.error(
        `[${level}] [${tag}]: ${message} \n Error StackTrace:\n ${JSON.stringify(
          error
        )}`
      )
      return
    }

    console.log(`[${level}] [${tag}]: ${message}`)
  }
}
export default Logger
