import {
  ListUsersCommand,
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  ListUsersInGroupCommand,
  ListGroupsCommand,
  AdminUpdateUserAttributesCommand,
  AdminCreateUserCommand,
  AttributeType,
  CreateGroupCommand,
  AdminRemoveUserFromGroupCommand,
  AdminSetUserPasswordCommand,
  AdminDeleteUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { UpdateUserInput } from "../../API";
import awsmobile from "../../aws-exports";
import { LogLevel, LogTypes } from "../../enums/LogTypes";
import { UserTypes } from "../../enums/UserTypes";
import Logger from "../../utils/Logger";

const logTag = LogTypes.AuthService;

class CognitoService {
  private cognitoIdentityProviderClient:
    | CognitoIdentityProviderClient
    | undefined;

  // TODO: Type this properly
  public createClient = async (user: any) => {
    if (this.cognitoIdentityProviderClient) {
      return;
    }

    user?.getSession((error: any, result: any) => {
      if (result) {
        const token: string = result.getIdToken().getJwtToken();

        this.cognitoIdentityProviderClient = new CognitoIdentityProviderClient({
          region: awsmobile.aws_project_region,
          credentials: fromCognitoIdentityPool({
            clientConfig: { region: awsmobile.aws_project_region },
            identityPoolId: awsmobile.aws_cognito_identity_pool_id,
            logins: {
              [`cognito-idp.${awsmobile.aws_cognito_region}.amazonaws.com/${awsmobile.aws_user_pools_id}`]:
                token,
            },
          }),
        });
      } else if (error) {
        Logger.log(
          LogLevel.ERROR,
          logTag,
          "Error when creating Cognito client",
          error
        );
      }
    });
  };

  private getListGroupsCommandConfig = () => ({
    UserPoolId: awsmobile.aws_user_pools_id,
  });

  public assignUserToCognitoGroup = async (
    userId: string,
    groups: string[]
  ) => {
    try {
      const adminAddUserToGroupCommandPromises = groups.map((groupName) => {
        const config = this.getGroupsConfiguration(groupName, userId);
        const adminAddUserToGroupCommand = new AdminAddUserToGroupCommand(
          config
        );

        return this.cognitoIdentityProviderClient?.send(
          adminAddUserToGroupCommand
        );
      });

      return Promise.all(adminAddUserToGroupCommandPromises);
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        "Error when assigning groups to user",
        error
      );
    }
  };

  public getCognitoUsersByGroupName = async (groupName: string) => {
    try {
      const listGroupsCommandConfig = this.getListGroupsCommandConfig();

      const listUsersInGroupCommand = new ListUsersInGroupCommand({
        ...listGroupsCommandConfig,
        GroupName: groupName,
      });

      const listUsersInGroupCommandResponse =
        await this.cognitoIdentityProviderClient?.send(listUsersInGroupCommand);

      return listUsersInGroupCommandResponse?.Users;
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        `Error when fetching Cognito users by group ${groupName}`,
        error
      );
    }
  };

  private getAdminUpdateUserAttributesCommandConfiguration = (
    username: string
  ) => ({
    UserPoolId: awsmobile.aws_user_pools_id,
    Username: username,
    DesiredDeliveryMediums: ["EMAIL"],
    ForceAliasCreation: false,
    UserAttributes: [
      {
        Name: "email_verified",
        Value: "true",
      },
      {
        Name: "phone_number_verified",
        Value: "true",
      },
    ],
  });

  public getCognitoGroups = async () => {
    try {
      const listGroupsCommandConfig = this.getListGroupsCommandConfig();

      const listGroupsCommand = new ListGroupsCommand(listGroupsCommandConfig);
      const listGroupsCommandResponse =
        await this.cognitoIdentityProviderClient?.send(listGroupsCommand);

      return listGroupsCommandResponse?.Groups?.filter(Boolean);
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        "Error when fetching Cognito groups",
        error
      );
    }
  };

  public confirmCognitoUser = async (username: string) => {
    try {
      // Auto-confirm email for created user
      const adminUpdateUserAttributesCommandConfig =
        this.getAdminUpdateUserAttributesCommandConfiguration(username);
      const adminUpdateUserAttributesCommand =
        new AdminUpdateUserAttributesCommand(
          adminUpdateUserAttributesCommandConfig
        );
      return await this.cognitoIdentityProviderClient?.send(
        adminUpdateUserAttributesCommand
      );
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        "Error when confirming Cognito user",
        error
      );
    }
  };

  private getCreateUserConfiguration = (
    username: string,
    name: string,
    phone: string,
    type: UserTypes
  ) => ({
    UserPoolId: awsmobile.aws_user_pools_id,
    Username: username,
    DesiredDeliveryMediums: ["EMAIL"],
    ForceAliasCreation: false,
    UserAttributes: [
      {
        Name: "name",
        Value: name,
      },
      {
        Name: "phone_number",
        Value: `+${phone.replace(/\D/g, "")}`,
      },
      {
        Name: "custom:type",
        Value: type,
      },
    ],
  });

  public createCognitoUser = async (
    username: string,
    name: string,
    phone: string,
    type: UserTypes
  ) => {
    // Create user in the Cognito User Pool
    const adminCreateUserCommandConfig = this.getCreateUserConfiguration(
      username,
      name,
      phone,
      type
    );
    const adminCreateUserCommand = new AdminCreateUserCommand(
      adminCreateUserCommandConfig
    );
    const adminCreateUserCommandResponse =
      await this.cognitoIdentityProviderClient?.send(adminCreateUserCommand);

    return adminCreateUserCommandResponse?.User;
  };

  public parseCognitoUser = (attributes: AttributeType[] | undefined) => {
    const userId = attributes?.find(
      (attribute) => attribute.Name === "sub"
    )?.Value;
    const fullName = attributes?.find(
      (attribute) => attribute.Name === "name"
    )?.Value;
    const email = attributes?.find(
      (attribute) => attribute.Name === "email"
    )?.Value;

    return { userId, fullName, email };
  };

  public fetchAllUsers = async () => {
    try {
      const listUsersCommandConfig = this.getListGroupsCommandConfig();
      const listUsersCommand = new ListUsersCommand(listUsersCommandConfig);

      return await this.cognitoIdentityProviderClient?.send(listUsersCommand);
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        "Error when fetching Cognito users",
        error
      );
    }
  };

  private getCreateGroupCommandConfig = (groupName: string) => ({
    GroupName: groupName.replace(/\s/g, ""),
    UserPoolId: awsmobile.aws_user_pools_id,
  });

  public createCognitoGroup = async (groupName: string) => {
    try {
      const createGroupCommandInput =
        this.getCreateGroupCommandConfig(groupName);
      const createGroupCommand = new CreateGroupCommand(
        createGroupCommandInput
      );

      return await this.cognitoIdentityProviderClient?.send(createGroupCommand);
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        "Error when creating Cognito group",
        error
      );
    }
  };

  private getAdminUpdateUserAttributesCommandConfig = (
    user: UpdateUserInput
  ) => ({
    UserPoolId: awsmobile.aws_user_pools_id,
    Username: user.email as string,
    UserAttributes: [
      {
        Name: "phone_number",
        Value: `+${user.phone?.replace(/\s/g, "")}`,
      },
      {
        Name: "name",
        Value: user.name as string,
      },
      {
        Name: "phone_number",
        Value: `+${user.phone?.replace(/\s/g, "")}`,
      },
      {
        Name: "phone_number_verified",
        Value: "true",
      },
    ],
  });

  private getGroupsConfiguration = (group: string, username: string) => ({
    UserPoolId: awsmobile.aws_user_pools_id,
    GroupName: group,
    Username: username,
  });

  public updateCognitoUser = async (user: UpdateUserInput) => {
    try {
      const config = this.getAdminUpdateUserAttributesCommandConfig(user);
      const command = new AdminUpdateUserAttributesCommand(config);

      return this.cognitoIdentityProviderClient?.send(command);
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        "Error when updating Cognito user",
        error
      );
    }
  };

  public deleteUserFromGroups = async (userId: string, groups: string[]) => {
    const adminRemoveUserFromGroupCommandResponses = groups
      .filter((group) => !Object.values(UserTypes).includes(group as UserTypes))
      .map((groupToDelete) => {
        const config = this.getGroupsConfiguration(groupToDelete, userId);

        const command = new AdminRemoveUserFromGroupCommand(config);
        return this.cognitoIdentityProviderClient?.send(command);
      });

    return Promise.all(adminRemoveUserFromGroupCommandResponses);
  };

  public resetPassword = async (userId: string) => {
    const command = new AdminSetUserPasswordCommand({
      UserPoolId: awsmobile.aws_user_pools_id,
      Username: userId,
      Password: "12345678",
      Permanent: false,
    });

    return this.cognitoIdentityProviderClient?.send(command);
  };

  public deleteCognitoUser = async (userId: string) => {
    const command = new AdminDeleteUserCommand({
      UserPoolId: awsmobile.aws_user_pools_id,
      Username: userId,
    });

    return this.cognitoIdentityProviderClient?.send(command);
  };
}

export default new CognitoService();
