import { Stack, Text } from '@chakra-ui/react'
import { ExamAttempt } from '../../../API'
import { QuestionPool } from '../../../interfaces/Exams'
import { calculateNumberOfCorrectAnswers } from '../../../utils/ExamUtils'

interface Props {
  questionPools: QuestionPool[];
  attempt: ExamAttempt;
}

export const ExamAttemptCounters = ({ questionPools, attempt }: Props) => {
  const { totalPendingQuestions, totalQuestions, correctAnswers } = calculateNumberOfCorrectAnswers(questionPools, attempt)

  const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(2)

  return (
    <Stack>
      <Text>Numero de respuestas correctas: {correctAnswers}</Text>
      <Text>Numero de preguntas sin corregir: {totalPendingQuestions}</Text>
      <Text>Numero total de preguntas: {totalQuestions}</Text>
      <Text>% de preguntas correctas: {percentage}%</Text>

    </Stack>
  )
}
