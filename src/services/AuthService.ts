import { LogLevel, LogTypes } from '../enums/LogTypes'
import Logger from '../utils/Logger'
import CognitoService from './aws/CognitoService'
import GraphQLService from './GraphQLService'
import { Auth } from 'aws-amplify'
import { createUser } from '../graphql/mutations'
import { CreateUserInput, CreateUserMutation } from '../API'
import { UserTypes } from '../enums/UserTypes'
import { User } from '../models'

class AuthService {
  public createUser = async (user: CreateUserInput, type: UserTypes) => {
    const { name, email: username, phone } = user

    const updatedUser: CreateUserInput = {
      ...user,
      name: user.name.trim(),
      groups: [...user.groups, type]
    }

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

      const { userId } = CognitoService.parseCognitoUser(
        adminCreateUserCommandResponse?.Attributes
      )
      const createDynamoDBUserResponse = await this.persistUser(
        updatedUser,
        userId
      )
      const assignUserToCognitoGroupResponse =
        await CognitoService.assignUserToCognitoGroup(
          userId || '',
          updatedUser.groups as string[]
        )

      if (!assignUserToCognitoGroupResponse || !createDynamoDBUserResponse) {
        return
      }

      return createDynamoDBUserResponse.createUser
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
    user: CreateUserInput,
    cognitoId: string | undefined
  ) => {
    if (!cognitoId) {
      return
    }

    const { name, email, groups, phone } = user
    const dynamoDbBUser = new User({
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
