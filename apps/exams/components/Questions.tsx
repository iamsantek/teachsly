import { useCallback, useContext, useEffect, useState } from 'react'
import { Exercises } from './question/Exercises'
import { Answers, CurrentScreen } from '../types/types'
import { Center, Stack, useToast } from '@chakra-ui/react'
import PlacementService from '../services/PlacementService'
import { PlacementContext } from '../context/PlacementContext'
import { Timer } from './Timer'
import { SpinnerScreen } from './SpinnerScreen'
import { useRouter } from 'next/router'

export const Questions = () => {
  const [answers, setAnswers] = useState<Answers>({})
  const { context, setContext } = useContext(PlacementContext)
  const [examenAlreadyDone, setExamenAlreadyDone] = useState(false)
  const toast = useToast()

  const { query: { attemptId } } = useRouter()

  useEffect(() => {
    if (!attemptId) {
      return
    }

    const fetchConfiguration = async () => {
      const configuration = await PlacementService.fetchConfiguration(attemptId as string)

      if ((configuration as any).error) {
        setContext({
          ...context,
          isLoading: false
        })
        toast({
          title: 'Error',
          description: 'El examen ya ha sido realizado'
        })
        setExamenAlreadyDone(true)
        return
      }

      console.log('configuration', configuration)
      const { questionPools, timer } = configuration

      setContext({
        ...context,
        questionPools,
        timer,
        isLoading: false
      })
    }

    fetchConfiguration()
  }, [attemptId])

  const sendResults = useCallback(async (answers: Answers) => {
    console.log('Sending results...')
    setContext({
      ...context,
      isLoading: true
    })

    const results = await PlacementService.sendResults(answers, attemptId as string)
    setContext({
      ...context,
      results,
      isLoading: false,
      currentScreen: CurrentScreen.GoodBye
    })
  }, [attemptId])

  const { questionPools, timer, isLoading, currentQuestionIndex, currentQuestionPoolIndex } = context

  const handleNext = (questionPoolIndex: number, questionNumber: number, answerId: string | undefined) => {
    const updatedAnswers: Answers = {
      ...answers,
      [questionPoolIndex]: {
        ...answers[questionPoolIndex],
        [questionNumber]: answerId
      }
    }

    const currentQuestionPoolLength = questionPools[currentQuestionPoolIndex].questions.length
    const isLastQuestionPoolQuestion = currentQuestionIndex === currentQuestionPoolLength - 1

    setAnswers(updatedAnswers)

    if (isLastQuestionPoolQuestion) {
      const isLastQuestionPool = currentQuestionPoolIndex === questionPools.length - 1
      if (isLastQuestionPool) {
        sendResults(updatedAnswers)
        return
      }

      setContext({
        ...context,
        currentQuestionIndex: 0,
        currentQuestionPoolIndex: currentQuestionPoolIndex + 1
      })
      return
    }

    setContext({
      ...context,
      currentQuestionIndex: currentQuestionIndex + 1
    })
  }

  const handleTimerFinish = () => {
    if (timer.type === 'question') {
      handleNext(
        currentQuestionPoolIndex,
        currentQuestionIndex,
        undefined
      )
    } else {
      sendResults(answers)
    }
  }

  const onChangeBrowserTab = () => {
    // TODO: Check if the user is on the same tab
    if (document.visibilityState === 'visible') {
      console.log('Active')
    } else {
      console.log('Inactive')
    }
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', onChangeBrowserTab)

    return () => {
      document.removeEventListener('visibilitychange', onChangeBrowserTab)
    }
  }, [])

  if (isLoading) {
    return (
      <SpinnerScreen />
    )
  }

  if (examenAlreadyDone) {
    return null
  }

  return (
    <Stack spacing={6} display='flex' alignContent='center' minWidth={['100%', 'container.md']}>
      {/* <Progress value={(currentQuestionIndex / questions.length) * 100} colorScheme='brand' /> */}
      <Center flexDirection='column' gap={3}>
        <Timer onTimerFinish={handleTimerFinish} />
        {/* <Text>Question {currentQuestionIndex + 1} of {questions.length || 0}</Text> */}
      </Center>
      <Exercises
        questionPool={questionPools[currentQuestionPoolIndex]}
        onAnswer={handleNext}
        questionPoolIndex={currentQuestionPoolIndex}
        questionNumber={currentQuestionIndex}
        totalExercises={questionPools.length}
      />
    </Stack>
  )
}
