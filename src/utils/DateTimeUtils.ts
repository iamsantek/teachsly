import dayjs from "dayjs";
import { awsDateFormat } from "../constants/DateTime";

class DateTimeUtils {
  public formatDate = (date: string) => {
    return dayjs(date).format(awsDateFormat);
  }

  public formateHour = (hours: string) => {
    return dayjs(`2021-02-21 ${hours}`).format("HH:mm:ss.SSS");
  }
}

export default new DateTimeUtils();
