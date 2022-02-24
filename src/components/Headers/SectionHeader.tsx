import { FC, useContext } from 'react';
import { Heading, Stack } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { CustomRouteObject } from '../../interfaces/Routes'

export const SectionHeader: FC = ({ children }) => {
  const { routes } = useContext(UserDashboardContext)
  const location = useLocation()
  const { name: sectionName } = routes.find(
    (route) => route.path === location.pathname
  ) as CustomRouteObject

  return (
    <Stack direction={['column', 'row']} spacing={3}>
      <Heading textStyle={'title'} marginY={4} marginRight={3} as="h4">
        {sectionName}
      </Heading>
      {children}
    </Stack>
  )
}
