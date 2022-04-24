import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserDashboardContext } from '../contexts/UserDashboardContext'
import { UserTypes } from '../enums/UserTypes'

export function useGroupRoutes () {
  const { context: { user } } = useContext(UserDashboardContext)
  const { id: courseId } = useParams()
  const groups = user?.groups

  if (groups?.includes(UserTypes.ADMIN)) {
    return {
      isAllowedRoute: true
    }
  }

  return {
    isAllowedRoute: courseId ? !!groups?.includes(courseId as string) : true
  }
}

export const generateMediaByCourseRoute = (externalId: string) => `/medias/${externalId.replace(/\s/g, '')}`

export const generateStudentsByCourseRoute = (externalId: string) => `/courses/${externalId.replace(/\s/g, '')}/students`
