import { User } from "../models/User";

class UserService {
  generateUser(authData: any): User | null {
    if (!authData) {
      return null;
    }
    const userGroups =
      authData?.signInUserSession.idToken.payload["cognito:groups"];
    const { name, email } = authData?.attributes;

    return new User(email, name, userGroups);
  }
}

export default new UserService();
