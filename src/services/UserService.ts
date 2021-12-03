import { User } from "../models/User";

class UserService {
  generateUser(authData: any): User {
    const userGroups =
      authData?.signInUserSession.idToken.payload["cognito:groups"];
    const email = authData.attributes.email;

    return new User(email, userGroups);
  }
}

export default new UserService();
