import { useContext } from 'react'
import { UserDashboardContext } from '../contexts/UserDashboardContext'
import { isAdmin } from '../utils/CognitoGroupsUtils'

export const useUserGroups = () => {
  const { context: { user, courses: allCourses } } = useContext(UserDashboardContext)
  const hasRoleAdmin = isAdmin(user)

  const groups = hasRoleAdmin ? allCourses : allCourses.filter(course => user?.groups.includes(course.externalId))

  return { groups }
}
