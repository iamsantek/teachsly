import { Badge } from '@chakra-ui/react'
import { Question } from '../../../interfaces/Exams'
import { translate } from '../../../utils/LanguageUtils'

interface Props {
  question: Question;
}

enum BadgeColors {
  ORANGE = 'orange',
  GREEN = 'green',
  RED = 'red',
}

export const CorrectionBadge = ({ question }: Props) => {
  const withSelfCorrection = question.options?.some(option => option.isCorrectOption)

  const badgeColor = () => {
    if (question.correction?.manualCorrection) {
      return BadgeColors.ORANGE
    }

    if (withSelfCorrection) {
      return BadgeColors.GREEN
    }

    return BadgeColors.RED
  }

  return (
    <Badge p={1} colorScheme={badgeColor()} textAlign='center' alignContent='center' alignItems='center' justifyContent='center'>
      {translate(question.correction?.manualCorrection ? 'MANUAL_CORRECTION' : withSelfCorrection ? 'WITH_SELF_CORRECTION' : 'WITH_OUT_SELF_CORRECTION')}
    </Badge>
  )
}
