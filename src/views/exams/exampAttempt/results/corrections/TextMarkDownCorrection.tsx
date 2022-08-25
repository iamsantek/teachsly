import { Text, Stack, Textarea, useHighlight, Box } from '@chakra-ui/react'
import { useState } from 'react'
import { UseFieldArrayUpdate, useFormContext } from 'react-hook-form';
import { ExamCorrection, ExamForm, QuestionPool } from '../../../../../interfaces/Exams';
import { generateCorrectionMatches, manualTextCorrection, onResetCorrection } from '../../../../../utils/ExamUtils';
import { translate } from '../../../../../utils/LanguageUtils';
import { IsCorrectAnswerRadio } from './IsCorrectAnswerRadio';
import { MarkDownColorHelper } from './MarkDownColorHelper';
import { TextMarkdownViewer } from './TextMarkdownViewer';

interface Props {
  answer: string;
  questionPoolIndex: number;
  questionIndex: number
  updateFn: UseFieldArrayUpdate<ExamCorrection, 'questionPools'>
}

export const TextMarkDownCorrection = ({ answer, questionIndex, questionPoolIndex, updateFn }: Props) => {
  const {  watch } = useFormContext<ExamForm>()
  const markDownCorrection = watch('questionPools')[questionPoolIndex].questions[questionIndex].correction?.markDownCorrection
  const [markDownText, setMarkDownText] = useState(markDownCorrection ?? answer)
  const { matches } = generateCorrectionMatches(markDownText)

  const generalChunks = useHighlight({
    text: markDownText,
    query: matches
  })


  const existMatches = generalChunks.some(({ match }) => match)

  const onChangeMarkDownText = (text: string) => {
    setMarkDownText(text)
  }

  const questionPool = watch('questionPools')[questionPoolIndex]

  const onTextManualCorrection = (questionPool: QuestionPool, questionIndex: number, value: boolean) => {
    const updatedValues = manualTextCorrection(questionPool, questionIndex, value, markDownText)
    console.log({ updatedValues })
    updateFn(questionPoolIndex, updatedValues)
  }

  const checkManualCorrection = (questionPool: QuestionPool, questionIndex: number) => {
    if (questionPool.questions[questionIndex].correction?.isCorrectAnswer === undefined) {
      return undefined
    }

    return questionPool.questions[questionIndex].correction?.isCorrectAnswer ? 1 : 0
  }

  const resetCorrection = () => {
    const updatedQuestionPool = onResetCorrection(questionPool, questionIndex, answer)
    console.log({updatedQuestionPool})
    updateFn(questionPoolIndex, updatedQuestionPool)
  }

  return (
    <Stack>
      <Textarea
        marginY={5}
        value={markDownText}
        onChange={(e) => onChangeMarkDownText(e.target.value)}
      />
      <MarkDownColorHelper onResetCorrection={resetCorrection} />
      <Box marginY={3}>
        {existMatches && <Text textStyle='title' marginY={3}>{translate('CORRECTION_PREVIEW')}</Text>}
        <TextMarkdownViewer markdownText={markDownText} />
        <IsCorrectAnswerRadio
          value={checkManualCorrection(questionPool, questionIndex)}
          onChange={(newValue) => {
            onTextManualCorrection(questionPool, questionIndex, !!parseInt(newValue))
          }}
        />
      </Box>
    </Stack>
  )
}


