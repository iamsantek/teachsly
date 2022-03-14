import { FC, useContext } from 'react'
import { Heading, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { CustomRouteObject } from '../../interfaces/Routes'
import { splitCamelCase } from '../../utils/StringUtils'

export const SectionHeader: FC = ({ children }) => {
  const { routes } = useContext(UserDashboardContext)
  const params = useParams()
  const route = routes?.find(
    (route) => route.path === location.pathname
  ) as CustomRouteObject | undefined

  return (
    <Stack direction={['column', 'row']} spacing={3}>
      <Heading textStyle={'title'} marginBottom={4} marginRight={3} as="h4">
        {route?.name || splitCamelCase(params?.id)}
      </Heading>
      {children}
    </Stack>
  )
}
