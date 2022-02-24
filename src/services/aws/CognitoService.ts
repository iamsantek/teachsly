import {
  ListUsersCommand,
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand,
  ListUsersInGroupCommand,
  ListGroupsCommand,
  AdminUpdateUserAttributesCommand,
  AdminCreateUserCommand,
  AttributeType,
  CreateGroupCommand
} from '@aws-sdk/client-cognito-identity-provider'
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers'
import awsmobile from '../../aws-exports'
import { LogLevel, LogTypes } from '../../enums/LogTypes'
import { UserTypes } from '../../enums/UserTypes'
import Logger from '../../utils/Logger'

const logTag = LogTypes.AuthService

class CognitoService {
  private cognitoIdentityProviderClient: CognitoIdentityProviderClient;

  constructor () {
    this.cognitoIdentityProviderClient =
      this.createCognitoIdentityProviderClient()
  }

  private createCognitoIdentityProviderClient = () =>
    new CognitoIdentityProviderClient({
      region: awsmobile.aws_project_region,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: awsmobile.aws_project_region },
        identityPoolId: awsmobile.aws_cognito_identity_pool_id,
        logins: {}
      })
    });

  private getListGroupsCommandConfig = () => ({
    UserPoolId: awsmobile.aws_user_pools_id
  });

  public assignUserToCognitoGroup = async (
    userId: string,
    groups: string[]
  ) => {
    try {
      const adminAddUserToGroupConfig = this.getListGroupsCommandConfig()

      const adminAddUserToGroupCommandPromises = groups.map((groupName) => {
        const adminAddUserToGroupCommand = new AdminAddUserToGroupCommand({
          ...adminAddUserToGroupConfig,
          GroupName: groupName,
          Username: userId
        })

        return this.cognitoIdentityProviderClient.send(
          adminAddUserToGroupCommand
        )
      })

      return await Promise.all(adminAddUserToGroupCommandPromises)
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        'Error when assigning groups to user',
        error
      )
    }
  };

  public getCognitoUsersByGroupName = async (groupName: string) => {
    try {
      const listGroupsCommandConfig = this.getListGroupsCommandConfig()

      const listUsersInGroupCommand = new ListUsersInGroupCommand({
        ...listGroupsCommandConfig,
        GroupName: groupName
      })

      const listUsersInGroupCommandResponse =
        await this.cognitoIdentityProviderClient.send(listUsersInGroupCommand)

      return listUsersInGroupCommandResponse.Users
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        `Error when fetching Cognito users by group ${groupName}`,
        error
      )
    }
  };

  private getAdminUpdateUserAttributesCommandConfiguration = (
    username: string
  ) => ({
    UserPoolId: awsmobile.aws_user_pools_id,
    Username: username,
    DesiredDeliveryMediums: ['EMAIL'],
    ForceAliasCreation: false,
    UserAttributes: [
      {
        Name: 'email_verified',
        Value: 'true'
      }
    ]
  });

  public getCognitoGroups = async () => {
    try {
      const cognitoIdentityProviderClient =
        this.createCognitoIdentityProviderClient()
      const listGroupsCommandConfig = this.getListGroupsCommandConfig()

      const listGroupsCommand = new ListGroupsCommand(listGroupsCommandConfig)
      const listGroupsCommandResponse =
        await cognitoIdentityProviderClient.send(listGroupsCommand)

      return listGroupsCommandResponse.Groups?.filter(Boolean)
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        'Error when fetching Cognito groups',
        error
      )
    }
  };

  public confirmCognitoUser = async (username: string) => {
    try {
      // Auto-confirm email for created user
      const adminUpdateUserAttributesCommandConfig =
        this.getAdminUpdateUserAttributesCommandConfiguration(username)
      const adminUpdateUserAttributesCommand =
        new AdminUpdateUserAttributesCommand(
          adminUpdateUserAttributesCommandConfig
        )
      return await this.cognitoIdentityProviderClient.send(
        adminUpdateUserAttributesCommand
      )
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        'Error when confirming Cognito user',
        error
      )
    }
  };

  private getCreateUserConfiguration = (username: string, name: string) => ({
    UserPoolId: awsmobile.aws_user_pools_id,
    Username: username,
    DesiredDeliveryMediums: ['EMAIL'],
    ForceAliasCreation: false,
    UserAttributes: [
      {
        Name: 'name',
        Value: name
      }
    ]
  });

  public createCognitoUser = async (
    username: string,
    name: string,
    type: UserTypes
  ) => {
    // Create user in the Cognito User Pool
    const adminCreateUserCommandConfig = this.getCreateUserConfiguration(
      username,
      name
    )
    const cognitoIdentityProviderClient =
      this.createCognitoIdentityProviderClient()
    const adminCreateUserCommand = new AdminCreateUserCommand(
      adminCreateUserCommandConfig
    )
    const adminCreateUserCommandResponse =
      await cognitoIdentityProviderClient.send(adminCreateUserCommand)

    return adminCreateUserCommandResponse.User
  };

  public parseCognitoUser = (attributes: AttributeType[] | undefined) => {
    const userId = attributes?.find(
      (attribute) => attribute.Name === 'sub'
    )?.Value
    const fullName = attributes?.find(
      (attribute) => attribute.Name === 'name'
    )?.Value
    const email = attributes?.find(
      (attribute) => attribute.Name === 'email'
    )?.Value

    return { userId, fullName, email }
  };

  public fetchAllUsers = async () => {
    try {
      const listUsersCommandConfig = this.getListGroupsCommandConfig()
      const listUsersCommand = new ListUsersCommand(listUsersCommandConfig)

      return await this.cognitoIdentityProviderClient.send(listUsersCommand)
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        'Error when fetching Cognito users',
        error
      )
    }
  };

  private getCreateGroupCommandConfig = (
    groupName: string,
    description: string
  ) => ({
    GroupName: groupName.replace(/\s/g, ''),
    Description: description,
    UserPoolId: awsmobile.aws_user_pools_id
  });

  public createCognitoGroup = async (
    groupName: string,
    description: string
  ) => {
    try {
      const createGroupCommandInput = this.getCreateGroupCommandConfig(
        groupName,
        description
      )
      const createGroupCommand = new CreateGroupCommand(
        createGroupCommandInput
      )

      return await this.cognitoIdentityProviderClient.send(createGroupCommand)
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        logTag,
        'Error when creating Cognito group',
        error
      )
    }
  };
}

export default new CognitoService()
