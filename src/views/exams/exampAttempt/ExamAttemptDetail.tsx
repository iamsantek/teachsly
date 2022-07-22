import { Badge, Button, HStack, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { Exam, ExamAttempt } from '../../../API'
import { SectionHeader } from '../../../components/Headers/SectionHeader'
import { ContentLinePlaceholder } from '../../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../../components/Placeholders/Placeholder'
import { ExamCorrection, QuestionPool } from '../../../interfaces/Exams'
import ExamService from '../../../services/ExamService'
import { translate } from '../../../utils/LanguageUtils'
import { ExamAttemptAnswers } from './ExamAttemptAnswers'
import { ExamAttemptCounters } from './ExamAttemptCounters'

export const ExamAttemptDetail = () => {
  const [examAttempt, setExamAttempt] = useState<ExamAttempt>()
  const [exam, setExam] = useState<Exam>()
  const { attemptId } = useParams()
  const [isLoading, setIsLoading] = useState(true)

  const formControls = useForm<ExamCorrection>()
  const { handleSubmit, control, reset, watch, setValue } = formControls
  const { update } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'questionPools' // unique name for your Field Array
  })

  const fetchExamInformation = useCallback(async () => {
    const examAttemptResponse = await ExamService.fetchExamAttemptsByAId(attemptId as string)
    const examResponse = await ExamService.getExamById(examAttemptResponse?.getExamAttempt?.examId as string)
    const questionPools: QuestionPool[] = JSON.parse(examResponse?.getExam?.questionPools as string)

    reset({
      questionPools: questionPools
    })

    setExam(examResponse?.getExam as Exam)
    setExamAttempt(examAttemptResponse?.getExamAttempt as ExamAttempt)
    setIsLoading(false)
  }, [attemptId, reset])

  useEffect(() => {
    fetchExamInformation()
  }
  , [fetchExamInformation])

  if (isLoading) {
    const randomNumber = Math.floor(Math.random() * (10 - 4 + 1)) + 4
    return (
      <Placeholder
        show={isLoading}
        number={randomNumber}
        placeholderElement={<ContentLinePlaceholder />}
      />
    )
  }

  const saveResults = (values: ExamCorrection) => {
    console.log(values)
  }

  const questionPools = watch('questionPools')

  return (
    <Stack>
      <SectionHeader sectionName={examAttempt?.userName as string} />
      <Stack>
        <Text fontWeight='bold'>{exam?.title}</Text>
        <Text></Text>
        <Text>{translate('FINISHED_DATE')} {dayjs(examAttempt?.updatedAt).format('DD/MM/YYYY HH:MM')}hs</Text>
        <HStack gap={1}>
          <Text>{translate('STATUS')}</Text> <Badge textAlign={'center'} alignContent='center' alignItems='center' justifyContent='center' colorScheme={examAttempt?.isCompleted ? 'green' : 'red'}>{translate(examAttempt?.isCompleted ? 'FINISHED' : 'NOT_FINISHED')}</Badge>
        </HStack>
      </Stack>
      <FormProvider {...formControls}>
        <form onSubmit={handleSubmit(saveResults)}>
          <ExamAttemptAnswers
          attempt={examAttempt as ExamAttempt}
          updateFn={update}
          />
          <ExamAttemptCounters questionPools={questionPools} attempt={examAttempt as ExamAttempt} />
          <Button
            type='submit'
            colorScheme='brand'
          >
            Enviar Nota
          </Button>
        </form>
      </FormProvider>
    </Stack>
  )
}
