import { UserTypes } from "../enums/UserTypes";

export class User {
  id: string;
  email: string;
  name: string;
  courses: string[];
  type: UserTypes;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.courses = user.courses;
    this.type = user.type;
  }
}
