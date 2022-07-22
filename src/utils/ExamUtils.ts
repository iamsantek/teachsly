import dayjs from 'dayjs'
import { Course, ExamAttempt, GetExamQuery } from '../API'
import { defaultExamTimerOptions } from '../constants/Exams'
import { TranslationsDictionary } from '../dictionaries/dictionary'
import { AnswerType, ExamAnswers, ExamAttemptFilter, ExamForm, ExamKeys, Options, Question, QuestionPool, TimerType } from '../interfaces/Exams'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import { BadgeColors } from '../views/exams/exampAttempt/CorrectionBadge'
import { transformGroups } from './CourseUtils'

export const alphabet = 'abcdefghijklmnopqrstuvwxyz'

// Check that any of questions and options inside the questions pools in Exam Form are empty
export const existEmptyFields = (examForm: ExamForm): boolean => {
  const { questionPools } = examForm
  return questionPools.some(pool => {
    const isEmpty = pool.questions.some(question => {
      if (question.options?.length === 0 || question.question.length === 0) {
        return true
      }

      return question.options?.some(option => option.label === '')
    })
    return isEmpty
  })
}

export const formatExamForm = (exam: ExamForm) => ({
  ...exam,
  groups: (exam.groups as MultiSelectOption[]).map(group => group.value) as string[],
  startDate: new Date(exam.startDate).toISOString(),
  deadline: new Date(exam.deadline).toISOString(),
  questionPools: JSON.stringify(exam.questionPools),
  timer: {
    ...exam.timer,
    type: (exam.timer.type as unknown as MultiSelectOption).value
  }
})

export const renderExamType = (timerType: TimerType) => {
  return defaultExamTimerOptions.find(option => option.value === timerType) ?? defaultExamTimerOptions[0]
}

// Function to transform API response to Exam Form
export const formatAPIResponse = (exam: GetExamQuery | undefined, courses: Course[]): ExamForm | undefined => {
  if (!exam?.getExam) {
    return
  }

  return ({
    ...exam?.getExam,
    groups: transformGroups(courses, exam?.getExam?.groups as string[]),
    questionPools: JSON.parse(exam?.getExam?.questionPools as unknown as string),
    deadline: dayjs(exam.getExam?.deadline).format('YYYY-MM-DDTHH:mm'),
    startDate: dayjs(exam.getExam?.startDate).format('YYYY-MM-DDTHH:mm'),
    timer: {
      type: renderExamType(exam?.getExam?.timer?.type as TimerType),
      timeInSeconds: exam?.getExam?.timer?.timeInSeconds as number
    }
  })
}

export const calculateExamDurationInMinutes = (exam: ExamForm): number => {
  const { timer } = exam
  if (timer.type === 'global') {
    return timer.timeInSeconds / 60
  }

  return (timer.timeInSeconds * exam.questionPools[0].questions.length) / 60
}

// Function to eliminate the isCorrect property from the options field in questions in the Exam Form
export const formatExamFormForAPI = (exam: ExamForm): ExamForm => {
  const { questionPools } = exam
  const newQuestionPools = questionPools.map(pool => ({
    ...pool,
    questions: pool.questions.map(question => ({
      ...question,
      options: question.options?.map(option => ({ ...option, isCorrectOption: undefined }))
    }))
  }))

  const randomIndex = Math.floor(Math.random() * questionPools.length)

  return {
    ...exam,
    questionPools: [newQuestionPools[randomIndex]]
  }
}

// Calculate number of correct answers in the exam, counting Multiple Choice and TextArea questions
export const calculateNumberOfCorrectAnswers = (questionPools: QuestionPool[], attempt: ExamAttempt) => {
  let correctAnswers: number = 0
  let totalQuestions: number = 0
  let totalPendingQuestions: number = 0

  questionPools.forEach((questionPool, questionPoolIndex) => {
    const totalQuestionPoolPendingQuestions = questionPool.questions.filter(question => question.answerType === AnswerType.MultipleChoice && !question.options?.some(option => option.isCorrectOption)).length
    totalPendingQuestions = totalPendingQuestions + totalQuestionPoolPendingQuestions
    questionPool.questions.forEach((question, questionIndex) => {
      const answers = (JSON.parse(attempt.results as string) as ExamAnswers).answers as ExamKeys
      const answer = answers[questionPoolIndex][questionIndex]
      totalQuestions++

      if (question.answerType === AnswerType.MultipleChoice) {
        const correctAnswer = question.options?.some((option, optionIndex) => option.isCorrectOption && alphabet[optionIndex] === answer)
        if (correctAnswer) {
          correctAnswers++
        }
      } else if (question.answerType === AnswerType.TextArea) {
        if (question.correction?.isCorrectAnswer) {
          correctAnswers++
        } else if (!question.correction?.manualCorrection) {
          console.log('PENDING TEXTAREA')
          totalPendingQuestions++
        }
      }
    }
    )
  })

  return { totalQuestions, correctAnswers, totalPendingQuestions }
}

