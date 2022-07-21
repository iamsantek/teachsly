import { MultiSelectOption } from './MultiSelectOption'

export interface Options {
  id: string
  label: string
  isCorrectOption: boolean | undefined
}

export enum AnswerType {
  MultipleChoice,
  TextArea
}

export enum QuestionType {
  TEXT,
  AUDIO
}

export interface Question {
  id: string
  question: string
  description: string
  options?: Options[]
  questionType: QuestionType
  answerType: AnswerType
  attachedFile?: string
  source?: string
}

export enum ExamAttachmentType {
  EXTRA_ATTACHMENT = 'attachedFile',
  AUDIO = 'source'
}

export interface ExamAttachments {
  [ExamAttachmentType.AUDIO]: File | undefined;
  [ExamAttachmentType.EXTRA_ATTACHMENT]: File | undefined;
}

export interface AudioQuestion extends Question {
  source: string;
  maxPlays: number;
}

export interface VideoQuestion extends Question {
  source: string;
}

export interface QuestionPool {
  id: string
  exerciseExplanation: string
  exerciseDescription: string;
  questions: Question[]
  attachments: Attachment[]
}

export type TimerType = 'question' | 'global'

export interface Timer {
  type: TimerType | MultiSelectOption
  timeInSeconds: number
}

export enum TimerGranularity {
  SECONDS,
  MINUTES,
  HOURS
}

export interface Attachment {
  name: string
  path: string
}

export interface ExamForm {
  id?: string
  title: string
  groups: MultiSelectOption[] | string[]
  questionPools: QuestionPool[]
  startDate: string
  deadline: string
  timer: Timer
}

export interface ExamAnswers {
  answers: ExamKeys
}

export interface ExamKeys {
  [key: number]: string
}

export enum ExamAttemptFilter {
  ALL = 'all',
  COMPLETED = 'completed',
  NOT_COMPLETED = 'notCompleted'
}
