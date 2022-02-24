/* eslint-disable no-unused-vars */
import dayjs from 'dayjs'
import { awsDateFormat } from '../constants/DateTimeFormats'
import { translate } from './LanguageUtils'

export enum TimeFormats {
  AWSTime = 'HH:mm:ss.SSS',
  TwentyFourHours = 'HH:mm',
}

class DateTimeUtils {
  public formatDate = (date: string) => {
    return dayjs(date).format(awsDateFormat)
  }

  public formateHour = (hours: string, format: TimeFormats) => {
    return dayjs(`2021-02-21 ${hours}`).format(format)
  }

  public shortDays = (days: string[]) =>
    days.map((day) => day.substring(0, 3)).join(' ')

  public daysOfTheWeek = () => translate('DAYS_OF_THE_WEEK').split(',')

  public sortDaysOfTheWeek = (unsortedDaysOfTheWeek: string[]) => {
    return unsortedDaysOfTheWeek.sort(
      (day1, day2) =>
        this.daysOfTheWeek().indexOf(day1) - this.daysOfTheWeek().indexOf(day2)
    )
  }
}

export default new DateTimeUtils()
