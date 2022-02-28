import { Stack, Text } from '@chakra-ui/react'
import { useContext } from 'react'
import { DisabledAccountWarning } from '../../components/Alert/DisabledAccountWarning'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'

export const StudentsHomeScreen = () => {
  const { user } = useContext(UserDashboardContext)
  return (
        <Stack>
            {user?.isDisabledUser && <DisabledAccountWarning />}
            <Text>Student Home Screen</Text>
        </Stack>
  )
}
