import { useContext } from 'react'
import { UserDashboardContext } from '../contexts/UserDashboardContext'
import { UserTypes } from '../enums/UserTypes'
import { isAdmin, isStudent, isTeacher } from '../utils/CognitoGroupsUtils'

export const useUserGroups = () => {
  const { context: { user, courses: allCourses } } = useContext(UserDashboardContext)
  const hasStudentRole = isStudent(user)
  const hasAdminRole = isAdmin(user)
  const hasTeacherRole = isTeacher(user)
  const hasEditPermission = hasTeacherRole || hasAdminRole
  const userType = hasAdminRole ? UserTypes.ADMIN : hasTeacherRole ? UserTypes.TEACHER : UserTypes.STUDENT

  const groups = hasAdminRole ? allCourses : allCourses.filter(course => user?.groups.includes(course.externalId))

  return { groups, hasAdminRole, hasTeacherRole, hasEditPermission, userType, hasStudentRole }
}
