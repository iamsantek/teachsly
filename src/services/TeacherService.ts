import { LogLevel, LogTypes } from "../enums/LogTypes";
import { UserTypes } from "../enums/UserTypes";
import Logger from "../utils/Logger";
import CognitoService from "./aws/CognitoService";

class TeacherService {
  public fetchTeachers = async () => {
    try {
      return await CognitoService.getCognitoUsersByGroupName(UserTypes.TEACHER);
    } catch (e) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching teachers",
        e
      );
    }
  };
}

export default new TeacherService();
