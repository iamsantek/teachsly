import { Course } from '../API'
import { UserTypes } from '../enums/UserTypes'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import DateTimeUtils, { TimeFormats } from './DateTimeUtils'
import { splitCamelCase } from './StringUtils'

export const renderCourseList = (courses: Course[], additionalGroups?: string[]): MultiSelectOption[] => {
  const groupList = courses.map(course => {
    const dates = DateTimeUtils.shortDays(course.scheduleDates as number[])
    const startTime = DateTimeUtils.formateHour(course.scheduleStartTime, TimeFormats.TwentyFourHours)
    const endTime = DateTimeUtils.formateHour(course.scheduleEndTime, TimeFormats.TwentyFourHours)

    return {
      label: `${course.name} (${dates} ${startTime} - ${endTime})`,
      value: course.name.replace(/\s+/g, ''),
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
  const coursesWithSpaces = selectedGroups.map(group => splitCamelCase(group))
  const userRoles = Object.values(UserTypes).filter(group => coursesWithSpaces.includes(group))
  const selectedCourses = courses.filter(course => coursesWithSpaces.includes(course.name))

  return renderCourseList(selectedCourses, userRoles)
}
