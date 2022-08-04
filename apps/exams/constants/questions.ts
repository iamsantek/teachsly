/* eslint-disable quotes */
import { CurrentScreen, PlacementSettings } from '../types/types'

export const configuration: PlacementSettings = {
  timer: {
    type: 'question',
    timeInSeconds: 15
  },
  questionPools: [],
  results: {
    score: 0,
    level: '',
    correctAnswers: 0
  },
  isLoading: false,
  currentScreen: CurrentScreen.Intro,
  currentQuestionIndex: 0,
  currentQuestionPoolIndex: 0
}
