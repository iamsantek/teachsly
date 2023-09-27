import dayjs from "dayjs";
import {
  Course,
  Exam,
  ExamAttempt,
  ExamType,
  GetExamQuery,
  TimeGranularity,
} from "../API";
import { defaultExamTimerOptions } from "../constants/Exams";
import { TranslationsDictionary } from "../dictionaries/dictionary";
import {
  AnswerType,
  ExamAnswers,
  ExamAttemptFilter,
  ExamFilter,
  ExamForm,
  ExamKeys,
  Options,
  Question,
  QuestionPool,
  TimerType,
} from "../interfaces/Exams";
import { MultiSelectOption } from "../interfaces/MultiSelectOption";
import { BadgeColors } from "../views/exams/exampAttempt/CorrectionBadge";
import { transformGroups } from "./CourseUtils";
import { translate } from "./LanguageUtils";
import { isNotAllowedWebsite, removeDiacritics } from "./StringUtils";

export const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Check that any of questions and options inside the questions pools in Exam Form are empty
export const runFieldsValidations = (
  examForm: ExamForm
): TranslationsDictionary[] => {
  const errors: TranslationsDictionary[] = [];
  const { questionPools } = examForm;

  const isTotalScoreEqualTo100 = isScoreComplete(questionPools);

  if (!isTotalScoreEqualTo100) {
    errors.push("SCORE_NOT_EQUAL_TO_100");
  }

  questionPools.forEach((pool) => {
    const isEmptyExplanation = pool.exerciseExplanation.length === 0;
    if (isEmptyExplanation) {
      errors.push("EMPTY_EXERCISE_EXPLANATION");
    }

    const notAllowedLinks = [
      isNotAllowedWebsite(pool.exerciseDescription),
      isNotAllowedWebsite(pool.exerciseExplanation),
    ].some(Boolean);

    if (notAllowedLinks) {
      errors.push("DRIVE_LINK_NOT_ALLOWED");
    }

    pool.questions.forEach((question) => {
      // Disable because we allow empty questions if the exercise is explained in the exercise explanation
      // if (question.question.length === 0) {
      //   errors.push("EMPTY_QUESTION");
      // }

      const isEmptyOptions = question.options?.some(
        (option) => option.label === ""
      );

      if (isEmptyOptions) {
        errors.push("EMPTY_OPTION");
      }

      const notAllowedLinks = [
        isNotAllowedWebsite(question.question),
        isNotAllowedWebsite(question.description),
      ].some(Boolean);

      if (notAllowedLinks) {
        errors.push("DRIVE_LINK_NOT_ALLOWED");
      }
    });
  });

  // Return unique errors
  return [...new Set(errors)];
};

export const formatExamForm = (exam: ExamForm) => ({
  ...exam,
  groups: (exam.groups as MultiSelectOption[]).map(
    (group) => group.value
  ) as string[],
  startDate: new Date(exam.startDate).toISOString(),
  deadline: exam.deadline ? new Date(exam.deadline).toISOString() : undefined,
  questionPools: JSON.stringify(exam.questionPools),
  timer: {
    ...exam.timer,
    type: (exam.timer.type as unknown as MultiSelectOption).value || "global",
  },
});

export const renderExamType = (timerType: TimerType) => {
  return (
    defaultExamTimerOptions.find((option) => option.value === timerType) ??
    defaultExamTimerOptions[0]
  );
};

// Function to transform API response to Exam Form
export const formatAPIResponse = (
  exam: GetExamQuery | undefined,
  courses: Course[]
): ExamForm | undefined => {
  if (!exam?.getExam) {
    return;
  }

  const examDetails = exam.getExam;
  return {
    ...exam?.getExam,
    groups: transformGroups(courses, exam?.getExam?.groups as string[]),
    questionPools: JSON.parse(examDetails?.questionPools as unknown as string),
    deadline: examDetails.deadline
      ? dayjs(examDetails?.deadline).format("YYYY-MM-DDTHH:mm")
      : undefined,
    startDate: dayjs(examDetails.startDate).format("YYYY-MM-DDTHH:mm"),
    timer: {
      type: renderExamType(examDetails?.timer?.type as TimerType),
      timeInSeconds: examDetails?.timer?.timeInSeconds as number,
      timeGranularity:
        examDetails?.timer?.timeGranularity || TimeGranularity.HOURS,
    },
    settings: {
      allowRetake: examDetails?.settings?.allowRetake ?? false,
    },
    type: (examDetails?.type as ExamType) || ExamType.EXAM,
  };
};