export const manualTextCorrection = (questionPool: QuestionPool, questionIndex: number, isCorrectAnswer: boolean) => {
  // Deep clone the question pool
  const updatedQuestionPool: QuestionPool = JSON.parse(JSON.stringify(questionPool))
  updatedQuestionPool.questions[questionIndex].correction = {
    isCorrectAnswer,
    manualCorrection: true
  }

  return updatedQuestionPool
}

export const manualMultipleChoiceCorrection = (questionPool: QuestionPool, questionIndex: number, optionIndex: number) => ({
  ...questionPool,
  questions: questionPool.questions.map((question: Question, _questionIndex: number) => {
    if (_questionIndex === questionIndex) {
      return {
        ...question,
        options: question?.options?.map((option: Options, _optionIndex: number) => {
          return ({
            ...option,
            isCorrectOption: _optionIndex === optionIndex
          })
        }),

        correction: {
          ...question.correction,
          manualCorrection: true
        }
      }
    }

    return question
  })
})

export const groupExamAttemptsByName = (examAttempts: ExamAttempt[]) => {
  const sortedByName = examAttempts.sort((a, b) => a.examName.localeCompare(b.examName))
  const examAttemptsByName: { [key: string]: ExamAttempt[] } = {}
  sortedByName.forEach(attempt => {
    const { examName } = attempt
    if (!examAttemptsByName[examName]) {
      examAttemptsByName[examName] = []
    }

    examAttemptsByName[examName].push(attempt)
  })

  return examAttemptsByName
}

export const applyNameFilter = (examAttempts: ExamAttempt[], nameFilter: string) => {
  console.log('applyNameFilter', nameFilter)
  if (nameFilter === ExamAttemptFilter.ALL || nameFilter === '') {
    return examAttempts
  }

  return examAttempts.filter(examAttempt => examAttempt.examName === nameFilter)
}

export const applyStatusFilter = (examAttempts: ExamAttempt[], status: ExamAttemptFilter) => {
  return examAttempts.filter(examAttempt => {
    switch (status) {
      case ExamAttemptFilter.COMPLETED:
        return examAttempt.isCompleted
      case ExamAttemptFilter.NOT_COMPLETED:
        return !examAttempt.isCompleted
      case ExamAttemptFilter.NOT_CORRECTED:
        return !examAttempt.correctedBy && examAttempt.isCompleted
      default:
        return true
    }
  })
}

export const applyStudentFilter = (examAttempts: ExamAttempt[], studentFilter: string) => {
  return examAttempts.filter(examAttempt => examAttempt.userName?.toLowerCase().trim().includes(studentFilter.toLowerCase().trim()))
}

export const isPendingCorrectionInQuestionPool = (questionPool: QuestionPool) => {
  let color: BadgeColors | undefined
  let text: TranslationsDictionary

  const isAllAutomaticCorrection = questionPool.questions.every(question => {
    return question.options?.some(option => option.isCorrectOption)
  })

  const isPendingCorrectionInQuestionPool = questionPool.questions.some(question => {
    if (question.answerType === AnswerType.MultipleChoice) {
      return !question.options?.some(option => option.isCorrectOption)
    } else {
      return !question.correction?.manualCorrection
    }
  })

  if (isAllAutomaticCorrection) {
    color = BadgeColors.GREEN
    text = 'WITH_SELF_CORRECTION'
  } else if (isPendingCorrectionInQuestionPool) {
    color = BadgeColors.RED
    text = 'WITH_OUT_SELF_CORRECTION'
  } else {
    text = 'MANUAL_CORRECTION'
    color = BadgeColors.ORANGE
  }

  return { isAllAutomaticCorrection, isPendingCorrectionInQuestionPool, color, text }
}
