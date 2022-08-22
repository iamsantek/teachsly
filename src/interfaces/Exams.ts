import { MultiSelectOption } from './MultiSelectOption'
import { ExamType, TimeGranularity } from '../API'

export interface Options {
  id: string
  label: string
  isCorrectOption: boolean | undefined
}

export enum AnswerType {
  MultipleChoice,
  TextArea,
  Blocks
}

export enum QuestionType {
  TEXT,
  AUDIO
}

export interface QuestionCorrection {
  manualCorrection: boolean | undefined
  isCorrectAnswer?: boolean | undefined
  markDownCorrection?: string
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
  correction?: QuestionCorrection
}

export enum ExamAttachmentType {
  EXTRA_ATTACHMENT = 'attachedFile',
  AUDIO = 'source'
}

export interface ExamAttachments {
  [ExamAttachmentType.AUDIO]: File | undefined;
  [ExamAttachmentType.EXTRA_ATTACHMENT]: File | undefined;
}

export interface BlocksQuestions extends Question {
  correctBlockSequence: string
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

export interface ExamCorrection {
  questionPools: QuestionPool[]
  teacherComment: string
  correctAnswers: number
  pendingAnswers: number
  totalQuestions: number
  correctedBy: string
  score: number
}

export type TimerType = 'question' | 'global'

export interface Timer {
  type: TimerType | MultiSelectOption
  timeGranularity: TimeGranularity
  timeInSeconds: number
}

export interface Attachment {
  name: string
  path: string
}

export interface ExamSettings {
  allowRetake: boolean
}

export interface ExamForm {
  id?: string
  title: string
  groups: MultiSelectOption[] | string[]
  questionPools: QuestionPool[]
  startDate: string
  deadline: string
  timer: Timer
  settings: ExamSettings
  type: ExamType
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
  NOT_COMPLETED = 'notCompleted',
  NOT_CORRECTED = 'notCorrected'
}

export enum ExamFilter {
  ALL = 'all',
  OUTDATED = 'outdated',
  PENDING_CORRECTION = 'pendingCorrection',
  CORRECTED = 'corrected',
  PENDING= 'pending'
}
