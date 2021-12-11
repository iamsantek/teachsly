import { Auth } from "aws-amplify";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { User } from "../models/User";
import Logger from "../utils/Logger";

class UserService {
  public generateUser(authData: any): User | null {
    if (!authData) {
      return null;
    }
    const userGroups =
      authData?.signInUserSession.idToken.payload["cognito:groups"];
    const { name, email } = authData?.attributes;

    return new User(email, name, userGroups);
  }

  public async createStudent(username: string, password: string, name: string) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          name,
        },
      });
      Logger.log(
        LogLevel.INFO,
        LogTypes.UserService,
        "User successfully created"
      );

      return user;
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.UserService,
        "Error signing up",
        error
      );
    }
  }
}

export default new UserService();
