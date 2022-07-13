import { AnswerType, ExamAttachments, ExamAttachmentType, ExamForm, QuestionPool, QuestionType } from '../interfaces/Exams'
import { translate } from '../utils/LanguageUtils'

export const defaultQuestionPool: QuestionPool = {
  id: '1',
  exerciseExplanation: '',
  exerciseDescription: '',
  attachments: [],
  questions: [{
    id: '1',
    question: '',
    description: '',
    answerType: AnswerType.MultipleChoice,
    questionType: QuestionType.TEXT,
    options: [{
      id: 'a',
      label: '',
      isCorrectOption: undefined
    }]
  }]
}

export const defaultAttachments: ExamAttachments = {
  [ExamAttachmentType.AUDIO]: undefined,
  [ExamAttachmentType.EXTRA_ATTACHMENT]: undefined
}

export const defaultExamForm: ExamForm = {
  title: '',
  groups: [],
  questionPools: [
    defaultQuestionPool
  ],
  timer: {
    type: 'global',
    timeInSeconds: 120
  },
  deadline: '',
  startDate: ''
}

export const defaultExamTimerOptions = [
  {
    label: translate('EXAM_GLOBAL_TIME'),
    value: 'global'
  },
  {
    label: translate('EXAM_QUESTION_TIME'),
    value: 'question'
  }
]
