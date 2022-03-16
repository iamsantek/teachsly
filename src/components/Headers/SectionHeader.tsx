import { FC, useContext } from 'react'
import { Center, Heading, Skeleton, Stack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { CustomRouteObject } from '../../interfaces/Routes'

export const SectionHeader: FC = ({ children }) => {
  const { routes, courses } = useContext(UserDashboardContext)
  const params = useParams()
  const route = routes?.find(
    (route) => route.path === location.pathname
  ) as CustomRouteObject | undefined

  const detailViewName = courses.find(course => course.externalId === params?.id)

  return (
    <Skeleton isLoaded={routes.length !== 0}>
    <Stack direction={['column', 'row']} spacing={3} marginBottom={4} >
      <Center gap={4}>
        <Heading textStyle={'title'} marginRight={3} as="h4">
          {route?.name} {detailViewName?.name}
        </Heading>
        {children}
      </Center>
    </Stack>
    </Skeleton>
  )
}
