export interface AudioQuestion extends Question {
    source: string;
    maxPlays: number;
}

export interface VideoQuestion extends Question {
    source: string;
}

export type Results = {
    score: number;
    level: string;
    correctAnswers: number;
}

export interface AnswerKey {
    id: string;
    keys: {
        [key: string]: number;
    }
}

export type Answers = {
    [questionPoolIndex: number]: {
        [key: string]: string | undefined
    }
}

export type ContactFormInputs = {
    email: string,
    fullName: string,
    phoneNumber: string
    country: string,
};

export type PlacementSettings = {
    timer: Timer
    questionPools: QuestionPool[]
    results: Results,
    isLoading: boolean,
    currentScreen: CurrentScreen
    currentQuestionIndex: number
    currentQuestionPoolIndex: number
}

export type PlacementContext = {
    context: PlacementSettings;
    setContext: (context: PlacementSettings) => void;
}

export enum CurrentScreen {
    Intro,
    Questions,
    GoodBye
}

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

export interface Attachment {
    name: string
    path: string
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
    type: TimerType
    timeInSeconds: number
    timeGranularity?: TimeGranularity
}

export enum TimeGranularity {
    SECONDS = 'SECONDS',
    MINUTES = 'MINUTES',
    HOURS = 'HOURS',
  }

export interface ExamForm {
    id?: string;
    title: string
    groups: string[]
    questionPools: QuestionPool[]
    deadline: string
    timer: Timer
}

export type ExamConfiguration = Omit<ExamForm, 'questionPools'>
