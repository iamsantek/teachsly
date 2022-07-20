import { Badge } from '@chakra-ui/react'
import { AnswerType, Question } from '../../../interfaces/Exams'
import { translate } from '../../../utils/LanguageUtils'

interface Props {
    question: Question;
}

export const CorrectionBadge = ({ question }: Props) => {
  if (question.answerType !== AnswerType.MultipleChoice) {
    return null
  }

  const withSelfCorrection = question.options?.some(option => option.isCorrectOption)

  return (
        <Badge p={1} colorScheme={withSelfCorrection ? 'green' : 'red'} textAlign='center' alignContent='center' alignItems='center' justifyContent='center'>
            {translate(withSelfCorrection ? 'WITH_SELF_CORRECTION' : 'WITH_OUT_SELF_CORRECTION')}
        </Badge>
  )
}
