import { Heading, Stack, Button, Text, Textarea, Box, Flex, HStack } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { AnswerType, AudioQuestion, QuestionPool, QuestionType } from '../../types/types'
import { AudioQuestions } from './AudioQuestion'
import PlacementService from '../../services/PlacementService'
import { BiLinkExternal } from 'react-icons/bi'
import { MultipleChoiceOptions } from './MultipleChoiceOptions'
import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { PlacementContext } from '../../context/PlacementContext'

interface Props {
  questionPool: QuestionPool;
  questionPoolIndex: number;
  questionNumber: number;
  onAnswer: (questionPoolIndex: number, questionNumber: number, answerId: string | undefined) => void;
  totalExercises: number;
}

export const Exercises = ({ questionPool, onAnswer, questionPoolIndex, questionNumber, totalExercises }: Props) => {
  const [answer, setAnswer] = useState<string>()
  const [textAnswer, setTextAnswer] = useState<string>()
  const { context: { currentQuestionIndex } } = useContext(PlacementContext)
  const question = questionPool.questions[currentQuestionIndex]

  const fetchAttachmentUrl = async (attachmentKey: string) => {
    const url = await PlacementService.getCDNUrl(attachmentKey)
    window.open(url.url, '_blank')
  }

  const onNext = (questionPoolIndex: number, questionNumber: number, answerId: string | undefined) => {
    setTextAnswer('')
    setAnswer(undefined)
    onAnswer(questionPoolIndex, questionNumber, answerId)
    window.scrollTo(0, 0)
  }

  const questionTypeComponents = {
    [QuestionType.AUDIO]: <AudioQuestions question={question as AudioQuestion} />,
    [QuestionType.TEXT]: question.answerType === AnswerType.TextArea ? <></> : <></>
  }

  return (
    <Stack spacing={10} textAlign='center'>
      <Heading justifyContent='center' color='brand.500'>Ejercicio {questionPoolIndex + 1} de {totalExercises}</Heading>
      {questionPool.exerciseExplanation && (
      <Box border='1px' color='brand.500' p={5}>
        <Flex gap={2} alignItems='center'>
          <BsFillArrowRightCircleFill size={20} />
          <Text fontWeight='bold'>{questionPool.exerciseExplanation}</Text>
        </Flex>
        <Text fontStyle={'italic'}>{questionPool.exerciseDescription}</Text>
      </Box>
      )}
      {questionPool.attachments.length > 0 && (
      <Box border='1px' color='brand.500' p={5} textAlign='center'>
        <Box marginY={5}>
          <Text textAlign='center' fontSize={'xl'} fontWeight='bold'>Archivos necesarios para este ejercicio</Text>
          <Text>(click para abrir en nueva pestaña)</Text>
        </Box>
        <HStack alignContent={'center'} alignItems='center' justifyContent='center'>
          {questionPool.attachments.map((attachment, index) => (
            <Flex gap={3} alignItems='center' key={index} onClick={() => fetchAttachmentUrl(attachment.path)} cursor='pointer' textAlign='center'>
              <BiLinkExternal size={20} />
              <Text fontSize={20}>{attachment.name}</Text>
            </Flex>
          ))}
        </HStack>
      </Box>
      )}

      <Stack key={question.id} spacing={5}>
        {questionTypeComponents[question.questionType]}
        <Heading textAlign='left' fontWeight='900' color='brand.primary'>{currentQuestionIndex + 1}) {question.question}</Heading>
        <Text>{question.description}</Text>
        <Stack spacing={4}>
          {question.answerType === AnswerType.MultipleChoice && <MultipleChoiceOptions question={question} onChange={setAnswer} />}
          {question.answerType === AnswerType.TextArea && (
            <Textarea
              placeholder='Type your answer here'
              rows={15}
              onChange={(e) => setTextAnswer(e.target.value)}
              value={textAnswer}
            />
          )}
          <Button
            color={'brand.primary'}
            isDisabled={question.answerType === AnswerType.MultipleChoice ? !answer : !textAnswer}
            onClick={() => onNext(questionPoolIndex, questionNumber, question.answerType === AnswerType.TextArea ? textAnswer : answer!)}
          >
            Continuar
          </Button>
        </Stack>
      </Stack>

    </Stack>
  )
}
