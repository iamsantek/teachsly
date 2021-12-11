import { DataStore } from "@aws-amplify/datastore";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { Course } from "../models";
import Logger from "../utils/Logger";

class CourseService {
  fetchCourses = async () => {
    try {
      const models = await DataStore.query(Course);
      return models;
    } catch (e) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching courses",
        console.error()
      );
    }
  };

  deleteCourse = async () => {};
}

export default new CourseService();
