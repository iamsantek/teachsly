import { Box, Heading, HStack, Stack, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExamAttempt } from '../../../../API'
import { ContentLinePlaceholder } from '../../../../components/Placeholders/ContentLinePlaceholder'
import { NoContentPlaceholder } from '../../../../components/Placeholders/NoContentPlaceholder'
import { Placeholder } from '../../../../components/Placeholders/Placeholder'
import { ExamAnswers, QuestionPool } from '../../../../interfaces/Exams'
import ExamService from '../../../../services/ExamService'
import { translate } from '../../../../utils/LanguageUtils'
import { StudentExamResultDetail } from './StudentExamResultDetail'

export const StudentExamResultScreen = () => {
  const [examAttempt, setExamAttempt] = useState<ExamAttempt>()
  const [isLoading, setIsLoading] = useState(true)
  const { attemptId } = useParams()

  const fetchExamAttempt = useCallback(async () => {
    const examAttempt = await ExamService.fetchExamAttemptsByAId(attemptId as string)

    setExamAttempt(examAttempt?.getExamAttempt as ExamAttempt)
    setIsLoading(false)
  }, [attemptId])

  useEffect(() => {
    fetchExamAttempt()
  }, [fetchExamAttempt])

  if (isLoading) {
    return (
      <Placeholder
      show={isLoading}
      number={10}
      placeholderElement={<ContentLinePlaceholder />}
    />
    )
  }

  if (!attemptId || !examAttempt) {
    return <NoContentPlaceholder show />
  }

  let questionPools: QuestionPool[] = []
  let studentAnswers: ExamAnswers | undefined

  try {
    questionPools = JSON.parse(examAttempt?.keys as string)
    studentAnswers = JSON.parse(examAttempt?.results as string)
  } catch {
    questionPools = []
  }

  return (
    <Stack marginBottom={10} marginTop={5}>
      <Box rounded='lg' boxShadow='md' p={7}>
        <HStack spacing={5}>
          <Stack justifyContent='center' alignItems='center'>
            <Text fontWeight='bold' fontSize={'5xl'}>{examAttempt?.score}</Text>
            <Text color='gray.700'>{translate('FINAL_MARK')}</Text>
          </Stack>
          <Box>
            <Heading fontSize={'2xl'}>{examAttempt?.examName}</Heading>
            <Text>{translate('CORRECTED_BY')} {examAttempt?.correctedBy}</Text>
            <Text>{translate('CORRECT_ANSWERS')} {examAttempt?.correctAnswers} / {examAttempt?.totalQuestions}</Text>
            {examAttempt?.teacherComments && (
              <Box marginY={5}>
                <Text>{translate('EXAM_TEACHER_COMMENTS')}</Text>
                <Text>{examAttempt?.teacherComments}</Text>
              </Box>
            )}
          </Box>
        </HStack>
      </Box>
      <StudentExamResultDetail
        questionPools={questionPools}
        studentAnswers={studentAnswers}
      />
    </Stack>
  )
}
