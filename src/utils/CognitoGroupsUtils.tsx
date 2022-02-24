import { GroupType } from '@aws-sdk/client-cognito-identity-provider'
import { UserTypes } from '../enums/UserTypes'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import DateTimeUtils, { TimeFormats } from './DateTimeUtils'
import { splitCamelCase } from './StringUtils'

export const renderAllCognitoGroups = (
  groups: GroupType[]
): MultiSelectOption[] => {
  return (
    groups
      // .filter(
      //   (group) =>
      //     ![UserTypes.STUDENT].includes(
      //       group.GroupName as UserTypes
      //     )
      // )
      .map((group) => {
        return {
          label: `${splitCamelCase(group.GroupName)} ${group.Description}`,
          value: group.GroupName,
          colorScheme: 'red'
        }
      })
  )
}

export const mapSelectedCognitoGroups = (
  groups: GroupType[],
  selectedGroups: string[]
) => {
  return groups
    .filter((group) => selectedGroups.includes(group.GroupName || ''))
    .map((filteredGroups) => {
      return {
        label: `${splitCamelCase(filteredGroups.GroupName)} ${
          filteredGroups.Description
        }`,
        value: filteredGroups.GroupName,
        colorScheme: 'red'
      }
    })
}

export const renderCognitoGroupsList = (
  groups: GroupType[]
) =>
  // It only renders the groups that are courses
  groups
    .filter(
      (group) => ![UserTypes.STUDENT].includes(group.GroupName as UserTypes)
    )
    .map((group, index) => (
      <option key={index} value={group.GroupName}>
        {splitCamelCase(group.GroupName)} {group.Description}
      </option>
    ))

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
