import { CourseStudents, Student } from "../models";
import CourseService from "./CourseService";
import DataStoreService from "./DataStoreService";

class StudentService {
  public createStudent = async (name: string, userId: string) => {
    return await DataStoreService.saveModelItem(
      new Student({
        userId,
        name,
      })
    );
  };

  public createCourseStudent = async (
    student: Student,
    courseIds: string[]
  ) => {
    const courses = await CourseService.fetchCoursesByIds(courseIds);

    if (!courses) {
      return;
    }

    courses.forEach(async (course) => {
      return await DataStoreService.saveModelItem(
        new CourseStudents({
          student: student,
          course: course,
          courseID: course.id,
          studentID: student.id,
        })
      );
    });
  };
}

export default new StudentService();
