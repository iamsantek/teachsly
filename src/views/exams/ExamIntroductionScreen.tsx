import { Alert, AlertIcon, Box, Button, Container, Flex, Heading, Image, Stack, Text, useToast } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExamForm } from '../../interfaces/Exams'
import ExamService from '../../services/ExamService'
import { SpinnerScreen } from '../others/SpinnerScreen'
import { useTimer } from 'reactjs-countdown-hook'
import dayjs from 'dayjs'
import { translate } from '../../utils/LanguageUtils'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { v4 as uuid } from 'uuid'
import { GeneralInformation } from '../../enums/GeneralInformation'
import { ExamType } from '../../API'
import { calculateExamDurationInMinutes } from '../../utils/ExamUtils'
import { toastConfig } from '../../utils/ToastUtils'

export const ExamIntroductionScreen = () => {
  const { context: { user } } = useContext(UserDashboardContext)
  const { examId } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [exam, setExam] = useState<ExamForm | undefined>()
  const [countdown, setCountdown] = useState<number>(0)
  const [isTimerFinished, setIsTimerFinished] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
  const [examAttemptId, setExamAttemptId] = useState<string | undefined>()
  const toast = useToast()

  const handleTimerFinish = () => {
    setIsTimerFinished(true)
  }

  const {
    seconds,
    minutes,
    hours,
    days,
    reset
  } = useTimer(countdown, handleTimerFinish)

  const fetchExam = useCallback(async (examId: string) => {
    const examPromise = ExamService.getExamById(examId)
    const examAttemptPromise = ExamService.getExamAttemptByExternalId(examId, user?.cognitoId as string)

    const [exam, examAttempt] = await Promise.all([examPromise, examAttemptPromise])

    setExam(exam?.getExam as unknown as ExamForm)
    const examAttemptId = examAttempt?.listExamAttempts?.items?.[0]?.id
    setExamAttemptId(examAttemptId as string)

    if (!exam?.getExam?.settings?.allowRetake && examAttemptId) {
      setIsSubmitted(true)
    }

    const countdown = Math.abs(dayjs().diff((exam?.getExam?.deadline), 'second'))
    setCountdown(countdown)
    setIsLoading(false)
  }, [user?.cognitoId])

  useEffect(() => {
    reset()
  }, [countdown])

  const examDuration = useMemo(() => calculateExamDurationInMinutes(exam as ExamForm), [exam])

  useEffect(() => {
    if (!examId) {
      return
    }

    fetchExam(examId)
  }, [examId, fetchExam])

  const onStart = async () => {
    if (!exam) {
      return
    }
    setIsProcessing(true)

    if (exam?.settings.allowRetake && examAttemptId) {
      // Delete previous exam attempt
      await ExamService.deleteExamAttempt(examAttemptId)
    }

    const examAttempt = await ExamService.createExamAttempt({
      examId: examId as string,
      userId: user?.cognitoId as string,
      examName: exam?.title,
      externalId: uuid(),
      userName: user?.name as string,
      type: exam.type ?? ExamType.EXAM
    })

    if (!examAttempt) {
      toast(toastConfig({
        description: 'ADD_OPTION_BUTTON',
        status: 'error'
      }))
      setIsProcessing(false)
      return
    }

    setIsProcessing(false)
    window.location.href = `https://${exam.type === ExamType.HOMEWORK ? 'homework' : 'exams'}.${GeneralInformation.DOMAIN}/${examAttempt.createExamAttempt?.externalId}`
  }

  if (isLoading) {
    return <SpinnerScreen />
  }

  const hasStarted = dayjs().isAfter(exam?.startDate)
  const isRetakeAllowed = exam?.settings?.allowRetake

  return (
    <Container centerContent marginY={10}>
      <Stack spacing={6}>
        <Box boxSize={40} display='flex' mx='auto'>
          <Image src='/logo-512.jpg' alt='Placementek logo' />
        </Box>
        <Heading color='brand.primary' textAlign='center'>{exam?.title}</Heading>
        <Text textAlign='justify'>
          {translate('EXAM_INTRO_WORDING_1')}
        </Text>
        <Text textAlign='justify'>
          {translate(isRetakeAllowed ? 'EXAM_INTRO_WORDING_2_WITH_RETAKE' : 'EXAM_INTRO_WORDING_2')}
        </Text>
        {isSubmitted && (
          <Alert status='error'>
            <AlertIcon />
            <Text fontWeight='bold'>{translate('RETAKE_EXAM_WARNING')}</Text>
          </Alert>
        )}
        <Flex flexDirection='column' border='2px' borderColor='brand.500' p={10} alignItems='center' alignContent='center' justifyContent='center'>
          <Text
            align='justify'
            bgGradient='linear(to-l, #3394b3, #FF0080)'
            bgClip='text'
            fontSize='4xl'
            fontWeight='bold'
          >
            {days}d:{hours}h:{minutes}m:{seconds}s
          </Text>
          <Text fontWeight='bold'>{translate('EXAM_DEADLINE')} {dayjs(exam?.deadline).format('DD/MM hh:mm')}hs</Text>
          <Text>{translate('EXAM_DURATION')}: {examDuration} mins.</Text>
        </Flex>
        <Box display='flex' alignContent='center' justifyContent='center' alignItems='center'>
          <Button
            color='whiteAlpha.800'
            size={'lg'}
            colorScheme='brand'
            _hover={{ transform: 'scale(1.05)' }}
            onClick={() => onStart()}
            isDisabled={isTimerFinished || !hasStarted || isSubmitted}
            isLoading={isProcessing}
          >
            {translate('START')}
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}
