import { Course, CreateCourseInput, EnglishLevel } from '../API'
import { UserTypes } from '../enums/UserTypes'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import DateTimeUtils, { TimeFormats } from './DateTimeUtils'
import { translate } from './LanguageUtils'
import { capitalize } from './StringUtils'

export const generateExternalId = (course: CreateCourseInput | Course) => `${course.name.replace(/\s+/g, '')}${course.scheduleYear}`

export const formatCourseName = (course: Course) => {
  const dates = DateTimeUtils.shortDays(course.scheduleDates as number[])
  const startTime = DateTimeUtils.formateHour(course.scheduleStartTime, TimeFormats.TwentyFourHours)
  const endTime = DateTimeUtils.formateHour(course.scheduleEndTime, TimeFormats.TwentyFourHours)

  return `${course.name} (${dates} ${startTime} - ${endTime}) [${course.scheduleYear}] ${course.virtualClassLink ? ` - ${translate('VIRTUAL_COURSE')}` : ''}`
}

export const sortCoursesByName = (courses: Course[]) => courses.sort((a, b) => a.name.localeCompare(b.name))

export const renderCourseList = ({courses, additionalGroups, includeEnglishLevels = false, showOnlyActiveCourses = true}: {
  courses: Course[],
  additionalGroups?: string[],
  includeEnglishLevels?: boolean,
  showOnlyActiveCourses?: boolean,

}): MultiSelectOption[] => {

  if (showOnlyActiveCourses) {
    const currentYear = new Date().getFullYear()
    courses = courses.filter(course => course.scheduleYear === currentYear)
  }

  const groupList = courses.map(course => {
    const courseName = formatCourseName(course)

    return {
      label: courseName,
      value: course.externalId,
      colorScheme: course.scheduleYear === new Date().getFullYear() ? 'brand' : 'gray'
    }
  })

  const additionalGroupsAdded = additionalGroups?.map(group => ({
    label: group,
    value: group,
    colorScheme: 'brand'
  }))

  const englishLevels: MultiSelectOption[] = []
  if (includeEnglishLevels) {
    Object.values(EnglishLevel).forEach((level) => {
      englishLevels.push({
        label: `${capitalize(level)} (${translate('ALL_COURSES')}) `,
        value: level,
        colorScheme: 'red'
      })
    })
  }

  return [...groupList, ...additionalGroupsAdded || [], ...englishLevels]
}

export const transformGroups = (courses: Course[], selectedGroups: string[]) => {
  const userRoles = Object.values(UserTypes).filter(group => selectedGroups.includes(group))
  const selectedCourses = courses.filter(course => selectedGroups.includes(course.externalId))

  return renderCourseList({courses: selectedCourses, additionalGroups: userRoles, showOnlyActiveCourses: false})
}

export const groupsToString = (courses: Course[], groups: string[] | undefined, shouldIncludeUserTypes: boolean = true) => {
  if (!courses || !groups) {
    return []
  }

  let userTypes: UserTypes[] = []
  const englishLevels = Object.values(EnglishLevel).filter(group => groups.includes(group)).map(level => capitalize(level))
  const groupNames = courses.filter(course => groups.includes(course.externalId)).map(course2 => course2.name)

  if (shouldIncludeUserTypes) {
    userTypes = Object.values(UserTypes).filter(userType => groups.includes(userType))
  }

  return [...groupNames, ...userTypes, ...englishLevels]
}

export const getActiveAndArchivedCourses = (courses: Course[]) => {
  const currentYear = new Date().getFullYear();
  const currentYearCourses: Course[] = [];
  const archivedCourses: Course[] = [];

  courses.forEach((course) => {
    if (course.scheduleYear === currentYear) {
      currentYearCourses.push(course);
    } else {
      archivedCourses.push(course);
    }
  });

  return { currentYearCourses, archivedCourses }
}

export const getUpcomingCourses = (courses: Course[]): Course[] => {
  const now = new Date(); // Get the current date and time
  const hoursInAdvance = 8; // How many hours in advance to show the course
  const hoursInAdvanceDate = new Date(now.getTime() + hoursInAdvance * 60 * 60 * 1000); // Calculate the date and time 2 hours from now
  const daysInAdvance = 1

  const upcomingCourses = courses.filter((course) => {
    if (course.scheduleDates) {
      // Check if today is one of the scheduled days
      const today = now.getDay() === 0 ? 0 : now.getDay(); // Convert Sunday from 0 to 7
      if (!course.scheduleDates.includes(today + daysInAdvance)) {
        return false;
      }
    }

    if (course.scheduleStartTime && course.scheduleEndTime) {
      // Check if the current time is between the start and end time of the course
      const argStartDate = new Date(`2000-01-01T${course.scheduleStartTime}`);
      const argEndDate = new Date(`2000-01-01T${course.scheduleEndTime}`);
      const startTime = new Date(argStartDate)
      const endTime = new Date(argEndDate)

      // Normalize to GMT+0
      startTime.setHours(argStartDate.getHours() + 3);
      endTime.setHours(argEndDate.getHours() + 3);

      // Check if the startTime is between the current time and 2 hours from now
      console.log(`${course.name}`)
      console.log(`Start time ${startTime}`)
      console.log(`End time ${endTime}`)
      console.log(`Now ${now}`)
      if (startTime.getTime() < now.getTime() || startTime.getTime() > hoursInAdvanceDate.getTime()) {
        console.log(`${course.name} salio poque no es la hora`)
        return true;
      }
    }

    return false;
  });

  return upcomingCourses;
}
