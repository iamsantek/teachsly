import { Course, CreateCourseInput } from '../API'
import { UserTypes } from '../enums/UserTypes'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import DateTimeUtils, { TimeFormats } from './DateTimeUtils'
import { translate } from './LanguageUtils'

export const generateExternalId = (course: CreateCourseInput | Course) => `${course.name.replace(/\s+/g, '')}${course.scheduleYear}`

export const renderCourseList = (courses: Course[], additionalGroups?: string[]): MultiSelectOption[] => {
  const groupList = courses.map(course => {
    const dates = DateTimeUtils.shortDays(course.scheduleDates as number[])
    const startTime = DateTimeUtils.formateHour(course.scheduleStartTime, TimeFormats.TwentyFourHours)
    const endTime = DateTimeUtils.formateHour(course.scheduleEndTime, TimeFormats.TwentyFourHours)

    return {
      label: `${course.name} (${dates} ${startTime} - ${endTime}) ${course.virtualClassLink ? ` - ${translate('VIRTUAL_COURSE')}` : ''}`,
      value: generateExternalId(course),
      colorScheme: 'brand'
    }
  })

  const additionalGroupsAdded = additionalGroups?.map(group => ({
    label: group,
    value: group,
    colorScheme: 'brand'
  }))

  return [...groupList, ...additionalGroupsAdded || []]
}

export const transformGroups = (courses: Course[], selectedGroups: string[]) => {
  const userRoles = Object.values(UserTypes).filter(group => selectedGroups.includes(group))
  const selectedCourses = courses.filter(course => selectedGroups.includes(course.externalId))

  return renderCourseList(selectedCourses, userRoles)
}

export const groupsToString = (courses: Course[], groups: string[] | undefined, shouldIncludeUserTypes: boolean = true) => {
  if (!courses || !groups) {
    return []
  }

  const groupNames = courses.filter(course => groups.includes(course.externalId)).map(course2 => course2.name)

  if (shouldIncludeUserTypes) {
    const userTypes = Object.values(UserTypes).filter(userType => groups.includes(userType))
    return groupNames.concat(userTypes)
  }

  return groupNames
}
