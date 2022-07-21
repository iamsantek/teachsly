import { Box, HStack, Radio, RadioGroup, Stack, Text } from '@chakra-ui/react'
import { AnswerType, ExamKeys, QuestionPool } from '../../../interfaces/Exams'
import { translate } from '../../../utils/LanguageUtils'
import { generateRandomId } from '../../../utils/StringUtils'
import { CorrectionBadge } from './CorrectionBadge'

interface Props {
  questionPool: QuestionPool;
  answers: ExamKeys | undefined;
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export const ExamAttemptQuestionPoolAnswers = ({ questionPool, answers }: Props) => {
  return (
    <Stack spacing={5}>
      {questionPool.questions.map((question, index) => {
        const { answerType } = question
        const answer = answers && answers[index]
        const isSomeCorrectAnswer = question.options?.some(option => option.isCorrectOption)
        const id = generateRandomId()

        return (
          <Stack key={id}>
            <HStack>
              <Text>{index + 1}. {question.question}</Text>
              <CorrectionBadge question={question} />
            </HStack>
            {answerType === AnswerType.MultipleChoice && (
              <>
                {question.options?.map((option, index) => (
                  <Box key={option.id}>
                    <Text fontWeight={option.isCorrectOption ? 'bold' : 'normal'}>
                      {alphabet[index]}.{option.label}
                      {option.isCorrectOption && alphabet[index] === answer ? ' ✅' : ''}
                      {isSomeCorrectAnswer && !option.isCorrectOption && alphabet[index].toLocaleLowerCase() === answer && ' ❌'}
                    </Text>
                  </Box>
                ))}
                {!isSomeCorrectAnswer && (
                  <RadioGroup onChange={() => {}} value={1}>
                    <Stack direction='row' spacing={3}>
                      <Text fontWeight='bold'>{translate('CORRECT_ANSWER')}</Text>
                      <Radio value={1}>{translate('YES')}</Radio>
                      <Radio value={0}>{translate('NO')}</Radio>
                    </Stack>
                  </RadioGroup>
                )}
              </>
            )}
            {answerType === AnswerType.TextArea && (
              <>
                <Text>{answer}</Text>
              </>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
