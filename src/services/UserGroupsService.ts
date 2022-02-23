import { UserTypes } from "../enums/UserTypes";
import { User } from "../platform-models/User";
import CognitoService from "./aws/CognitoService";

class UserGroupsService {
  public getUserGroups = async () => {
    return await CognitoService.getCognitoGroups();
  };

  public isUser = (user: User | null, group: UserTypes) => {
    if (!user) {
      return false;
    }

    return user.groups.includes(group);
  };
}

export default new UserGroupsService();
