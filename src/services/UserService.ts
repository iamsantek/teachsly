import { LogLevel, LogTypes } from '../enums/LogTypes'
import { UserTypes } from '../enums/UserTypes'
import { listUsers } from '../graphql/queries'
import { updateUser as updateUserMutation } from '../graphql/mutations'
import { User } from '../platform-models/User'
import Logger from '../utils/Logger'
import AuthService from './AuthService'
import GraphQLService, { FilterInput } from './GraphQLService'
import { ListUsersQuery, ModelUserConditionInput, UpdateUserInput, UpdateUserMutation } from '../API'
import CognitoService from './aws/CognitoService'

class UserService {
  public async createUser (user: User, type: UserTypes) {
    try {
      const updatedUser: User = {
        ...user,
        name: user.name.trim(),
        groups: [...user.groups, type],
        type
      }
      const cognitoUser = await AuthService.createUser(updatedUser)

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

  private filterByCognitoId = (cognitoId: string): ModelUserConditionInput => {
    return { cognitoId: { eq: cognitoId } }
  }

  public fetchUserByCognitoId = async (cognitoId: string) => {
    if (!cognitoId) {
      return
    }

    const filterByCognitoId = this.filterByCognitoId(cognitoId)
    const users = await this.fetchUsers(filterByCognitoId)

    return users?.listUsers?.items[0]
  }

  public fetchUsersByType = async (type: UserTypes, nextToken: string | null = null) => {
    const filter = this.filterByGroupType(type)

    return await this.fetchUsers(filter, nextToken)
  }

  public getUserType = (user: User) => {
    if (!user) {
      return
    }

    const { groups } = user

    return Object.values(UserTypes).find((group) => groups?.includes(group))
  }

  private fetchUsers = async (filter: Object, nextToken?: string | null) => {
    return GraphQLService.fetchQuery<ListUsersQuery>({
      query: listUsers,
      filter: filter as FilterInput,
      nextToken
    })
  }

  public fetchUsersByCourse = async (courseName: string | undefined = undefined, nextToken: string | null = null) => {
    return GraphQLService.fetchQuery<ListUsersQuery>({
      query: listUsers,
      filter: {
        and: [
          { isDisabledUser: { eq: 'false' } },
          courseName && { groups: { contains: courseName } }
        ]
      },
      nextToken
    })
  }

  private updateUserGroups = async (email: string, updatedGroups: string[], previousGroups: string[]) => {
    const deletedGroups = previousGroups.filter(x => !updatedGroups.includes(x))

    const deleteUserFromGroups = CognitoService.deleteUserFromGroups(
      email,
      deletedGroups
    )

    const assignUserToCognitoGroup = CognitoService.assignUserToCognitoGroup(
      email,
      updatedGroups
    )

    return Promise.all([deleteUserFromGroups, assignUserToCognitoGroup])
  }

  public updateUser = async (user: UpdateUserInput, shouldUpdateGroups = false, previousGroups: string[] = []) => {
    try {
      if (shouldUpdateGroups) {
        const updateUserGroups = await this.updateUserGroups(
          user.email as string,
          user.groups as string[],
          previousGroups
        )

        if (!updateUserGroups) {
          return
        }
      }

      await CognitoService.updateCognitoUser(user)

      return GraphQLService.fetchQuery<UpdateUserMutation>({
        query: updateUserMutation,
        filter: this.filterByCognitoId(user.cognitoId as string),
        input: user
      })
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.UserService,
        'Error when updating user',
        error
      )
    }
  }
}

export default new UserService()
