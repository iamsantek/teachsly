import { useContext } from 'react'
import { UserDashboardContext } from '../contexts/UserDashboardContext'
import { isAdmin, isTeacher } from '../utils/CognitoGroupsUtils'

export const useUserGroups = () => {
  const { context: { user, courses: allCourses } } = useContext(UserDashboardContext)
  const hasAdminRole = isAdmin(user)
  const hasTeacherRole = isTeacher(user)
  const hasEditPermission = hasTeacherRole || hasAdminRole

  const groups = hasAdminRole ? allCourses : allCourses.filter(course => user?.groups.includes(course.externalId))

  return { groups, hasAdminRole, hasTeacherRole, hasEditPermission }
}
