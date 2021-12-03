import { DataStore } from "@aws-amplify/datastore";
import { Course } from "../models";

class CourseService {
  fetchCourses = async () => {
    const models = await DataStore.query(Course);
    return models;
  };

  deleteCourse = async () => {};
}

export default new CourseService();
