export interface Options {
    id: string
    label: string
    isCorrectOption: boolean | undefined
  }

export interface Question {
    id: string
    question: string
    options: Options[]
  }

export interface QuestionPool {
    id: string
    questions: Question[]
  }

export interface ExamForm {
    title: string
    groups: string[]
    questionPools: QuestionPool[]
  }