export const calculateExamDurationInMinutes = (exam: ExamForm): number => {
  if (!exam) {
    return 0;
  }

  const { timer } = exam;

  if (timer.type === "global") {
    if (timer.timeGranularity === TimeGranularity.MINUTES) {
      return timer.timeInSeconds;
    }

    return timer.timeInSeconds * 60;
  } else {
    // Calculate total number of question in all question pools and sum them
    const totalQuestions = (
      JSON.parse(exam.questionPools as unknown as string) as QuestionPool[]
    ).reduce((acc, pool) => acc + pool.questions.length, 0);

    if (timer.timeGranularity === TimeGranularity.MINUTES) {
      return timer.timeInSeconds * totalQuestions;
    }

    return timer.timeInSeconds * totalQuestions * 60;
  }
};

// Function to eliminate the isCorrect property from the options field in questions in the Exam Form
export const formatExamFormForAPI = (exam: ExamForm): ExamForm => {
  const { questionPools } = exam;
  const newQuestionPools = questionPools.map((pool) => ({
    ...pool,
    questions: pool.questions.map((question) => ({
      ...question,
      options: question.options?.map((option) => ({
        ...option,
        isCorrectOption: undefined,
      })),
    })),
  }));

  const randomIndex = Math.floor(Math.random() * questionPools.length);

  return {
    ...exam,
    questionPools: [newQuestionPools[randomIndex]],
  };
};

export const calculateMultipleChoiceQuestionScore = (
  question: Question,
  answers: ExamKeys,
  questionPoolIndex: number,
  questionIndex: number
) => {
  let totalQuestions = 0;
  let correctAnswers = 0;
  const answer = answers[questionPoolIndex][questionIndex];
  const correctAnswer = question.options?.some(
    (option, optionIndex) =>
      option.isCorrectOption && alphabet[optionIndex] === answer
  );

  totalQuestions++;

  if (correctAnswer) {
    correctAnswers++;
  }

  return { correctAnswers, totalQuestions };
};

export const calculateQuestionPoolCorrectAnswers = (
  question: Question,
  answer: string | { [key: string]: string } | undefined
) => {
  let totalQuestions = 0;
  let correctAnswers = 0;
  let totalPendingQuestions = 0;

  if (question.answerType === AnswerType.MultipleChoice) {
    totalQuestions++;
    const correctAnswer = question.options?.some(
      (option, optionIndex) =>
        option.isCorrectOption && alphabet[optionIndex] === (answer as string)
    );
    if (correctAnswer) {
      correctAnswers++;
    }
  } else if (
    [AnswerType.TextArea, AnswerType.Audio].includes(question.answerType)
  ) {
    totalQuestions++;
    if (question.correction?.isCorrectAnswer) {
      correctAnswers++;
    } else if (!question.correction?.manualCorrection) {
      totalPendingQuestions++;
    }
  } else if (question.answerType === AnswerType.Blocks) {
    const correctAnswersValues = Object.values(
      question.blocks?.correctAnswers ?? []
    );

    totalQuestions = totalQuestions + correctAnswersValues.length;
    const currentAnswers = Object.values(answer as { [key: string]: string });

    correctAnswersValues.forEach((correctAnswer, index) => {
      if (correctAnswer === currentAnswers[index]) {
        correctAnswers++;
      }
    });
  }

  return { correctAnswers, totalQuestions, totalPendingQuestions };
};

