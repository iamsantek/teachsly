import dayjs from "dayjs";
import { awsDateFormat } from "../constants/DateTime";

export enum TimeFormats {
  AWSTime = "HH:mm:ss.SSS",
  TwentyFourHours = "HH:mm",
}

class DateTimeUtils {
  public formatDate = (date: string) => {
    return dayjs(date).format(awsDateFormat);
  };

  public formateHour = (hours: string, format: TimeFormats) => {
    return dayjs(`2021-02-21 ${hours}`).format(format);
  };
}

export default new DateTimeUtils();
