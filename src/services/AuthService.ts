import { LogLevel, LogTypes } from '../enums/LogTypes'
import { User } from '../platform-models/User'
import { User as UserAPI } from '../models/index'
import Logger from '../utils/Logger'
import CognitoService from './aws/CognitoService'
import GraphQLService from './GraphQLService'
import { Auth } from 'aws-amplify'
import { createUser } from '../graphql/mutations'
import { CreateUserMutation } from '../API'
import { UserTypes } from '../enums/UserTypes'

class AuthService {
  public createUser = async (user: User) => {
    const { name, email: username, phone, type } = user

    try {
      const adminCreateUserCommandResponse =
        await CognitoService.createCognitoUser(username, name, phone, type as UserTypes) // Create Cognito user in the User Pool
      const confirmCognitoUserResponse =
        await CognitoService.confirmCognitoUser(username) // Auto-confirm email

      if (!adminCreateUserCommandResponse) {
        return
      }

      if (!confirmCognitoUserResponse) {
        return
      }

      const { userId, fullName, email } = CognitoService.parseCognitoUser(
        adminCreateUserCommandResponse?.Attributes
      )
      const createDynamoDBUserResponse = await this.persistUser(
        user,
        userId
      )
      const assignUserToCognitoGroupResponse =
        await CognitoService.assignUserToCognitoGroup(
          userId || '',
          user.groups
        )

      if (!assignUserToCognitoGroupResponse || !createDynamoDBUserResponse) {
        return
      }

      return { userId, fullName, email }
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.AuthService,
        'Error when creating Cognito user',
        error
      )
    }
  }

  private persistUser = async (
    user: User,
    cognitoId: string | undefined
  ) => {
    if (!cognitoId) {
      return
    }

    const { name, email, groups, phone } = user
    const dynamoDbBUser = new UserAPI({
      name,
      email,
      cognitoId,
      groups,
      phone
    })

    return GraphQLService.fetchQuery<CreateUserMutation>({
      query: createUser,
      input: dynamoDbBUser
    })
  }

  public signIn = async (email: string, password: string) => {
    try {
      return Auth.signIn(email, password)
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.AuthService,
        'Error when signing in',
        error
      )
    }
  }
}

export default new AuthService()
