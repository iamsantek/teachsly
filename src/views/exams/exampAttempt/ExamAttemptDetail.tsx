import { Stack, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Exam, ExamAttempt } from '../../../API'
import { SectionHeader } from '../../../components/Headers/SectionHeader'
import ExamService from '../../../services/ExamService'

export const ExamAttemptDetail = () => {
  const [examAttempt, setExamAttempt] = useState<ExamAttempt>()
  const [exam, setExam] = useState<Exam>()
  const { attemptId } = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const fetchExamInformation = useCallback(async () => {
    const examAttemptResponse = await ExamService.fetchExamAttemptsByAId(attemptId as string)
    const examResponse = await ExamService.getExamById(examAttemptResponse?.getExamAttempt?.examId as string)

    setExam(examResponse?.getExam as Exam)
    setExamAttempt(examAttemptResponse?.getExamAttempt as ExamAttempt)
    setIsLoading(false)
  }, [attemptId])

  useEffect(() => {
    fetchExamInformation()
  }
  , [fetchExamInformation])

  if (isLoading) {
    return null
  }

  console.log({ examAttempt })
  console.log({ exam })

  return (
        <Stack>
        <SectionHeader sectionName='Exam Attempt' />
        <Text>{attemptId}</Text>
        </Stack>
  )
}
