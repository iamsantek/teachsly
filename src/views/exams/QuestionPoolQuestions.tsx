import { Button, Stack, Input as ChakraInput, HStack, Radio, Text, Box, Flex } from '@chakra-ui/react'
import { useFormContext, UseFieldArrayUpdate } from 'react-hook-form'
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { BsListCheck } from 'react-icons/bs'
import { QuestionPool, Question, Options, ExamForm } from '../../interfaces/Exams'
import { translate } from '../../utils/LanguageUtils'

interface Props {
    questionPool: QuestionPool;
    questionPoolIndex: number;
    updateFn: UseFieldArrayUpdate<ExamForm, 'questionPools'>
};

export const QuestionPoolQuestions = ({ questionPool, questionPoolIndex, updateFn: update }: Props) => {
  const { register, watch } = useFormContext()

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'

  const addQuestion = (questionPoolIndex: number) => {
    update(questionPoolIndex, {
      ...watch('questionPools')[questionPoolIndex],
      questions: [
        ...watch('questionPools')[questionPoolIndex].questions,
        {
          id: String(watch('questionPools')[questionPoolIndex].questions.length + 1),
          question: '',
          options: [{
            id: 'a',
            label: '',
            isCorrectOption: undefined
          }]
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
            options: [...question.options, newOption]
          }
        }

        return question
      })
    })
  }

  const onChangeOption = (newValue: string, questionPoolIndex: number) => {
    const [question, option] = newValue.split('-')

    const questionPool: QuestionPool = watch('questionPools')[questionPoolIndex]
    const questionToUpdate: Question = questionPool.questions[Number(question)]
    questionToUpdate.options = questionToUpdate.options.map((_option: Options, index: number) => {
      return {
        ..._option,
        isCorrectOption: alphabet[index] === option
      }
    })

    questionPool.questions[Number(question)] = questionToUpdate

    update(questionPoolIndex, questionPool)
  }

  const onDeleteOption = (questionIndex: number, optionIndex: number, questionPoolIndex: number) => {
    const question = questionPool.questions[questionIndex]
    const filteredOptions = question.options.filter((option: Options, index: number) => index !== optionIndex)

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

  return (
        <>
            {questionPool.questions.map((question, questionIndex) => (
                <Stack marginY={10} spacing={5} key={question.id} width='100%'>
                        <Text fontWeight={600} fontSize="sm" textStyle="title">
                            {translate('QUESTION')} #{questionIndex + 1}
                        </Text>
                        <Flex gap={2}>
                        <ChakraInput
                            isRequired={true}
                            placeholder={`${translate('QUESTION')} #${questionIndex + 1}`}
                            {...register(`questionPools.${questionPoolIndex}.questions.${questionIndex}.question`, { required: true, maxLength: 80 })}
                        />

                        <Button
                            onClick={() => onDeleteQuestion(questionIndex)}
                            colorScheme='brand'
                            variant='solid'>
                            <AiFillDelete />
                        </Button>
                    </Flex>

                    {question.options.map((option, optionIndex) => (
                        <Stack key={option.id} paddingLeft={10} marginBottom={5} spacing={5}>
                            <Text fontWeight={600} fontSize="sm" textStyle="title">
                                {translate('OPTION')} #{optionIndex + 1}
                            </Text>
                            <HStack alignContent='center' alignItems='center' >
                                <Radio
                                    colorScheme='brand'
                                    onChange={(e) => onChangeOption(e.target.value, questionPoolIndex)}
                                    isChecked={!!watch('questionPools')[questionPoolIndex].questions[questionIndex].options[optionIndex].isCorrectOption}
                                    value={`${questionIndex}-${alphabet[optionIndex]}`} />
                                <ChakraInput
                                    isRequired={true}
                                    placeholder={`${translate('OPTION')} #${optionIndex + 1}`}
                                    {...register(`questionPools.${questionPoolIndex}.questions.${questionIndex}.options.${optionIndex}.label`, { required: true, maxLength: 80 })}
                                />
                                <Button
                                    onClick={() => onDeleteOption(questionIndex, optionIndex, questionPoolIndex)}
                                    colorScheme='brand'
                                    variant='solid'>
                                    <AiFillDelete />
                                </Button>
                            </HStack>
                        </Stack>
                    ))}
                    <Box paddingLeft={10} display='flex' flexDir='column' justifyContent='flex-end' maxWidth='100%'>
                        <Button size='sm' leftIcon={<BsListCheck />} colorScheme="brand" onClick={() => addOption(questionIndex, questionPoolIndex)}>
                            {`${translate('ADD_OPTION_BUTTON')}${questionIndex + 1}`}
                        </Button>
                    </Box>
                    <Flex justifyContent='flex-end'>
                        {questionIndex === questionPool.questions.length - 1 && (
                            <Button size='lg' colorScheme='brand' leftIcon={<AiOutlinePlus />} onClick={() => addQuestion(questionPoolIndex)} marginY={5}>
                                {translate('ADD_QUESTION_BUTTON')}
                            </Button>
                        )}
                    </Flex>
                </Stack>
            ))}
        </>

  )
}
