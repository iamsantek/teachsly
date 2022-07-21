import { Stack, Text } from '@chakra-ui/react'
import { ExamAttempt } from '../../../API'
import { QuestionPool } from '../../../interfaces/Exams'
import { sumNumberOfCorrectAnswers } from '../../../utils/ExamUtils'
import { translate } from '../../../utils/LanguageUtils'

interface Props {
  questionPools: QuestionPool[];
  attempt: ExamAttempt;
}

export const ExamAttemptCounters = ({ questionPools, attempt }: Props) => {
  const { correctAnswers, totalQuestions } = sumNumberOfCorrectAnswers(questionPools, attempt as ExamAttempt)
  return (
    <Stack>
      <Text>{translate('NUMBER_OF_CORRECT_ANSWERS')} {correctAnswers}/{totalQuestions}</Text>
    </Stack>
  )
}
