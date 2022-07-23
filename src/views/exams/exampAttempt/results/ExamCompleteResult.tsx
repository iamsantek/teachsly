import { Text, Box, Heading, HStack, Stack } from '@chakra-ui/react'
import { useContext } from 'react'
import { ExamAttempt } from '../../../../API'
import { useUserGroups } from '../../../../hooks/useUserGroups'
import { ExamAnswers, QuestionPool } from '../../../../interfaces/Exams'
import { translate } from '../../../../utils/LanguageUtils'
import { QuestionPoolResult } from './QuestionPoolResult'

interface Props {
  questionPools: QuestionPool[];
  studentAnswers: ExamAnswers | undefined;
  examAttempt: ExamAttempt;
}

export const ExamCompleteResult = ({ questionPools, studentAnswers, examAttempt }: Props) => {
  const { hasEditPermission } = useUserGroups()
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
            {hasEditPermission && <Text>{translate('REALIZED_BY')} {examAttempt.userName}</Text>}
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
    </Stack>
  )
}
