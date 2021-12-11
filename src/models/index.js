// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const MediaType = {
  LINK: "LINK",
  PDF: "PDF",
  VIDEO: "VIDEO",
};

const { Course, Student, Teacher, Media, CourseStudents, CoursesTeachers } =
  initSchema(schema);

export {
  Course,
  Student,
  Teacher,
  Media,
  CourseStudents,
  CoursesTeachers,
  MediaType,
};
