import { User } from "../platform-models/User";

export interface DashboardContext {
  user: User | null;
}
