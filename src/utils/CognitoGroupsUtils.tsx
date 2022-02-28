import { GroupType } from '@aws-sdk/client-cognito-identity-provider'
import { nonStudentGroups } from '../constants/User'
import { UserTypes } from '../enums/UserTypes'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import { User } from '../platform-models/User'
import DateTimeUtils, { TimeFormats } from './DateTimeUtils'
import { splitCamelCase } from './StringUtils'

export const renderUserGroups = (
  groups: GroupType[],
  skipGroups: string[] = []
): MultiSelectOption[] => {
  const filteredGroups = [...groups].filter(group => !nonStudentGroups.includes(group.GroupName as UserTypes) || skipGroups.includes(group.GroupName as UserTypes))

  return filteredGroups
    .map((group) => {
      return {
        label: `${splitCamelCase(group.GroupName)} ${group.Description}`,
        value: group.GroupName,
        colorScheme: 'brand'
      }
    })
}

export const mapSelectedCognitoGroups = (
  groups: GroupType[],
  selectedGroups: string[]
) => {
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

export const isAdmin = (user?: User | null) => user?.type === UserTypes.ADMIN

export const isTeacher = (user?: User | null) => user?.type === UserTypes.TEACHER

export const formatCognitoGroupDescription = (
  days: string[],
  startTime: string,
  endTime: string
) => {
  const shortDays = DateTimeUtils.shortDays(days)
  const formattedStartTime = DateTimeUtils.formateHour(
    startTime,
    TimeFormats.TwentyFourHours
  )
  const formattedEndTime = DateTimeUtils.formateHour(
    endTime,
    TimeFormats.TwentyFourHours
  )

  return `${shortDays} (${formattedStartTime} - ${formattedEndTime})`
}