// Calculate number of correct answers in the exam, counting Multiple Choice and TextArea questions
export const calculateNumberOfCorrectAnswers = (
  questionPools: QuestionPool[],
  attempt: ExamAttempt
) => {
  let correctAnswers: number = 0;
  let totalQuestions: number = 0;
  let totalPendingQuestions: number = 0;

  questionPools.forEach((questionPool, questionPoolIndex) => {
    const totalQuestionPoolPendingQuestions = questionPool.questions.filter(
      (question) =>
        question.answerType === AnswerType.MultipleChoice &&
        !question.options?.some((option) => option.isCorrectOption)
    ).length;
    totalPendingQuestions =
      totalPendingQuestions + totalQuestionPoolPendingQuestions;
    questionPool.questions.forEach((question, questionIndex) => {
      const answers = (JSON.parse(attempt.results as string) as ExamAnswers)
        .answers as ExamKeys;
      const answer =
        answers[questionPoolIndex] && answers[questionPoolIndex][questionIndex];

      if (question.answerType === AnswerType.MultipleChoice) {
        totalQuestions++;
        const correctAnswer = question.options?.some(
          (option, optionIndex) =>
            option.isCorrectOption && alphabet[optionIndex] === answer
        );
        if (correctAnswer) {
          correctAnswers++;
        }
      } else if (
        [AnswerType.TextArea, AnswerType.Audio].includes(question.answerType)
      ) {
        totalQuestions++;
        if (question.correction?.isCorrectAnswer) {
          correctAnswers++;
        } else if (!question.correction?.manualCorrection) {
          totalPendingQuestions++;
        }
      } else if (question.answerType === AnswerType.Blocks) {
        const correctAnswersValues = Object.values(
          question.blocks?.correctAnswers ?? []
        );

        const pendingBlocks = correctAnswersValues.filter(
          (answer) => answer === ""
        ).length;

        totalPendingQuestions = totalPendingQuestions + pendingBlocks;

        totalQuestions = totalQuestions + correctAnswersValues.length;
        const currentAnswers = Object.values(answer);

        correctAnswersValues.forEach((correctAnswer, index) => {
          if (correctAnswer === currentAnswers[index]) {
            correctAnswers++;
          }
        });
      }
    });
  });

  return { totalQuestions, correctAnswers, totalPendingQuestions };
};

export const calculateRecommendedScore = (questionPools: QuestionPool[]) => {
  return questionPools.reduce((acc, pool) => {
    return (
      acc +
      pool.questions.reduce((acc, question) => {
        const teacherScore = Number(question?.correction?.teacherScore) ?? 0;
        return (
          acc +
          (isNaN(teacherScore)
            ? 0
            : Number(question?.correction?.teacherScore) ?? 0)
        );
      }, 0)
    );
  }, 0);
};

export const scoreGreaterThanPermittedChecker = (
  questionPools: QuestionPool[]
) => {
  return questionPools.some((pool) => {
    return pool.questions.some((question) => {
      if (!question.score) {
        return false;
      }

      const teacherScore = Number(question?.correction?.teacherScore) ?? 0;
      return teacherScore > Number(question.score ?? 0);
    });
  });
};

export const onResetCorrection = (
  questionPool: QuestionPool,
  questionIndex: number,
  defaultAnswer: string
) => {
  const question = questionPool.questions[questionIndex];
  const newQuestion = {
    ...question,
    correction: {
      ...question.correction,
      markDownCorrection: defaultAnswer,
    },
  };
  const newQuestionPool = {
    ...questionPool,
    questions: [
      ...questionPool.questions.slice(0, questionIndex),
      newQuestion,

      ...questionPool.questions.slice(questionIndex + 1),
    ],
  };
  return newQuestionPool;
};

export const onUpdateTeacherScore = (
  questionPool: QuestionPool,
  questionIndex: number,
  teacherScore: number
) => {
  const question = questionPool.questions[questionIndex];
  const updatedQuestion: Question = {
    ...question,
    correction: {
      ...question.correction,
      teacherScore,
    },
  };

  const newQuestionPool = {
    ...questionPool,
    questions: [
      ...questionPool.questions.slice(0, questionIndex),
      updatedQuestion,

      ...questionPool.questions.slice(questionIndex + 1),
    ],
  };

  return newQuestionPool;
};

