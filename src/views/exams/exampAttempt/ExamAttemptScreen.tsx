import { Stack } from '@chakra-ui/react'
import { SectionHeader } from '../../../components/Headers/SectionHeader'
import { ExamAttemptList } from './ExamAttemptList'

export const ExamAttemptScreen = () => {
  return (
        <Stack>
        <SectionHeader />
        <ExamAttemptList />
        </Stack>
  )
}
