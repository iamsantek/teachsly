import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export enum MediaType {
  LINK = "LINK",
  PDF = "PDF",
  VIDEO = "VIDEO",
}

type CourseMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type StudentMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type TeacherMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type MediaMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type CourseStudentsMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type CoursesTeachersMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

export declare class Course {
  readonly id: string;
  readonly name: string;
  readonly teacher: string;
  readonly scheduleDate: string;
  readonly scheduleStartTime: string;
  readonly scheduleEndTime: string;
  readonly students?: (CourseStudents | null)[];
  readonly teachers?: (CoursesTeachers | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Course, CourseMetaData>);
  static copyOf(
    source: Course,
    mutator: (
      draft: MutableModel<Course, CourseMetaData>
    ) => MutableModel<Course, CourseMetaData> | void
  ): Course;
}

export declare class Student {
  readonly id: string;
  readonly name: string;
  readonly courses?: (CourseStudents | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Student, StudentMetaData>);
  static copyOf(
    source: Student,
    mutator: (
      draft: MutableModel<Student, StudentMetaData>
    ) => MutableModel<Student, StudentMetaData> | void
  ): Student;
}

export declare class Teacher {
  readonly id: string;
  readonly name: string;
  readonly userId: string;
  readonly students?: (CoursesTeachers | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Teacher, TeacherMetaData>);
  static copyOf(
    source: Teacher,
    mutator: (
      draft: MutableModel<Teacher, TeacherMetaData>
    ) => MutableModel<Teacher, TeacherMetaData> | void
  ): Teacher;
}

export declare class Media {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly link: string;
  readonly groups?: (string | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Media, MediaMetaData>);
  static copyOf(
    source: Media,
    mutator: (
      draft: MutableModel<Media, MediaMetaData>
    ) => MutableModel<Media, MediaMetaData> | void
  ): Media;
}

export declare class CourseStudents {
  readonly id: string;
  readonly courseID: string;
  readonly studentID: string;
  readonly course: Course;
  readonly student: Student;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CourseStudents, CourseStudentsMetaData>);
  static copyOf(
    source: CourseStudents,
    mutator: (
      draft: MutableModel<CourseStudents, CourseStudentsMetaData>
    ) => MutableModel<CourseStudents, CourseStudentsMetaData> | void
  ): CourseStudents;
}

export declare class CoursesTeachers {
  readonly id: string;
  readonly courseID: string;
  readonly teacherID: string;
  readonly course: Course;
  readonly teacher: Teacher;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<CoursesTeachers, CoursesTeachersMetaData>);
  static copyOf(
    source: CoursesTeachers,
    mutator: (
      draft: MutableModel<CoursesTeachers, CoursesTeachersMetaData>
    ) => MutableModel<CoursesTeachers, CoursesTeachersMetaData> | void
  ): CoursesTeachers;
}
