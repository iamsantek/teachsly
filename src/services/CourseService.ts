import { LogLevel, LogTypes } from "../enums/LogTypes";
import { listCourses } from "../graphql/queries";
import { createCourse, updateCourse } from "../graphql/mutations";
import DateTimeUtils, { TimeFormats } from "../utils/DateTimeUtils";
import Logger from "../utils/Logger";
import GraphQLService from "./GraphQLService";
import CognitoService from "./aws/CognitoService";
import { removeNotAllowedPropertiesFromModel } from "../utils/GraphQLUtils";
import {
  Course as CourseAPI,
  CreateCourseInput,
  CreateCourseMutation,
  ListCoursesQuery,
  UpdateCourseMutation,
} from "../API";
import { UserTypes } from "../enums/UserTypes";
import { generateExternalId } from "../utils/CourseUtils";

interface FetchCourseParams {
  nextToken?: string | null;
  limit?: number | null;
  filterDisabledCourses?: boolean;
}

class CourseService {
  public fetchCourses = async ({
    nextToken = null,
    limit = undefined,
    filterDisabledCourses = true,
  }: FetchCourseParams) => {
    return GraphQLService.fetchQuery<ListCoursesQuery>({
      query: listCourses,
      filter: filterDisabledCourses
        ? {
            isActive: {
              eq: "true",
            },
          }
        : {},
      nextToken,
      limit,
    });
  };

  deleteCourse = async () => {
    // TODO: Implement delete course logic
  };

  public createZoomMeeting = async ({
    meetingName,
    startHour,
    weeklyDays,
  }: {
    meetingName: string;
    startHour: string;
    weeklyDays: number[];
  }): Promise<string | undefined> => {
    try {
      const zoomMeeting = await fetch(
        process.env.REACT_APP_ZOOM_API_ENDPOINT as string,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            meetingName,
            startHour,
            weeklyDays,
          }),
        }
      );

      const zoomMeetingResponse = await zoomMeeting.json();
      return zoomMeetingResponse?.id;
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when creating Zoom Meeting",
        error
      );
    }
  };

  public createCourse = async (courseCreation: CreateCourseInput) => {
    const scheduleStartTime = DateTimeUtils.formateHour(
      courseCreation.scheduleStartTime,
      TimeFormats.AWSTime
    );
    const scheduleEndTime = DateTimeUtils.formateHour(
      courseCreation.scheduleEndTime,
      TimeFormats.AWSTime
    );
    const scheduleDates = Array.from(
      courseCreation.scheduleDates?.values() ?? []
    );
    const groupExternalId = generateExternalId(courseCreation);

    if (!process.env.REACT_APP_ZOOM_API_ENDPOINT) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when creating Zoom Meeting",
        "Missing Zoom API Endpoint"
      );
    }

    let zoomMeetingId: string | undefined = "";
    if (courseCreation.isVirtual) {
      zoomMeetingId = await this.createZoomMeeting({
        meetingName: groupExternalId,
        startHour: scheduleStartTime,
        weeklyDays: scheduleDates as number[],
      });
    }

    const course: CreateCourseInput = {
      name: courseCreation.name,
      scheduleDates: scheduleDates,
      scheduleStartTime: !!scheduleStartTime ? scheduleStartTime : null,
      scheduleEndTime: !!scheduleEndTime ? scheduleEndTime : null,
      virtualClassLink: courseCreation.virtualClassLink as string,
      externalId: groupExternalId,
      scheduleYear: Number(courseCreation.scheduleYear),
      zoomMeetingId: zoomMeetingId ? zoomMeetingId : null,
      isVirtual: !!zoomMeetingId,
    };

    const createCognitoGroupResponse = await CognitoService.createCognitoGroup(
      groupExternalId
    );

    if (createCognitoGroupResponse?.Group) {
      return GraphQLService.fetchQuery<CreateCourseMutation>({
        query: createCourse,
        input: course,
      });
    }

    Logger.log(
      LogLevel.ERROR,
      LogTypes.CourseService,
      "Error when creating Course"
    );
  };

  public updateCourse = async (
    course: CourseAPI,
    updateZoomMeeting?: boolean
  ) => {
    try {
      if (updateZoomMeeting) {
        const scheduleStartTime = DateTimeUtils.formateHour(
          course.scheduleStartTime,
          TimeFormats.AWSTime
        );
        const scheduleDates = Array.from(course.scheduleDates?.values() ?? []);

        const zoomMeetingId = await this.createZoomMeeting({
          meetingName: course.externalId,
          startHour: scheduleStartTime,
          weeklyDays: scheduleDates as number[],
        });

        const models = await GraphQLService.fetchQuery<UpdateCourseMutation>({
          query: updateCourse,
          input: removeNotAllowedPropertiesFromModel({
            ...course,
            zoomMeetingId,
            isVirtual: true
          }),
        });

        return (models?.updateCourse as CourseAPI) || [];
      }

      const models = await GraphQLService.fetchQuery<UpdateCourseMutation>({
        query: updateCourse,
        input: removeNotAllowedPropertiesFromModel({
          ...course,
          isVirtual: false,
          zoomMeetingId: null
        }),
      });

      return (models?.updateCourse as CourseAPI) || [];
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when updating Media",
        error
      );
    }
  };

  private courseNamesFilter = (courseNames: string[]) =>
    courseNames.map((course) => {
      return {
        externalId: { eq: course },
      };
    });

  public getEnrolledCourses = (groups: string[]) => {
    return groups?.filter(
      (group) => !Object.values(UserTypes).includes(group as UserTypes)
    );
  };

  public searchCourses = async (courseNames: string[]) => {
    try {
      const filterCourses = this.courseNamesFilter(courseNames);
      return GraphQLService.fetchQuery<ListCoursesQuery>({
        query: listCourses,
        filter: {
          or: filterCourses,
        },
      });
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when searching courses",
        error
      );
    }
  };

  public fetchCourseByExternalId = async (externalId: string | undefined) => {
    if (!externalId) {
      return;
    }

    try {
      const courses = await GraphQLService.fetchQuery<ListCoursesQuery>({
        query: listCourses,
        filter: {
          externalId: {
            eq: externalId,
          },
        },
      });

      return courses?.listCourses?.items?.[0];
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching course by externalId",
        error
      );
    }
  };
}

export default new CourseService();
