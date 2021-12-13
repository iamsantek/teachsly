import { LogLevel, LogTypes } from "../enums/LogTypes";
import { User } from "../platform-models/User";
import Logger from "../utils/Logger";
import AuthService from "./AuthService";
import { UserTypes } from "../enums/UserTypes";
import StudentService from "./StudentService";
import TeacherService from "./TeacherService";

class UserService {
  public generateUser(authData: any): User | null {
    if (!authData?.attributes) {
      return null;
    }

    const { attributes } = authData;
    const { name, email, username } = attributes;

    return new User({
      id: username,
      email,
      name,
      courses: [],
      type: attributes["custom:type"],
    });
  }

  public async createUser(user: User) {
    try {
      const cognitoUser = await AuthService.createCognitoUser(user);

      if (!cognitoUser) {
        return;
      }

      Logger.log(
        LogLevel.INFO,
        LogTypes.UserService,
        "User successfully created"
      );

      return await this.assignCoursesToUser(user);
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.UserService,
        "Error signing up",
        error
      );
    }
  }

  public assignCoursesToUser = async (user: User) => {
    //TODO: Refactor
    if (!user) {
      return;
    }

    if (user.type === UserTypes.STUDENT) {
      const student = await StudentService.createStudent(user.name, user.id);
      if (student) {
        await StudentService.createCourseStudent(student, user.courses);
        return student;
      }
    } else if (user.type === UserTypes.TEACHER) {
      const teacher = await TeacherService.createTeacher(user.name, user.id);
      if (teacher) {
        await TeacherService.createCourseTeacher(teacher, user.courses);
        return teacher;
      }
    }
  };
}

export default new UserService();
