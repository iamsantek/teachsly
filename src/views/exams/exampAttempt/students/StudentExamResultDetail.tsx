import { Box, Stack } from '@chakra-ui/react'
import { ExamAnswers, QuestionPool } from '../../../../interfaces/Exams'
import { QuestionPoolResult } from './QuestionPoolResult'

interface Props {
  questionPools: QuestionPool[];
  studentAnswers: ExamAnswers | undefined;
}

export const StudentExamResultDetail = ({ questionPools, studentAnswers }: Props) => {
  return (
    <Stack spacing={10}>
      {questionPools.map((questionPool, questionPoolIndex) => {
        return (
          <Box key={questionPool.id} rounded='lg' boxShadow='md' p={7}>
            <QuestionPoolResult
              questionPool={questionPool}
              questionPoolIndex={questionPoolIndex}
              studentAnswers={studentAnswers && studentAnswers.answers[questionPoolIndex]}
            />
          </Box>
        )
      })}
    </Stack>
  )
}
