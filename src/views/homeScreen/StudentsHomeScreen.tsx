import { Stack } from '@chakra-ui/react'
import { useContext } from 'react'
import { DisabledAccountWarning } from '../../components/Alert/DisabledAccountWarning'
import { SectionHeader } from '../../components/Headers/SectionHeader'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { StudentsCourseList } from '../courses/StudentsCourseList'

export const StudentsHomeScreen = () => {
  const { user } = useContext(UserDashboardContext)
  return (
        <Stack>
            {user?.isDisabledUser && <DisabledAccountWarning />}
            <SectionHeader />
            <StudentsCourseList />
        </Stack>
  )
}
