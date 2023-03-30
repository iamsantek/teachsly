import { ExamType, TimeGranularity } from "../API";
import {
  AnswerType,
  ExamAttachments,
  ExamAttachmentType,
  ExamForm,
  QuestionPool,
  QuestionType,
} from "../interfaces/Exams";
import { translate } from "../utils/LanguageUtils";

export const defaultQuestionPool: QuestionPool = {
  id: "1",
  exerciseExplanation: "",
  exerciseDescription: "",
  attachments: [],
  questions: [],
};

export const defaultAttachments: ExamAttachments = {
  [ExamAttachmentType.AUDIO]: undefined,
  [ExamAttachmentType.EXTRA_ATTACHMENT]: undefined,
};

export const defaultExamForm: ExamForm = {
  title: "",
  groups: [],
  questionPools: [defaultQuestionPool],
  timer: {
    type: "global",
    timeInSeconds: 120,
    timeGranularity: TimeGranularity.MINUTES,
  },
  deadline: "",
  startDate: "",
  settings: {
    allowRetake: false,
  },
  type: ExamType.EXAM,
};

export const defaultHomeWorkForm: ExamForm = {
  ...defaultExamForm,
  type: ExamType.HOMEWORK,
};

export const defaultExamTimerOptions = [
  {
    label: translate("EXAM_GLOBAL_TIME"),
    value: "global",
  },
  {
    label: translate("EXAM_QUESTION_TIME"),
    value: "question",
  },
];
