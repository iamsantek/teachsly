import { StringLiteralLike } from "typescript";
import { Groups } from "../enums/Groups";

export class User {
  email: string;
  name: string;
  groups: Groups[];

  constructor(email: string, name: string, groups: Groups[]) {
    this.email = email;
    this.name = name;
    this.groups = groups;
  }
}
