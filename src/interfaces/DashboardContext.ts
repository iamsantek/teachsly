import { Course, User } from "../API";
import { ApplicationRoute } from "./Routes";

export interface UserContext {
  user: User | null;
  routes: ApplicationRoute[];
  courses: Course[];
  externalUserId: string | null;
}

export interface ApplicationContext {
  context: UserContext;
  setApplicationContext: (context: UserContext) => void;
}
