import { LogLevel, LogTypes } from "../enums/LogTypes";
import { UserTypes } from "../enums/UserTypes";
import { listUsers } from "../graphql/queries";
import {
  deleteUser,
  updateUser as updateUserMutation,
} from "../graphql/mutations";
import {
  User as UserAPI,
  ListUsersQuery,
  ModelUserFilterInput,
  UpdateUserInput,
  UpdateUserMutation,
  CreateUserInput,
  DeleteUserMutation,
} from "../API";
import Logger from "../utils/Logger";
import AuthService from "./AuthService";
import GraphQLService from "./GraphQLService";
import CognitoService from "./aws/CognitoService";

class UserService {
  public async createUser(user: CreateUserInput, type: UserTypes) {
    try {
      const cognitoUser = await AuthService.createUser(user, type);

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

  private cognitoIdFilter = (cognitoId: string): ModelUserFilterInput => ({
    cognitoId: { eq: cognitoId },
  });

  public fetchUserByCognitoId = async (
    cognitoId: string | undefined,
    nextToken: string | undefined = undefined
  ): Promise<any> => {
    if (!cognitoId) {
      return;
    }

    const filter = this.cognitoIdFilter(cognitoId);
    const users = await this.fetchUsers(filter, nextToken);

    if (users?.listUsers?.items?.length === 1) {
      return users?.listUsers?.items[0];
    }

    if (users?.listUsers?.nextToken) {
      return await this.fetchUserByCognitoId(
        cognitoId,
        users.listUsers.nextToken
      );
    }
  };

  public getUserType = (user: UserAPI | undefined | null) => {
    return Object.values(UserTypes).find((groupType) =>
      user?.groups?.includes(groupType)
    );
  };

  private fetchUsers = async (
    filter: ModelUserFilterInput,
    nextToken?: string | null
  ) => {
    return GraphQLService.fetchQuery<ListUsersQuery>({
      query: listUsers,
      filter: filter,
      nextToken,
    });
  };

  public fetchUsersByCourseOrType = async (
    courseOrType: string | UserTypes | undefined = undefined,
    nextToken: string | null = null
  ) => {
    if (!courseOrType) {
      return;
    }

    const usersByCourseFilter: ModelUserFilterInput = {
      and: [{ groups: { contains: courseOrType } }],
    };

    return this.fetchUsers(usersByCourseFilter, nextToken);
  };

  private updateUserGroups = async (
    email: string,
    updatedGroups: string[],
    previousGroups: string[]
  ) => {
    const deletedGroups = previousGroups
      .filter((x) => !updatedGroups.includes(x))
      .filter((x) => x);

    const deleteUserFromGroups = CognitoService.deleteUserFromGroups(
      email,
      deletedGroups
    );

    const assignUserToCognitoGroup = CognitoService.assignUserToCognitoGroup(
      email,
      updatedGroups.filter((group) => group)
    );

    return Promise.all([deleteUserFromGroups, assignUserToCognitoGroup]);
  };

  public updateUser = async (
    user: UpdateUserInput,
    shouldUpdateGroups = false,
    previousGroups: string[] = []
  ) => {
    try {
      if (shouldUpdateGroups) {
        const updateUserGroups = await this.updateUserGroups(
          user.email as string,
          [...(user.groups as string[]), user.englishLevel as string],
          previousGroups
        );

        if (!updateUserGroups) {
          return;
        }
      }

      await CognitoService.updateCognitoUser(user);

      return GraphQLService.fetchQuery<UpdateUserMutation>({
        query: updateUserMutation,
        filter: this.cognitoIdFilter(user.cognitoId as string),
        input: {
          ...user,
          englishLevel: !!user.englishLevel ? user.englishLevel : null,
        },
      });
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.UserService,
        "Error when updating user",
        error
      );
    }
  };

  public resetPassword(userId: string) {
    return CognitoService.resetPassword(userId);
  }

  public deleteUser = async (userId: string, cognitoId: string) => {
    try {
      const deleteUserResponse =
        await GraphQLService.fetchQuery<DeleteUserMutation>({
          query: deleteUser,
          input: {
            id: userId,
          },
        });

      if (!deleteUserResponse) {
        console.log("Error deleting  the Cognito user");
        return;
      }

      return CognitoService.deleteCognitoUser(cognitoId);
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.UserService,
        "Error when deleting user",
        error
      );
    }
  };

  public fetchTeacherByCourseId = async (courseExternalId: string) => {
    const usersByCourseFilter: ModelUserFilterInput = {
      and: [
        { isDisabledUser: { eq: false } },
        { groups: { contains: courseExternalId } },
        { groups: { contains: UserTypes.TEACHER } },
      ],
    };

    return this.fetchUsers(usersByCourseFilter);
  };
}

export default new UserService();
