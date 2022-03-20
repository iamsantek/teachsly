import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserDashboardContext } from '../contexts/UserDashboardContext'

export function useGroupRoutes () {
  const { context: { user } } = useContext(UserDashboardContext)
  const groups = user?.groups
  const { id: courseId } = useParams()

  return {
    isAllowedRoute: courseId ? !!groups?.includes(courseId as string) : true
  }
}
