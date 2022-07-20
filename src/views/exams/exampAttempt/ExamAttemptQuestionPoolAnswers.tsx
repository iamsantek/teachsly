import { Box, HStack, Stack, Text, <TextArea></TextArea> } from '@chakra-ui/react'
import { TextArea } from '../../../components/Inputs/TextArea';
import { AnswerType, ExamKeys, QuestionPool } from '../../../interfaces/Exams'
import { CorrectionBadge } from './CorrectionBadge'
import { Textarea } from '@chakra-ui/react';

interface Props {
  questionPool: QuestionPool;
  answers: ExamKeys | undefined;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const ExamAttemptQuestionPoolAnswers = ({ questionPool, answers }: Props) => {
  return (
    <Stack spacing={5}>
      {questionPool.questions.map((question, index) => {
        const { answerType } = question
        const answer = answers && answers[index]
        return (
          <Stack key={question.id}>
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
                      {option.isCorrectOption && alphabet[index].toLocaleLowerCase() === answer ? ' ✅' : ''}
                      {!option.isCorrectOption && alphabet[index].toLocaleLowerCase() === answer && ' ❌'}
                    </Text>
                  </Box>
                ))}
              </>
            )}
            {answerType === AnswerType.MultipleChoice && (
              <>
              <Textarea isReadOnly value={answer} / >
              </>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}
