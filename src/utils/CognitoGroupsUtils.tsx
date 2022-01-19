import { GroupType } from "@aws-sdk/client-cognito-identity-provider";
import { UserTypes } from "../enums/UserTypes";
import DateTimeUtils, { TimeFormats } from "./DateTimeUtils";
import { splitCamelCase } from "./StringUtils";

export const renderCognitoGroupsList = (groups: GroupType[]) =>
  //It only renders the groups that are courses
  groups
    .filter(
      (group) =>
        ![UserTypes.ADMIN, UserTypes.STUDENT, UserTypes.TEACHER].includes(
          group.GroupName as UserTypes
        )
    )
    .map((group, index) => (
      <option key={index} value={group.GroupName}>
        {splitCamelCase(group.GroupName)} {group.Description}
      </option>
    ));

export const formatCognitoGroupDescription = (
  days: string[],
  startTime: string,
  endTime: string
) => {
  const shortDays = days.map((day) => day.substring(0, 3)).join(" ");
  const formattedStartTime = DateTimeUtils.formateHour(
    startTime,
    TimeFormats.TwentyFourHours
  );
  const formattedEndTime = DateTimeUtils.formateHour(
    endTime,
    TimeFormats.TwentyFourHours
  );

  return `${shortDays} (${formattedStartTime} - ${formattedEndTime})`;
};
