import { graphqlOperation } from 'aws-amplify'
import { LogLevel, LogTypes } from '../enums/LogTypes'
import { listCourses, searchCourses } from '../graphql/queries'
import { createCourse, updateCourse } from '../graphql/mutations'
import { Course } from '../models'
import { Course as PlatformCourse } from '../platform-models/Course'
import DateTimeUtils, { TimeFormats } from '../utils/DateTimeUtils'
import Logger from '../utils/Logger'
import GraphQLService from './GraphQLService'
import CognitoService from './aws/CognitoService'
import { removeNotAllowedPropertiesFromModel } from '../utils/GraphQLUtils'
import { GRAPHQL_MAX_PAGE_RESULTS } from '../constants/GraphQL'
import { ListCoursesQuery, SearchCoursesQuery } from '../API'
import { UserTypes } from '../enums/UserTypes'

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

  public createCourse = async (courseCreation: PlatformCourse) => {
    const scheduleStartTime = DateTimeUtils.formateHour(
      courseCreation.scheduleStartTime,
      TimeFormats.AWSTime
    )
    const scheduleEndTime = DateTimeUtils.formateHour(
      courseCreation.scheduleEndTime,
      TimeFormats.AWSTime
    )
    const scheduleDates = Array.from(courseCreation.scheduleDates.values())

    const course = new Course({
      name: courseCreation.name,
      scheduleDates,
      scheduleStartTime,
      scheduleEndTime,
      virtualClassLink: courseCreation.virtualClassLink
    })

    const createCognitoGroupResponse = await CognitoService.createCognitoGroup(
      courseCreation.name
    )

    if (createCognitoGroupResponse?.Group) {
      return await GraphQLService.graphQL(
        graphqlOperation(createCourse, { input: course })
      )
    }

    Logger.log(
      LogLevel.ERROR,
      LogTypes.CourseService,
      'Error when creating Course'
    )
  }

  public updateCourse = async (course: Course) => {
    try {
      const models = await GraphQLService.graphQL<any>(
        graphqlOperation(updateCourse, {
          input: removeNotAllowedPropertiesFromModel(course)
        })
      )

      return (models?.data?.updateCourse as Course) || []
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        'Error when updating Media',
        error
      )
    }

    return GraphQLService.fetchQuery({
      query: updateCourse
    })
  }

  private courseNamesFilter = (courseNames: string[]) => courseNames.map(course => {
    return {
      name: { eq: course }
    }
  })

  public fetchCoursesByName = async (courseNames: string[]) => {
    try {
      const response = await GraphQLService.fetchQuery<ListCoursesQuery>({
        query: listCourses,
        filter: {
          or: this.courseNamesFilter(courseNames)
        }
      })

      return response?.listCourses?.items
    } catch (error) {

    }
  }

  public fetchCoursesByIds = async (courseIds: string[]) => {
    try {
      const courses = await GraphQLService.graphQL<any>(
        graphqlOperation(listCourses, { id: courseIds })
      )
      return courses?.data?.listCourses.items || []
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        'Error when fetching courses by ids',
        error
      )
    }
  }

  public getEnrolledCourses = (groups: string[]) => {
    return groups?.filter(group => !Object.values(UserTypes).includes(group as UserTypes))
  }

  public searchCoursesByName = async (courseNames: string[]) => {
    try {
      const filterCourses = this.courseNamesFilter(courseNames)
      console.log(filterCourses)
      return GraphQLService.fetchQuery<SearchCoursesQuery>({
        query: searchCourses,
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