export const manualTextCorrection = (
  questionPool: QuestionPool,
  questionIndex: number,
  isCorrectAnswer: boolean,
  markDownCorrection: string
) => {
  // Deep clone the question pool
  const updatedQuestionPool: QuestionPool = JSON.parse(
    JSON.stringify(questionPool)
  );

  updatedQuestionPool.questions[questionIndex].correction = {
    markDownCorrection: markDownCorrection,
    isCorrectAnswer,
    manualCorrection: true,
    teacherScore: isCorrectAnswer
      ? updatedQuestionPool.questions[questionIndex].score
      : 0,
  };

  return updatedQuestionPool;
};

export const manualMultipleChoiceCorrection = (
  questionPool: QuestionPool,
  questionIndex: number,
  teacherCorrectAnswer: number,
  studentAnswer: string
) => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let thereIsCorrectionAnswer = false;
  return {
    ...questionPool,
    questions: questionPool.questions.map(
      (question: Question, _questionIndex: number) => {
        if (_questionIndex === questionIndex) {
          return {
            ...question,
            options: question?.options?.map(
              (option: Options, _optionIndex: number) => {
                const isCorrectOption = _optionIndex === teacherCorrectAnswer;

                if (isCorrectOption) {
                  thereIsCorrectionAnswer = true;
                }

                return {
                  ...option,
                  isCorrectOption,
                };
              }
            ),

            correction: {
              ...question.correction,
              manualCorrection: true,
              teacherScore:
                thereIsCorrectionAnswer &&
                alphabet[teacherCorrectAnswer] === studentAnswer
                  ? question.score
                  : 0,
            },
          };
        }

        return question;
      }
    ),
  };
};

export const groupExamAttemptsByName = (examAttempts: ExamAttempt[]) => {
  const sortedByName = examAttempts.sort((a, b) =>
    a.examName.localeCompare(b.examName)
  );
  const examAttemptsByName: { [key: string]: ExamAttempt[] } = {};
  sortedByName.forEach((attempt) => {
    const { examName } = attempt;
    if (!examAttemptsByName[examName]) {
      examAttemptsByName[examName] = [];
    }

    examAttemptsByName[examName].push(attempt);
  });

  return examAttemptsByName;
};

export const applyNameFilter = (
  examAttempts: ExamAttempt[],
  nameFilter: string
) => {
  if (nameFilter === ExamAttemptFilter.ALL || nameFilter === "") {
    return examAttempts;
  }

  return examAttempts.filter(
    (examAttempt) => examAttempt.examName === nameFilter
  );
};

export const applyExamAttemptStatusFilter = (
  examAttempts: ExamAttempt[],
  status: ExamAttemptFilter
) => {
  return examAttempts.filter((examAttempt) => {
    switch (status) {
      case ExamAttemptFilter.COMPLETED:
        return examAttempt.isCompleted;
      case ExamAttemptFilter.NOT_COMPLETED:
        return !examAttempt.isCompleted;
      case ExamAttemptFilter.NOT_CORRECTED:
        return !examAttempt.correctedBy && examAttempt.isCompleted;
      default:
        return true;
    }
  });
};

export const applyExamStatusFilter = (
  exams: Exam[],
  examAttempts: ExamAttempt[],
  status: ExamFilter
) => {
  return exams.filter((exam) => {
    switch (status) {
      case ExamFilter.OUTDATED:
        return exam.deadline ? dayjs().isAfter(dayjs(exam.deadline)) : false;
      case ExamFilter.CORRECTED:
        return examAttempts.some(
          (attempt) => attempt.examId === exam.id && attempt.correctedBy
        );
      case ExamFilter.PENDING_CORRECTION:
        return examAttempts.some(
          (attempt) => attempt.examId === exam.id && !attempt.correctedBy
        );
      case ExamFilter.PENDING:
        return (
          dayjs().isAfter(exam?.startDate) &&
          (examAttempts.find((attempt) => attempt.examId === exam.id) ===
            undefined ||
            examAttempts.some(
              (attempt) => attempt.examId === exam.id && !attempt.isCompleted
            ))
        );
      default:
        return true;
    }
  });
};

