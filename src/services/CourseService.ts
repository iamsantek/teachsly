import { LogLevel, LogTypes } from '../enums/LogTypes'
import { listCourses } from '../graphql/queries'
import { createCourse, updateCourse } from '../graphql/mutations'
import { Course } from '../models'
import DateTimeUtils, { TimeFormats } from '../utils/DateTimeUtils'
import Logger from '../utils/Logger'
import GraphQLService from './GraphQLService'
import CognitoService from './aws/CognitoService'
import { removeNotAllowedPropertiesFromModel } from '../utils/GraphQLUtils'
import { GRAPHQL_MAX_PAGE_RESULTS } from '../constants/GraphQL'
import { Course as CourseAPI, CreateCourseInput, CreateCourseMutation, ListCoursesQuery, UpdateCourseMutation } from '../API'
import { UserTypes } from '../enums/UserTypes'
import { generateExternalId } from '../utils/CourseUtils'

interface FetchCourseParams {
  nextToken?: string | null,
  limit?: number | null,
  filterDisabledCourses?: boolean;
}

class CourseService {
  public fetchCourses = async ({
    nextToken = null,
    limit = GRAPHQL_MAX_PAGE_RESULTS,
    filterDisabledCourses = true
  }: FetchCourseParams) => {
    return GraphQLService.fetchQuery<ListCoursesQuery>({
      query: listCourses,
      filter: filterDisabledCourses
        ? {
            isActive: {
              eq: 'true'
            }
          }
        : {},
      nextToken,
      limit
    })
  }

  deleteCourse = async () => {
    // TODO: Implement delete course logic
  }

  public createCourse = async (courseCreation: CreateCourseInput) => {
    const scheduleStartTime = DateTimeUtils.formateHour(
      courseCreation.scheduleStartTime,
      TimeFormats.AWSTime
    )
    const scheduleEndTime = DateTimeUtils.formateHour(
      courseCreation.scheduleEndTime,
      TimeFormats.AWSTime
    )
    const scheduleDates = Array.from(courseCreation.scheduleDates.values())
    const groupExternalId = generateExternalId(courseCreation)

    const course = new Course({
      name: courseCreation.name,
      scheduleDates,
      scheduleStartTime,
      scheduleEndTime,
      virtualClassLink: courseCreation.virtualClassLink as string,
      externalId: groupExternalId,
      scheduleYear: Number(courseCreation.scheduleYear)
    })

    const createCognitoGroupResponse = await CognitoService.createCognitoGroup(groupExternalId)

    if (createCognitoGroupResponse?.Group) {
      return GraphQLService.fetchQuery<CreateCourseMutation>({
        query: createCourse,
        input: course
      })
    }

    Logger.log(
      LogLevel.ERROR,
      LogTypes.CourseService,
      'Error when creating Course'
    )
  }

  public updateCourse = async (course: CourseAPI) => {
    try {
      const models = await GraphQLService.fetchQuery<UpdateCourseMutation>({
        query: updateCourse,
        input: removeNotAllowedPropertiesFromModel(course)
      })

      return (models?.updateCourse as CourseAPI) || []
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        'Error when updating Media',
        error
      )
    }
  }

  private courseNamesFilter = (courseNames: string[]) => courseNames.map(course => {
    return {
      externalId: { eq: course }
    }
  })

  public getEnrolledCourses = (groups: string[]) => {
    return groups?.filter(group => !Object.values(UserTypes).includes(group as UserTypes))
  }

  public searchCourses = async (courseNames: string[]) => {
    try {
      const filterCourses = this.courseNamesFilter(courseNames)
      return GraphQLService.fetchQuery<ListCoursesQuery>({
        query: listCourses,
        filter: {
          or: filterCourses
        }
      })
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        'Error when searching courses',
        error
      )
    }
  }
}

export default new CourseService()
