import awsmobile from "../aws-exports";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { User } from "../platform-models/User";
import Logger from "../utils/Logger";
import {
  CognitoIdentityProviderClient,
  AdminUpdateUserAttributesCommand,
  AdminCreateUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { UserTypes } from "../enums/UserTypes";

class AuthService {
  public createCognitoUser = async (user: User) => {
    const { name, email: username, type } = user;

    try {
      //Create user in the Cognito User Pool
      const adminCreateUserCommandConfig = this.getCreateUserConfiguration(
        username,
        name,
        type
      );
      const cognitoIdentityProviderClient =
        this.createCognitoIdentityProviderClient();
      const adminCreateUserCommand = new AdminCreateUserCommand(
        adminCreateUserCommandConfig
      );
      const adminCreateUserCommandResponse =
        await cognitoIdentityProviderClient.send(adminCreateUserCommand);

      if (!adminCreateUserCommandResponse.User) {
        return;
      }

      //Auto-confirm email for created user
      const adminUpdateUserAttributesCommandConfig =
        this.getAdminUpdateUserAttributesCommandConfiguration(username);
      const adminUpdateUserAttributesCommand =
        new AdminUpdateUserAttributesCommand(
          adminUpdateUserAttributesCommandConfig
        );
      const response = await cognitoIdentityProviderClient.send(
        adminUpdateUserAttributesCommand
      );

      const attributes = adminCreateUserCommandResponse.User.Attributes;
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
    } catch (error) {
      console.log(error);
      Logger.log(
        LogLevel.ERROR,
        LogTypes.UserService,
        "Error when creating Cognito user",
        error
      );
    }
  };

  private getCreateUserConfiguration = (
    username: string,
    name: string,
    type: UserTypes
  ) => {
    return {
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
          Name: "custom:type",
          Value: type,
        },
      ],
    };
  };

  private createCognitoIdentityProviderClient = () => {
    return new CognitoIdentityProviderClient({
      region: awsmobile.aws_project_region,
      credentials: fromCognitoIdentityPool({
        clientConfig: { region: awsmobile.aws_project_region },
        identityPoolId: awsmobile.aws_cognito_identity_pool_id,
        logins: {},
      }),
    });
  };

  private getAdminUpdateUserAttributesCommandConfiguration = (
    username: string
  ) => {
    return {
      UserPoolId: awsmobile.aws_user_pools_id,
      Username: username,
      DesiredDeliveryMediums: ["EMAIL"],
      ForceAliasCreation: false,
      UserAttributes: [
        {
          Name: "email_verified",
          Value: "true",
        },
      ],
    };
  };
}

export default new AuthService();
