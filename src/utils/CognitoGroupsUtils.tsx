import { GroupType } from "@aws-sdk/client-cognito-identity-provider";
import { splitCamelCase } from "./StringUtils";

export const renderCognitoGroupsList = (groups: GroupType[]) =>
  groups.map((group, index) => (
    <option key={index} value={group.GroupName}>
      {splitCamelCase(group.GroupName)} {group.Description}
    </option>
  ));
