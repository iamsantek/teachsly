import { ApplicationContext, UserContext } from '../interfaces/DashboardContext'

export const defaultUserContext: UserContext = {
  user: null,
  routes: [],
  courses: [],
  externalUserId: null
}

export const defaultContext: ApplicationContext = {
  context: defaultUserContext,
  setApplicationContext: () => {}
}
