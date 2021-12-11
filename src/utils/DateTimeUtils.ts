import dayjs from "dayjs";

class DateTimeUtils {
  public formatDate(date: string) {
    return dayjs(date).format("DD/MM/YYYY");
  }

  public formateHour(hours: string) {
    return dayjs(`2021-02-21 ${hours}`).format("HH:mm");
  }
}

export default new DateTimeUtils();
