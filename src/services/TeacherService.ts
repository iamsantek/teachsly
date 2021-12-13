import { CoursesTeachers } from "../models";
import { Teacher } from "../models";
import CourseService from "./CourseService";
import DataStoreService from "./DataStoreService";

class TeacherService {
  public async createTeacher(name: string, userId: string) {
    return await DataStoreService.saveModelItem(
      new Teacher({
        userId,
        name,
      })
    );
  }

  public createCourseTeacher = async (
    teacher: Teacher,
    courseIds: string[]
  ) => {
    const courses = await CourseService.fetchCoursesByIds(courseIds);

    if (!courses) {
      return;
    }

    courses.forEach(async (course) => {
      return await DataStoreService.saveModelItem(
        new CoursesTeachers({
          teacher: teacher,
          course: course,
          courseID: course.id,
          teacherID: teacher.id,
        })
      );
    });
  };
}

export default new TeacherService();
