import { Stack } from '@chakra-ui/react'
import { SectionHeader } from '../../components/Headers/SectionHeader'
import { CreateExamForm } from './CreateExamForm'

export const CreateExamScreen = () => {
  return (
        <Stack>
        <SectionHeader />
        <CreateExamForm />
        </Stack>
  )
}
