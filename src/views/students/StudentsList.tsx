import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserTypes } from '../../enums/UserTypes'
import { useGroupRoutes } from '../../utils/RouteUtils'
import UserList from '../UserList'

export const StudentsList = () => {
  const { isAllowedRoute } = useGroupRoutes()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAllowedRoute) {
      navigate('/')
    }
  }, [isAllowedRoute, navigate])

  if (!isAllowedRoute) {
    return null
  }

  return (
        <>
            <UserList listType={UserTypes.STUDENT} />
        </>
  )
}
