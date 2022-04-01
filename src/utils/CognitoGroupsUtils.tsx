import { GroupType } from '@aws-sdk/client-cognito-identity-provider'
import { UserTypes } from '../enums/UserTypes'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import { User } from '../API'
import { splitCamelCase } from './StringUtils'

export const mapSelectedCognitoGroups = (
  groups: GroupType[],
  selectedGroups: string[]
): MultiSelectOption[] => {
  return groups
    .filter((group) => selectedGroups.includes(group.GroupName || ''))
    .map((filteredGroups) => {
      return {
        label: `${splitCamelCase(filteredGroups.GroupName)} ${filteredGroups.Description
          }`,
        value: filteredGroups.GroupName,
        colorScheme: 'brand'
      }
    })
}

export const isAdmin = (user?: User | null) => user?.groups.includes(UserTypes.ADMIN)

export const isTeacher = (user?: User | null) => user?.groups.includes(UserTypes.TEACHER)

export const generalGroups = [UserTypes.STUDENT, UserTypes.TEACHER]
