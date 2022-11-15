/* eslint-disable no-unused-vars */
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { awsDateFormat } from "../constants/DateTimeFormats";
import { MultiSelectOption } from "../interfaces/MultiSelectOption";
import { translate } from "./LanguageUtils";
import "dayjs/locale/es";

export enum TimeFormats {
  AWSTime = "HH:mm:ss.SSS",
  TwentyFourHours = "HH:mm",
}

dayjs.extend(relativeTime);
class DateTimeUtils {
  public formatDate = (date: string) => {
    return dayjs(date).format(awsDateFormat);
  };

  public formateHour = (
    hours: string | undefined | null,
    format: TimeFormats
  ) => {
    if (!hours) {
      return "";
    }

    return dayjs(`2021-02-21 ${hours}`).format(format);
  };

  public transformDayIndexesToStringDays = (dayIndexes: number[]) => {
    if (!dayIndexes) {
      return [];
    }

    const daysOfTheWeek = this.daysOfTheWeek();

    return daysOfTheWeek.filter((day, index) => dayIndexes.includes(index + 1));
  };

  public shortDays = (dayPositions: number[]) => {
    const selectedDays = this.transformDayIndexesToStringDays(dayPositions);

    return selectedDays?.map((day) => day.substring(0, 3)).join(" ");
  };

  public daysOfTheWeek = () => translate("DAYS_OF_THE_WEEK").split(",");

  public sortDaysOfTheWeek = (unsortedDaysOfTheWeek: string[]) => {
    return unsortedDaysOfTheWeek.sort(
      (day1, day2) =>
        this.daysOfTheWeek().indexOf(day1) - this.daysOfTheWeek().indexOf(day2)
    );
  };

  public daysToMultiSelectOption = (values: string[]): MultiSelectOption[] => {
    return values.map((value, index) => {
      return {
        label: value,
        value: String(index + 1),
      };
    });
  };

  public dayIndexesToMultiSelectOption = (
    weekDays: number[]
  ): MultiSelectOption[] => {
    const daysOfTheWeek = this.daysOfTheWeek();

    return this.transformDayIndexesToStringDays(weekDays).map((day) => {
      return {
        label: day,
        value: String(daysOfTheWeek.indexOf(day) + 1),
        colorScheme: "brand",
      };
    });
  };
}

export default new DateTimeUtils();
