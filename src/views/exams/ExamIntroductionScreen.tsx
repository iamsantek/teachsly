import { Alert, AlertIcon, Box, Button, Container, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExamForm } from '../../interfaces/Exams'
import ExamService from '../../services/ExamService'
import { SpinnerScreen } from '../others/SpinnerScreen'
import { useTimer } from 'reactjs-countdown-hook'
import dayjs from 'dayjs'
import { translate } from '../../utils/LanguageUtils'
import { calculateExamDurationInMinutes } from '../../utils/ExamUtils'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { v4 as uuid } from 'uuid'
import { ToastNotification } from '../../observables/ToastNotification'
import { GeneralInformation } from '../../enums/GeneralInformation'

export const ExamIntroductionScreen = () => {
  const { context: { user } } = useContext(UserDashboardContext)
  const { examId } = useParams()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [exam, setExam] = useState<ExamForm | undefined>()
  const [countdown, setCountdown] = useState<number>(0)
  const [isTimerFinished, setIsTimerFinished] = useState<boolean>(false)
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

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
    const examAttemptPromise = ExamService.getExamAttemptByExternalId(examId, user?.id as string)

    const [exam, examAttempt] = await Promise.all([examPromise, examAttemptPromise])

    setExam(exam?.getExam as unknown as ExamForm)

    if (examAttempt?.listExamAttempts?.items && examAttempt?.listExamAttempts?.items?.length > 0) {
      setIsSubmitted(true)
    }

    const countdown = Math.abs(dayjs().diff((exam?.getExam?.deadline), 'second'))
    setCountdown(countdown)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    reset()
  }, [countdown])

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

    const examAttempt = await ExamService.createExamAttempt({
      examId: examId as string,
      userId: user?.id as string,
      examName: exam?.title,
      externalId: uuid()
    })

    if (!examAttempt) {
      ToastNotification({
        description: 'ADD_OPTION_BUTTON',
        status: 'ERROR'
      })
      setIsProcessing(false)
      return
    }

    setIsProcessing(false)
    window.location.href = `https://exams.${GeneralInformation.DOMAIN}/${examAttempt.createExamAttempt?.externalId}`
  }

  if (isLoading) {
    return <SpinnerScreen />
  }

  const hasStarted = dayjs().isAfter(exam?.startDate)

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
          {translate('EXAM_INTRO_WORDING_2')}
        </Text>
        {isSubmitted && (
          <Alert status='error'>
            <AlertIcon />
            <Text fontWeight='bold'>Ya has realizado un intento de este examen. No puedes volver a hacerlo.</Text>
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
          <Text>{translate('EXAM_DURATION')}: {calculateExamDurationInMinutes(exam as ExamForm)} mins.</Text>
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
            Comenzar
          </Button>
        </Box>
      </Stack>
    </Container>
  )
}
