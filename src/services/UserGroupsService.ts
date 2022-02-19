import { UserTypes } from "../enums/UserTypes";
import { User } from "../platform-models/User";
import CognitoService from "./aws/CognitoService";

class UserGroupsService {
  public getUserGroups = async () => {
    return await CognitoService.getCognitoGroups();
  };

  public isStudent = (user: User | null) => {
    if (!user) {
      return false;
    }

    return user.groups.includes(UserTypes.STUDENT);
  };
}

export default new UserGroupsService();
