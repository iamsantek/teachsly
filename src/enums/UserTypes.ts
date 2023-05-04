/* eslint-disable no-unused-vars */
export enum UserTypes {
  ADMIN = "Admin",
  TEACHER = "Teachers",
  STUDENT = "Students",
  BOOKLET_STUDENT = "BookletStudents",
}

export const UserTypesWording = {
  [UserTypes.ADMIN]: "Admin",
  [UserTypes.TEACHER]: "Teacher",
  [UserTypes.STUDENT]: "Student",
  [UserTypes.BOOKLET_STUDENT]: "Booklet Student",
};
