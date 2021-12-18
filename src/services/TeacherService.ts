import { graphqlOperation } from "aws-amplify";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { createCoursesTeachers, createTeacher } from "../graphql/mutations";
import { listTeachers } from "../graphql/queries";
import { Teacher } from "../models";
import Logger from "../utils/Logger";
import GraphQLService from "./GraphQLService";

class TeacherService {
  public fetchTeachers = async () => {
    try {
      const models = await GraphQLService.graphQL<any>(
        graphqlOperation(listTeachers)
      );
      return (models?.data?.listTeachers.items as Teacher[]) || [];
    } catch (e) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching teachers",
        e
      );
    }
  };

  public createTeacher = async (name: string, userId: string) => {
    const teacher = new Teacher({
      name,
      userId,
    });

    const result = await GraphQLService.graphQL<any>(
      graphqlOperation(createTeacher, { input: teacher })
    );

    return result?.data?.createStudent as Teacher;
  };

  public createCourseTeacher = async (
    teacher: Teacher,
    courseIds: string[]
  ) => {
    let courseTeachers;

    courseTeachers = courseIds.map((courseId: string) => {
      const courseTeacher = {
        courseID: courseId,
        teacherID: teacher.id,
      };

      return GraphQLService.graphQL<any>(
        graphqlOperation(createCoursesTeachers, { input: courseTeacher })
      );
    });

    const courseStudentsResult = await Promise.all(courseTeachers);

    return courseStudentsResult;
  };
}

export default new TeacherService();
