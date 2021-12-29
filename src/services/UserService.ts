import { API, graphqlOperation } from "aws-amplify";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { UserTypes } from "../enums/UserTypes";
import { listUsers } from "../graphql/queries";
import { User } from "../platform-models/User";
import { User as DynamoDBUser } from "../models/index";

import Logger from "../utils/Logger";
import AuthService from "./AuthService";
import GraphQLService from "./GraphQLService";

class UserService {
  public async createUser(user: User) {
    try {
      const cognitoUser = await AuthService.createUser(user);

      if (!cognitoUser) {
        return;
      }

      Logger.log(
        LogLevel.INFO,
        LogTypes.UserService,
        "User successfully created"
      );

      return cognitoUser;
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.UserService,
        "Error signing up",
        error
      );
    }
  }

  private filterByGroupType = (type: UserTypes) => {
    return { groups: { contains: type } };
  };

  private filterByCognitoId = (cognitoId: string) => {
    return { cognitoId: { eq: cognitoId } };
  };

  private filterConfiguration = (filter: Object) => {
    return {
      filter: filter,
    };
  };

  public fetchUserByCognitoId = async (cognitoId: string) => {
    const filterByCognitoId = this.filterByCognitoId(cognitoId);
    const users = await this.fetchUsers(filterByCognitoId);

    return users && users[0];
  };

  private fetchUsers = async (filter: Object) => {
    try {
      const filterConfig = this.filterConfiguration(filter);
      const models = await GraphQLService.graphQL<any>(
        graphqlOperation(listUsers, filterConfig)
      );

      return models?.data?.listUsers.items as DynamoDBUser[];
    } catch (e) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching users",
        e
      );
    }
  };

  public fetchUsersByType = async (type: UserTypes | "ALL") => {
    let filter = type !== "ALL" ? this.filterByGroupType(type) : {};

    return await this.fetchUsers(filter);
  };

  public getUserType = (user: User) => {
    const { groups } = user;

    return [UserTypes.ADMIN, UserTypes.STUDENT, UserTypes.TEACHER].find(
      (group) => groups.includes(group)
    );
  };
}

export default new UserService();
