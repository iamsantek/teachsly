import { User } from "../models/User";

export interface DashboardContext {
  user: User | null;
}
