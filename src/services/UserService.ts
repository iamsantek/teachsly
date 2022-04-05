import { LogLevel, LogTypes } from '../enums/LogTypes'
import { UserTypes } from '../enums/UserTypes'
import { listUsers } from '../graphql/queries'
import { updateUser as updateUserMutation } from '../graphql/mutations'
import { User as UserAPI, ListUsersQuery, ModelUserFilterInput, UpdateUserInput, UpdateUserMutation, CreateUserInput } from '../API'
import Logger from '../utils/Logger'
import AuthService from './AuthService'
import GraphQLService from './GraphQLService'
import CognitoService from './aws/CognitoService'

class UserService {
  public async createUser (user: CreateUserInput, type: UserTypes) {
    try {
      const cognitoUser = await AuthService.createUser(user, type)

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

  private cognitoIdFilter = (cognitoId: string): ModelUserFilterInput => ({ cognitoId: { eq: cognitoId } })

  public fetchUserByCognitoId = async (cognitoId: string | undefined) => {
    if (!cognitoId) {
      return
    }

    const filter = this.cognitoIdFilter(cognitoId)
    const users = await this.fetchUsers(filter)

    return users?.listUsers?.items[0]
  }

  public getUserType = (user: UserAPI | undefined | null) => {
    return Object.values(UserTypes).find((groupType) => user?.groups?.includes(groupType))
  }

  private fetchUsers = async (filter: ModelUserFilterInput, nextToken?: string | null) => {
    return GraphQLService.fetchQuery<ListUsersQuery>({
      query: listUsers,
      filter: filter,
      nextToken
    })
  }

  public fetchUsersByCourseOrType = async (courseOrType: string | UserTypes | undefined = undefined, nextToken: string | null = null) => {
    if (!courseOrType) {
      return
    }

    const usersByCourseFilter: ModelUserFilterInput = {
      and: [
        { isDisabledUser: { eq: false } },
        { groups: { contains: courseOrType } }
      ]
    }

    return this.fetchUsers(usersByCourseFilter, nextToken)
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
        filter: this.cognitoIdFilter(user.cognitoId as string),
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

  public resetPassword(userId: string) {
    return CognitoService.resetPassword(userId)
  }
}

export default new UserService()
