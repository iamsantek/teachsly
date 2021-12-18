import { graphqlOperation } from "aws-amplify";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { createCourseStudents, createStudent } from "../graphql/mutations";
import { listStudents } from "../graphql/queries";
import { Student } from "../models";
import Logger from "../utils/Logger";
import GraphQLService from "./GraphQLService";

class StudentService {
  public fetchStudents = async () => {
    try {
      const models = await GraphQLService.graphQL<any>(
        graphqlOperation(listStudents)
      );
      return (models?.data?.listStudents.items as Student[]) || [];
    } catch (e) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching courses",
        e
      );
    }
  };

  public createStudent = async (name: string, userId: string) => {
    const student = new Student({
      name,
      userId,
    });

    const result = await GraphQLService.graphQL<any>(
      graphqlOperation(createStudent, { input: student })
    );

    return result?.data?.createStudent as Student;
  };

  public createCourseStudent = async (
    student: Student,
    courseIds: string[]
  ) => {
    let courseStudents;

    courseStudents = courseIds.map((courseId: string) => {
      const courseStudent = {
        courseID: courseId,
        studentID: student.id,
      };

      return GraphQLService.graphQL<any>(
        graphqlOperation(createCourseStudents, { input: courseStudent })
      );
    });

    const courseStudentsResult = await Promise.all(courseStudents);

    return courseStudentsResult;
  };
}

export default new StudentService();
