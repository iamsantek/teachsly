import { Box, HStack, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { UseFieldArrayUpdate } from 'react-hook-form'
import { AnswerType, ExamCorrection, ExamKeys, QuestionPool } from '../../../interfaces/Exams'
import { manualMultipleChoiceCorrection, manualTextCorrection } from '../../../utils/ExamUtils'
import { generateRandomId } from '../../../utils/StringUtils'
import { CorrectionBadge } from './CorrectionBadge'
import { IsCorrectAnswerRadio } from './IsCorrectAnswerRadio'
import { SelectCorrectAnswer } from './SelectCorrectAnswer'

interface Props {
  questionPool: QuestionPool;
  answers: ExamKeys | undefined;
  questionPoolIndex: number;
  updateFn: UseFieldArrayUpdate<ExamCorrection, 'questionPools'>
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export const ExamAttemptQuestionPoolAnswers = ({ questionPoolIndex, questionPool, answers, updateFn }: Props) => {
  const [value, setValue] = useState<number | undefined>(undefined)

  const onMultipleChoiceManualCorrection = (questionPoolIndex: number, questionIndex: number, optionIndex: number) => {
    const updatedValues = manualMultipleChoiceCorrection(questionPool, questionIndex, optionIndex)
    updateFn(questionPoolIndex, updatedValues)
  }

  const onTextManualCorrection = (questionPool: QuestionPool, questionIndex: number, value: boolean) => {
    const updatedValues = manualTextCorrection(questionPool, questionIndex, value)
    updateFn(questionPoolIndex, updatedValues)
  }

  const checkManualCorrection = (questionPool: QuestionPool, questionIndex: number) => {
    if (questionPool.questions[questionIndex].correction?.isCorrectAnswer === undefined) {
      return undefined
    }

    return questionPool.questions[questionIndex].correction?.isCorrectAnswer ? 1 : 0
  }

  return (
    <Stack spacing={5}>
      {questionPool.questions.map((question, questionIndex) => {
        const { answerType } = question
        const answer = answers && answers[questionIndex]
        const isSomeCorrectAnswer = question.options?.some(option => option.isCorrectOption)
        const id = generateRandomId()

        return (
          <Stack key={id}>
            <HStack>
              <Text>{questionIndex + 1}. {question.question}</Text>
              <CorrectionBadge question={question} />
            </HStack>
            {answerType === AnswerType.MultipleChoice && (
              <>
                {question.options?.map((option, optionIndex) => (
                  <>
                    <Box key={option.id}>
                      <Text fontWeight={option.isCorrectOption ? 'bold' : 'normal'}>
                        {alphabet[optionIndex]}.{option.label}
                        {option.isCorrectOption && alphabet[optionIndex] === answer ? ' ✅' : ''}
                        {isSomeCorrectAnswer && !option.isCorrectOption && alphabet[optionIndex].toLocaleLowerCase() === answer && ' ❌'}
                      </Text>
                    </Box>
                  </>
                ))}
                {(!isSomeCorrectAnswer || question.correction) && (
                  <>
                    <SelectCorrectAnswer
                      question={question}
                      questionIndex={questionIndex}
                      questionPoolIndex={questionPoolIndex}
                      value={value as number}
                      onChange={(newValue) => {
                        setValue(newValue)
                        onMultipleChoiceManualCorrection(questionPoolIndex, questionIndex, newValue)
                      }}
                    />
                  </>
                )}
              </>
            )}
            {answerType === AnswerType.TextArea && (
              <Stack spacing={3}>
                <Text>{answer}</Text>
                <IsCorrectAnswerRadio
                  value={checkManualCorrection(questionPool, questionIndex)}
                  onChange={(newValue) => {
                    onTextManualCorrection(questionPool, questionIndex, !!parseInt(newValue))
                  }}
                />
              </Stack>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
