import { Groups } from "../enums/Groups";

export class User {
  email: string;
  groups: Groups[];

  constructor(email: string, groups: Groups[]) {
    this.email = email;
    this.groups = groups;
  }
}