export const applyCourseFilter = (exams: Exam[], courseFilter: string) => {
  if (courseFilter === ExamFilter.ALL || courseFilter === "") {
    return exams;
  }

  return exams.filter((exam) => exam.groups.includes(courseFilter));
};

export const applyStudentFilter = (
  examAttempts: ExamAttempt[],
  studentFilter: string
) => {
  const normalizedStudentFilter = removeDiacritics(
    studentFilter.toLowerCase().trim()
  );
  return examAttempts.filter((examAttempt) =>
    removeDiacritics(
      examAttempt.userName?.toLowerCase().trim() as string
    ).includes(normalizedStudentFilter)
  );
};

export const isPendingCorrectionInQuestionPool = (
  questionPool: QuestionPool,
  questionPoolAnswers: { [key: string]: string }
) => {
  let color: BadgeColors | undefined;
  let text: TranslationsDictionary;

  const isAllAutomaticCorrection = questionPool.questions.every(
    (question, questionIndex) => {
      switch (question.answerType) {
        case AnswerType.MultipleChoice:
          return question.options?.some((option) => option.isCorrectOption);
        case AnswerType.Blocks:
          const totalAnswers = question.blocks?.correctAnswers?.length || 0;
          const totalAnsweredQuestions =
            Object.values(questionPoolAnswers[questionIndex]).length || 0;

          return totalAnswers === totalAnsweredQuestions;
        default:
          return false;
      }
    }
  );

  const isPendingCorrectionInQuestionPool = questionPool.questions.some(
    (question, questionIndex) => {
      if (question.answerType === AnswerType.MultipleChoice) {
        return !question.options?.some((option) => option.isCorrectOption);
      } else if (question.answerType === AnswerType.Blocks) {
        const totalAnswers = question.blocks?.correctAnswers?.length || 0;
        const totalAnsweredQuestions =
          Object.values(questionPoolAnswers[questionIndex]).length || 0;

        return totalAnswers !== totalAnsweredQuestions;
      } else {
        return !question.correction?.manualCorrection;
      }
    }
  );

  if (isAllAutomaticCorrection) {
    color = BadgeColors.GREEN;
    text = "WITH_SELF_CORRECTION";
  } else if (isPendingCorrectionInQuestionPool) {
    color = BadgeColors.RED;
    text = "WITH_OUT_SELF_CORRECTION";
  } else {
    text = "MANUAL_CORRECTION";
    color = BadgeColors.ORANGE;
  }

  return {
    isAllAutomaticCorrection,
    isPendingCorrectionInQuestionPool,
    color,
    text,
  };
};

export const getExamStatus = (exam: Exam, examAttempts: ExamAttempt[]) => {
  const examAttempt = examAttempts.find(
    (examAttempt) => examAttempt.examId === exam.id
  );
  const isCompleted = examAttempt?.isCompleted;
  const isCorrected = !!examAttempt?.correctedBy;

  return { isCompleted, isCorrected, examAttempt };
};

export const getExamLink = (
  exam: Exam,
  examAttempts: ExamAttempt[],
  isAdmin: boolean | undefined
) => {
  const { isCompleted, isCorrected, examAttempt } = getExamStatus(
    exam,
    examAttempts
  );

  if (isAdmin) {
    if (exam.type === ExamType.HOMEWORK) {
      return `/homework/${exam.id}`;
    }

    return `/exams/${exam.id}`;
  }

  if (isCompleted && !isCorrected) {
    return "#";
  } else if (isCorrected) {
    return exam.type === ExamType.HOMEWORK
      ? `/homework/results/${examAttempt?.id}`
      : `/exams/results/${examAttempt?.id}`;
  } else {
    return exam.type === ExamType.HOMEWORK
      ? `/homework/${exam.id}/intro`
      : `/exams/${exam.id}/intro`;
  }
};

