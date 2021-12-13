import { DataStore } from "@aws-amplify/datastore";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { Course } from "../models";
import { Course as PlatformCourse } from "../platform-models/Course";
import DateTimeUtils from "../utils/DateTimeUtils";
import Logger from "../utils/Logger";
import DataStoreService from "./DataStoreService";

class CourseService {
  public fetchCourses = async () => {
    try {
      const models = await DataStore.query(Course);
      return models;
    } catch (e) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching courses",
        e
      );
    }
  };

  deleteCourse = async () => {};

  public createCourse = async (courseCreation: PlatformCourse) => {
    const scheduleStartTime = DateTimeUtils.formateHour(
      courseCreation.scheduleStartTime
    );
    const scheduleEndTime = DateTimeUtils.formateHour(
      courseCreation.scheduleEndTime
    );
    const scheduleDates = Array.from(courseCreation.scheduleDates.values());

    const course = new Course({
      name: courseCreation.name,
      scheduleDates,
      scheduleStartTime,
      scheduleEndTime,
      isVirtual: courseCreation.isVirtual,
    });

    return await DataStoreService.saveModelItem(course);
  };

  public fetchCoursesByIds = async (courseIds: string[]) => {
    try {
      return await DataStore.query(Course, (c) =>
        c.or((c) => courseIds.reduce((c, id) => c.id("eq", id), c))
      );
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
