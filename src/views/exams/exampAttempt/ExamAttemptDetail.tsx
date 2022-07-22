import { Badge, Button, FormLabel, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Stack, Text, Textarea } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useCallback, useContext, useEffect, useState } from 'react'
import { FormProvider, useForm, useFieldArray, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Exam, ExamAttempt, UpdateExamAttemptInput } from '../../../API'
import { SectionHeader } from '../../../components/Headers/SectionHeader'
import { ContentLinePlaceholder } from '../../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../../components/Placeholders/Placeholder'
import { UserDashboardContext } from '../../../contexts/UserDashboardContext'
import { ExamCorrection, QuestionPool } from '../../../interfaces/Exams'
import { ToastNotification } from '../../../observables/ToastNotification'
import ExamService from '../../../services/ExamService'
import { translate } from '../../../utils/LanguageUtils'
import { ExamAttemptAnswers } from './ExamAttemptAnswers'
import { ExamAttemptCounters } from './ExamAttemptCounters'

export const ExamAttemptDetail = () => {
  const [examAttempt, setExamAttempt] = useState<ExamAttempt>()
  const [exam, setExam] = useState<Exam>()
  const { attemptId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isSendingResults, setIsSendingResults] = useState(false)

  const navigate = useNavigate()
  const formControls = useForm<ExamCorrection>()
  const { context: { user } } = useContext(UserDashboardContext)
  const { handleSubmit, control, reset, watch, register } = formControls
  const { update } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'questionPools' // unique name for your Field Array
  })

  const fetchExamInformation = useCallback(async () => {
    const examAttemptResponse = await ExamService.fetchExamAttemptsByAId(attemptId as string)
    const examResponse = await ExamService.getExamById(examAttemptResponse?.getExamAttempt?.examId as string)
    const questionPools: QuestionPool[] = JSON.parse(examResponse?.getExam?.questionPools as string)

    reset({
      questionPools: questionPools,
      correctAnswers: examAttemptResponse?.getExamAttempt?.correctAnswers || 0,
      totalQuestions: examAttemptResponse?.getExamAttempt?.totalQuestions || 0,
      score: parseInt(examAttemptResponse?.getExamAttempt?.score as string) || 0,
      teacherComment: examAttemptResponse?.getExamAttempt?.teacherComments || ''
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

  const sendCorrection = async (values: ExamCorrection) => {
    setIsSendingResults(true)
    const { score, correctAnswers, questionPools, totalQuestions, teacherComment: teacherComments } = values
    const results: UpdateExamAttemptInput = {
      ...examAttempt,
      id: examAttempt?.id as string,
      score: score.toString(),
      correctedBy: user?.name,
      correctAnswers,
      totalQuestions,
      teacherComments,
      keys: JSON.stringify(questionPools)
    }
    const examAttemptResponse = await ExamService.updateExamAttempt(results)

    ToastNotification({
      description: examAttemptResponse ? 'CORRECTION_SUCCESS' : 'CORRECTION_ERROR',
      status: examAttemptResponse ? 'SUCCESS' : 'ERROR'
    })

    setIsSendingResults(false)

    if (examAttemptResponse) {
      navigate('/exams/attempts')
    }
  }

  const saveResults = (values: ExamCorrection) => {
    sendCorrection(values)
  }

  const questionPools = watch('questionPools')

  return (
    <Stack marginBottom={10}>
      <SectionHeader sectionName={examAttempt?.userName as string} />
      <Stack>
        <Text fontWeight='bold'>{exam?.title}</Text>
        <Text>{translate('FINISHED_DATE')} {dayjs(examAttempt?.updatedAt).format('DD/MM/YYYY HH:MM')}hs</Text>
        <HStack gap={1}>
          <Text>{translate('STATUS')}</Text> <Badge textAlign={'center'} alignContent='center' alignItems='center' justifyContent='center' colorScheme={examAttempt?.correctedBy ? 'green' : examAttempt?.isCompleted ? 'orange' : 'red'}>{translate(examAttempt?.isCompleted ? examAttempt.correctedBy ? 'CORRECTED' : 'NOT_CORRECTED' : 'NOT_FINISHED')}</Badge>
        </HStack>
      </Stack>
      <FormProvider {...formControls}>
        <form onSubmit={handleSubmit(saveResults)}>
          <Stack spacing={5}>
            <ExamAttemptAnswers
              attempt={examAttempt as ExamAttempt}
              updateFn={update}
            />
            {examAttempt?.correctedBy
              ? <></>
              : <ExamAttemptCounters questionPools={questionPools} attempt={examAttempt as ExamAttempt} />}

            <FormLabel>{translate('EXAM_TEACHER_COMMENTS')}</FormLabel>
            <Textarea
              placeholder={translate('COMMENTS')}
              readOnly={!!examAttempt?.correctedBy}
              rows={5}
              {...register('teacherComment')}
            />

            <FormLabel>{translate('FINAL_MARK')}</FormLabel>
            <Controller
              render={({ field: { onChange, value, ref } }) => (
                <NumberInput isReadOnly={!!examAttempt?.correctedBy} ref={ref} onChange={onChange} value={value} maxWidth={['100%', '25%']} defaultValue={7} min={0} max={10} precision={2} step={0.25} size='lg'>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
              control={control}
              name='score'
              rules={{
                required: true
              }}
            />

            <Button
              type='submit'
              colorScheme='brand'
              isLoading={isSendingResults}
              disabled={watch('pendingAnswers') > 0 || !!examAttempt?.correctedBy}
            >
              {translate('FINISH_CORRECTION')}
            </Button>
          </Stack>
        </form>
      </FormProvider>
    </Stack>
  )
}
