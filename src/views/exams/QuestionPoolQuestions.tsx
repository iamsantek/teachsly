import { Button, Stack, Input as ChakraInput, HStack, Text, Box, Flex, Checkbox } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import { useFormContext, UseFieldArrayUpdate } from 'react-hook-form'
import { AiFillDelete, AiFillFolder } from 'react-icons/ai'
import { BsListCheck } from 'react-icons/bs'
import { FileUploader } from '../../components/Inputs/FileUploader'
import { QuestionPool, Question, Options, ExamForm, QuestionType, AnswerType, ExamAttachments, ExamAttachmentType } from '../../interfaces/Exams'
import { translate } from '../../utils/LanguageUtils'
import { QuestionConfigurationDrawer } from './QuestionConfigurationDrawer'
import StorageService from '../../services/aws/StorageService'
import CloudFrontService from '../../services/aws/CloudFrontService'
import { alphabet } from '../../utils/ExamUtils'

interface Props {
  questionPool: QuestionPool;
  questionPoolIndex: number;
  updateFn: UseFieldArrayUpdate<ExamForm, 'questionPools'>
};

export const QuestionPoolQuestions = ({ questionPool, questionPoolIndex, updateFn: update }: Props) => {
  const { register, watch } = useFormContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [files, setFiles] = useState<{ [key: string]: ExamAttachments }>()

  const addQuestion = (questionPoolIndex: number, questionType = QuestionType.TEXT, answerType = AnswerType.MultipleChoice) => {
    update(questionPoolIndex, {
      ...watch('questionPools')[questionPoolIndex],
      questions: [
        ...watch('questionPools')[questionPoolIndex].questions,
        {
          id: String(watch('questionPools')[questionPoolIndex].questions.length + 1),
          question: '',
          answerType,
          questionType,
          options: answerType === AnswerType.MultipleChoice
            ? [{
                id: 'a',
                label: '',
                isCorrectOption: undefined
              }]
            : undefined,
          correctBlockSequence: answerType === AnswerType.Blocks ? '' : undefined

        }
      ]
    })
  }

  const addOption = (questionIndex: number, questionPoolIndex: number) => {
    const { options } = watch('questionPools')[questionPoolIndex].questions[questionIndex]

    const newOption = {
      id: alphabet[options.length],
      label: '',
      isCorrectOption: undefined
    }

    update(questionPoolIndex, {
      ...watch('questionPools')[questionPoolIndex],
      questions: watch('questionPools')[questionPoolIndex].questions.map((question: Question, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            options: [...question.options as Options[], newOption]
          }
        }

        return question
      })
    })
  }

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>, questionIndex: number, type: ExamAttachmentType) => {
    if (!event.target.files) {
      return
    }

    const uploadFile = await StorageService.uploadToS3(event.target.files[0])

    update(questionPoolIndex, {
      ...watch('questionPools')[questionPoolIndex],
      questions: watch('questionPools')[questionPoolIndex].questions.map((question: Question, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            [type]: uploadFile?.key
          }
        }

        return question
      })
    })

    setFiles({
      ...files,
      [questionIndex]: {
        ...files?.[questionIndex],
        [type]: event.target.files[0]
      }
    })
  }

  const onChangeOption = (newValue: string, questionPoolIndex: number) => {
    const [question, option] = newValue.split('-')

    const questionPool: QuestionPool = watch('questionPools')[questionPoolIndex]
    const questionToUpdate: Question = questionPool.questions[Number(question)]
    const index = questionToUpdate.options?.findIndex((_option: Options, index: number) => alphabet[index] === option)

    if (index !== undefined && !!questionToUpdate?.options && questionToUpdate?.options[index]) {
      questionToUpdate.options[index].isCorrectOption = !questionToUpdate.options[index].isCorrectOption
    }

    questionPool.questions[Number(question)] = questionToUpdate

    update(questionPoolIndex, questionPool)
  }

  const onDeleteOption = (questionIndex: number, optionIndex: number, questionPoolIndex: number) => {
    const question = questionPool.questions[questionIndex]
    const filteredOptions = question.options?.filter((option: Options, index: number) => index !== optionIndex)

    question.options = filteredOptions
    questionPool.questions[questionIndex] = question

    update(questionPoolIndex, questionPool)
  }

  const onDeleteQuestion = (questionIndex: number) => {
    const questionPool: QuestionPool = watch('questionPools')[questionPoolIndex]
    const filteredQuestions = questionPool.questions.filter((question: Question, index: number) => index !== questionIndex)

    questionPool.questions = filteredQuestions
    update(questionPoolIndex, questionPool)
  }

  const viewFile = async (key: string) => {
    const file = await CloudFrontService.getCDNUrl(key)
    window.open(file.url, '_blank')
  }

  const deleteFile = (questionIndex: number, type: ExamAttachmentType) => {
    update(questionPoolIndex, {
      ...watch('questionPools')[questionPoolIndex],
      questions: watch('questionPools')[questionPoolIndex].questions.map((question: Question, index: number) => {
        if (index === questionIndex) {
          return {
            ...question,
            [type]: undefined
          }
        }

        return question
      })
    })
  }

  return (
    <>
      {questionPool.questions.map((question, questionIndex) => (
        <Stack marginY={10} spacing={5} key={question.id} width='100%'>
          <Text fontWeight={600} fontSize="sm" textStyle="title">
            {translate('QUESTION')} #{questionIndex + 1}
          </Text>
          <Flex gap={2}>
            <ChakraInput
              placeholder={`${translate('QUESTION')} #${questionIndex + 1}`}
              {...register(`questionPools.${questionPoolIndex}.questions.${questionIndex}.question`, { required: false })}
            />

            <Button
              onClick={() => onDeleteQuestion(questionIndex)}
              colorScheme='brand'
              variant='solid'>
              <AiFillDelete />
            </Button>
          </Flex>

          <Text fontWeight={600} fontSize="sm" textStyle="title">
            {translate('DESCRIPTION')} #{questionIndex + 1}
          </Text>

          <ChakraInput
            placeholder={`${translate('DESCRIPTION')} #${questionIndex + 1}`}
            {...register(`questionPools.${questionPoolIndex}.questions.${questionIndex}.description`, { required: false })}
          />

          {question.answerType === AnswerType.Blocks && (
            <>
              <Text fontWeight={600} fontSize="sm" textStyle="title">
                WIP
              </Text>
            </>
          )}

          {question.answerType === AnswerType.MultipleChoice && question.options?.map((option, optionIndex) => (
            <>
              <Stack key={option.id} paddingLeft={10} marginY={6} spacing={5}>
                <Text fontWeight={600} fontSize="sm" textStyle="title">
                  {translate('OPTION')} #{optionIndex + 1}
                </Text>
                <HStack alignContent='center' alignItems='center' >
                  <Checkbox
                    colorScheme='brand'
                    onChange={(e) => onChangeOption(e.target.value, questionPoolIndex)}
                    isChecked={!!watch('questionPools')[questionPoolIndex].questions[questionIndex].options[optionIndex].isCorrectOption}
                    value={`${questionIndex}-${alphabet[optionIndex]}`} />
                  <ChakraInput
                    placeholder={`${translate('OPTION')} #${optionIndex + 1}`}
                    {...register(`questionPools.${questionPoolIndex}.questions.${questionIndex}.options.${optionIndex}.label`, { required: false, maxLength: 80 })}
                  />

                  <Button
                    onClick={() => onDeleteOption(questionIndex, optionIndex, questionPoolIndex)}
                    colorScheme='brand'
                    variant='solid'>
                    <AiFillDelete />
                  </Button>
                </HStack>
              </Stack>
              {optionIndex === question.options?.length as number - 1 && (
                <Box paddingLeft={10} display='flex' flexDir='column' justifyContent='flex-end' maxWidth='100%'>
                  <Button size='sm' leftIcon={<BsListCheck />} colorScheme="brand" onClick={() => addOption(questionIndex, questionPoolIndex)}>
                    {`${translate('ADD_OPTION_BUTTON')}${questionIndex + 1}`}
                  </Button>
                </Box>
              )}
            </>
          ))}
          <Flex justifyContent='flex-end'>
            {(questionIndex === questionPool.questions.length - 1 || questionPool.questions.length === 0) && (
              <Button colorScheme='brand' leftIcon={<BsListCheck />} onClick={() => setIsDrawerOpen(true)}>
                {translate('ADD_QUESTION_BUTTON')}
              </Button>
            )}
          </Flex>
          <QuestionConfigurationDrawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onSave={(questionType, answerType) => addQuestion(questionPoolIndex, questionType, answerType)}
          />
        </Stack>
      ))}
    </>

  )
}
