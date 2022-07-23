import { Stack, Text } from '@chakra-ui/react'
import { ExamKeys, QuestionPool } from '../../../../interfaces/Exams'
import { translate } from '../../../../utils/LanguageUtils'
import { generateRandomId } from '../../../../utils/StringUtils'
import { ExamResultAttachments } from './ExamResultAttachments'
import { QuestionResult } from './QuestionResult'

interface Props {
  questionPool: QuestionPool;
  questionPoolIndex: number;
  studentAnswers: ExamKeys | undefined
}

export const QuestionPoolResult = ({ questionPool, questionPoolIndex, studentAnswers }: Props) => {
  return (
    <>
      <Text>{translate('EXERCISE')} #{questionPoolIndex + 1}</Text>
      <Text fontWeight='bold'>{questionPool.exerciseExplanation}</Text>
      <Text>{questionPool.exerciseDescription}</Text>

      <ExamResultAttachments attachments={questionPool.attachments} />

      <Stack spacing={7} marginTop={7}>
        {questionPool.questions.map((question, questionIndex) => {
          const id = generateRandomId()
          return <QuestionResult
            questionIndex={questionIndex}
            question={question}
            key={id}
            studentAnswers={studentAnswers && studentAnswers[questionIndex]}
          />
        })}
      </Stack>
    </>
  )
}
