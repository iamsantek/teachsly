import { UserTypes } from "../enums/UserTypes";

export class User {
  id: string;
  email: string;
  name: string;
  groups: string[];
  type: UserTypes;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.groups = user.groups;
    this.type = user.type;
  }
}
