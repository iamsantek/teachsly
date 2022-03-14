import { Stack } from '@chakra-ui/react'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGroupRoutes } from '../../utils/RouteUtils'
import { MediaContentsList } from './MediaContentsList'

interface Props {}

export const MediaContentsScreen: FC<Props> = () => {
  const { isAllowedRoute } = useGroupRoutes()
  const navigate = useNavigate()

  if (!isAllowedRoute) {
    navigate('/')
    return null
  }

  return (
    <Stack spacing={4}>
      <MediaContentsList />
    </Stack>
  )
}
