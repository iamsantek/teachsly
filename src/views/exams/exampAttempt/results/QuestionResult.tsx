import { Stack, Text } from '@chakra-ui/react'
import { AnswerType, ExamKeys, Question } from '../../../../interfaces/Exams'
import { alphabet } from '../../../../utils/ExamUtils'
import { generateRandomId } from '../../../../utils/StringUtils'

interface Props {
    question: Question
    studentAnswers: ExamKeys | undefined
    questionIndex: number
}

export const QuestionResult = ({ question, studentAnswers, questionIndex }: Props) => {
  const isSomeCorrectAnswer = question.options?.some(option => option.isCorrectOption)
  const answer = studentAnswers
  return (
        <Stack>
            <Text>{questionIndex + 1}) {question.question}</Text>
            {question.options?.map((option, optionIndex) => {
              const id = generateRandomId()
              return (
                    <Text fontWeight={option.isCorrectOption ? 'bold' : 'normal'} key={id}>{alphabet[optionIndex].toUpperCase()}) {option.label}
                        {option.isCorrectOption && alphabet[optionIndex] === answer ? ' ✅' : ''}
                        {isSomeCorrectAnswer && !option.isCorrectOption && alphabet[optionIndex].toLocaleLowerCase() === answer && ' ❌'}
                    </Text>
              )
            })}
            {question.answerType === AnswerType.TextArea && (
                <Text>
                    {answer} {question.correction?.isCorrectAnswer === true ? ' ✅' : ''} {question.correction?.isCorrectAnswer === false ? ' ❌' : ''}
                </Text>
            )}
        </Stack>
  )
}
