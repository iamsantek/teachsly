import { useContext, useEffect } from 'react'
import { PlacementContext } from '../context/PlacementContext'
import { CurrentProgress } from './question/CurrentProgress'
import { useTimer } from 'reactjs-countdown-hook'
import { Text } from '@chakra-ui/react'
import { TimeGranularity } from '../types/types'

interface Props {
    onTimerFinish: () => void
}

const convertTime = (time: number, type: TimeGranularity | undefined) => {
  switch (type) {
    case TimeGranularity.SECONDS:
      return time
    case TimeGranularity.MINUTES:
      return time * 60
    case TimeGranularity.HOURS:
      return time * 60 * 60
    default:
      return time
  }
}

export const Timer = ({ onTimerFinish }: Props) => {
  const { context: { currentQuestionIndex, timer: { timeInSeconds, type, timeGranularity } } } = useContext(PlacementContext)
  const {
    hours,
    seconds,
    minutes,
    counter,
    reset
  } = useTimer(convertTime(timeInSeconds, timeGranularity), onTimerFinish)

  useEffect(() => {
    if (type === 'question') {
      reset()
    }
  }, [currentQuestionIndex, type])

  return (
    <>
    <CurrentProgress current={counter} total={timeInSeconds || 0} label=' ' />
    <Text fontWeight={'bold'}>{hours}h {minutes}m {seconds}s restantes</Text>
    </>

  )
}
