import { UserTypes } from "../enums/UserTypes";
import { User } from "../platform-models/User";

export const defaultCreateStudentModal: User = new User({
  id: "",
  name: "",
  email: "",
  groups: [],
  type: UserTypes.STUDENT,
});
