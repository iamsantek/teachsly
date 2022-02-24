import { DynamoDBUser } from '../API'
import { LogLevel, LogTypes } from '../enums/LogTypes'
import { UserTypes } from '../enums/UserTypes'
import { listDynamoDBUsers } from '../graphql/queries'
import { User } from '../platform-models/User'
import Logger from '../utils/Logger'
import AuthService from './AuthService'
import GraphQLService, { FilterInput, GraphQLResultWithNextToken } from './GraphQLService'

class UserService {
  public async createUser (user: User) {
    try {
      const cognitoUser = await AuthService.createUser(user)

      if (!cognitoUser) {
        return
      }

      Logger.log(
        LogLevel.INFO,
        LogTypes.UserService,
        'User successfully created'
      )

      return cognitoUser
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.UserService,
        'Error signing up',
        error
      )
    }
  }

  private filterByGroupType = (type: UserTypes) => {
    return { groups: { contains: type } }
  }

  private filterByCognitoId = (cognitoId: string) => {
    return { cognitoId: { eq: cognitoId } }
  }

  public fetchUserByCognitoId = async (cognitoId: string) => {
    const filterByCognitoId = this.filterByCognitoId(cognitoId)
    const users = await this.fetchUsers(filterByCognitoId)

    return users?.items && (users.items as DynamoDBUser[])[0]
  }

  public fetchUsersByType = async (type: UserTypes | 'ALL') => {
    const filter = type !== 'ALL' ? this.filterByGroupType(type) : {}

    return await this.fetchUsers(filter)
  }

  public getUserType = (user: User) => {
    if (!user) {
      return
    }

    const { groups } = user

    return Object.values(UserTypes).find((group) => groups?.includes(group))
  }

  private fetchUsers = async (filter: Object): Promise<GraphQLResultWithNextToken<DynamoDBUser> | undefined> => {
    return GraphQLService.fetchQuery({
      query: listDynamoDBUsers,
      filter: filter as FilterInput
    })
  }
}

export default new UserService()