export const filterExamsByTypeAndCognitoId = (
  type: ExamType,
  cognitoId: string
) =>
  type === ExamType.HOMEWORK
    ? {
        and: [
          { userId: { eq: cognitoId } },
          { type: { eq: ExamType.HOMEWORK } },
        ],
      }
    : {
        and: [
          { userId: { eq: cognitoId } },
          { type: { ne: ExamType.HOMEWORK } },
        ],
      };

export const filterExamsByType = (type: ExamType) =>
  type === ExamType.HOMEWORK
    ? { type: { eq: ExamType.HOMEWORK } }
    : { type: { ne: ExamType.HOMEWORK } };

export const getBadgeWithExamAttempt = (
  exam: Exam,
  examAttempt: ExamAttempt
) => {
  const badgeText = dayjs().isBefore(exam.startDate)
    ? `${translate("COMING_SOON")} ${dayjs(exam.deadline).format(
        "DD/MM HH:mm"
      )}hs`
    : translate(
        examAttempt?.correctedBy
          ? "CORRECTED"
          : examAttempt?.isCompleted
          ? "COMPLETED"
          : dayjs().isAfter(exam.deadline)
          ? "OUT_OF_DEADLINE"
          : "NOT_COMPLETED"
      );
  const badgeColor = dayjs().isBefore(exam.startDate)
    ? "green"
    : examAttempt?.correctedBy
    ? "green"
    : examAttempt?.isCompleted
    ? "blue"
    : "red";

  return { badgeText, badgeColor };
};

export const getMarkColor = (text: string) => {
  const {
    asteriskWords,
    doubleAsteriskWords,
    dashWords,
    slashWords,
    plusWords,
  } = generateCorrectionMatches(text);

  if (asteriskWords.includes(text)) {
    return { color: "purple.500" };
  } else if (doubleAsteriskWords.includes(text)) {
    return { color: "blue.500" };
  } else if (dashWords.includes(text)) {
    return { color: "pink.500" };
  } else if (slashWords.includes(text)) {
    return { color: "orange.500" };
  } else if (plusWords.includes(text)) {
    return { color: "blackAlpha.500" };
  } else {
    return { color: "blackAlpha.500" };
  }
};

export const generateCorrectionMatches = (markDownText?: string) => {
  const asteriskWords = markDownText?.match(/\*(.*?)\*/g) || [];
  const doubleAsteriskWords = markDownText?.match(/#(.*?)#/g) || [];
  const dashWords = markDownText?.match(/-([^-]+)-/g) || [];
  const slashWords = markDownText?.match(/\/([^/]+)\//g) || [];
  const plusWords = markDownText?.match(/\+([^+]+)\+/g) || [];

  return {
    matches: [
      ...asteriskWords,
      ...doubleAsteriskWords,
      ...dashWords,
      ...slashWords,
      ...plusWords,
    ],
    asteriskWords,
    doubleAsteriskWords,
    dashWords,
    plusWords,
    slashWords,
  };
};

export const blocksRegExp = /\[(.*?)\]/g;

export const questionPoolTotalScore = (questionPool: QuestionPool): number =>
  questionPool.questions.reduce(
    (totalScore, question) => Number(totalScore) + Number(question.score ?? 0),
    0
  );

export const totalExamScoreAssigned = (questionPools: QuestionPool[]): number =>
  questionPools.reduce(
    (totalScore, questionPool) =>
      totalScore + questionPoolTotalScore(questionPool),
    0
  );

export const isScoreComplete = (questionPools: QuestionPool[]): boolean => {
  const allScores = questionPools.reduce(
    (totalScore, questionPool) =>
      totalScore + questionPoolTotalScore(questionPool),
    0
  );

  return allScores === 100;
};
