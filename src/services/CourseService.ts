import { graphqlOperation } from "aws-amplify";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { listCourses } from "../graphql/queries";
import { createCourse, updateCourse } from "../graphql/mutations";
import { Course } from "../models";
import { Course as PlatformCourse } from "../platform-models/Course";
import DateTimeUtils, { TimeFormats } from "../utils/DateTimeUtils";
import Logger from "../utils/Logger";
import GraphQLService, { GraphQLResultWithNextToken } from "./GraphQLService";
import CognitoService from "./aws/CognitoService";
import { formatCognitoGroupDescription } from "../utils/CognitoGroupsUtils";
import { removeNotAllowedPropertiesFromModel } from "../utils/GraphQLUtils";
import { GRAPHQL_MAX_PAGE_RESULTS } from "../constants/GraphQL";

class CourseService {
  public fetchCourses = async (
    nextToken?: string,
    limit = GRAPHQL_MAX_PAGE_RESULTS
  ): Promise<GraphQLResultWithNextToken<Course> | undefined> => {
    return GraphQLService.fetchQuery({
      query: listCourses,
      nextToken,
      limit
    });
  };

  deleteCourse = async () => {
    //TODO: Implement delete course logic
  };

  public createCourse = async (courseCreation: PlatformCourse) => {
    const scheduleStartTime = DateTimeUtils.formateHour(
      courseCreation.scheduleStartTime,
      TimeFormats.AWSTime
    );
    const scheduleEndTime = DateTimeUtils.formateHour(
      courseCreation.scheduleEndTime,
      TimeFormats.AWSTime
    );
    const scheduleDates = Array.from(courseCreation.scheduleDates.values());

    const course = new Course({
      name: courseCreation.name,
      scheduleDates,
      scheduleStartTime,
      scheduleEndTime,
      virtualClassLink: courseCreation.virtualClassLink,
    });

    const cognitoGroupDescription = formatCognitoGroupDescription(
      scheduleDates,
      courseCreation.scheduleStartTime,
      courseCreation.scheduleEndTime
    );

    const createCognitoGroupResponse = await CognitoService.createCognitoGroup(
      courseCreation.name,
      cognitoGroupDescription
    );

    if (createCognitoGroupResponse?.Group) {
      return await GraphQLService.graphQL(
        graphqlOperation(createCourse, { input: course })
      );
    }

    Logger.log(
      LogLevel.ERROR,
      LogTypes.CourseService,
      "Error when creating Course"
    );
  };

  public updateCourse = async (course: Course) => {
    try {
      const models = await GraphQLService.graphQL<any>(
        graphqlOperation(updateCourse, {
          input: removeNotAllowedPropertiesFromModel(course),
        })
      );

      return (models?.data?.updateCourse as Course) || [];
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when updating Media",
        error
      );
    }

    return GraphQLService.fetchQuery({
      query: updateCourse,
    })
  };

  public fetchCoursesByIds = async (courseIds: string[]) => {
    try {
      const courses = await GraphQLService.graphQL<any>(
        graphqlOperation(listCourses, { id: courseIds })
      );
      return courses?.data?.listCourses.items || [];
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching courses by ids",
        error
      );
    }
  };
}

export default new CourseService();
