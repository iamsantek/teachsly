import dayjs from 'dayjs'
import { Course, GetExamQuery } from '../API'
import { defaultExamTimerOptions } from '../constants/Exams'
import { Attachment, ExamForm, TimerType } from '../interfaces/Exams'
import { MultiSelectOption } from '../interfaces/MultiSelectOption'
import { transformGroups } from './CourseUtils'

// Check that any of questions and options inside the questions pools in Exam Form are empty
export const existEmptyFields = (examForm: ExamForm): boolean => {
  const { questionPools } = examForm
  return questionPools.some(pool => {
    const isEmpty = pool.questions.some(question => {
      if (question.options?.length === 0 || question.question.length === 0) {
        return true
      }

      console.log(question)

      return question.options?.some(option => option.label === '')
    })
    return isEmpty
  })
}

export const formatExamForm = (exam: ExamForm) => ({
  ...exam,
  groups: (exam.groups as MultiSelectOption[]).map(group => group.value) as string[],
  startDate: new Date(exam.deadline).toISOString(),
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
    },
    attachments: exam?.getExam?.attachments as Attachment[]
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
