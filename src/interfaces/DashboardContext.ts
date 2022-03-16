import { Course } from '../API'
import { User } from '../platform-models/User'
import { ApplicationRoute } from './Routes'

export interface DashboardContext {
  user: User | null;
  routes: ApplicationRoute[];
  courses: Course[],
  externalUserId: string | null
}
