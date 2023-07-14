import { useCallback, useEffect, useState } from "react";
import {
  ExamCorrection,
  ExamForm,
  Question,
} from "../../../../../interfaces/Exams";
import { renderToString } from "react-dom/server";
import { UseFieldArrayUpdate, useFormContext } from "react-hook-form";
import {
  blocksRegExp,
  calculateQuestionPoolCorrectAnswers,
} from "../../../../../utils/ExamUtils";

interface Props {
  questionPoolIndex: number;
  questionIndex: number;
  answer: { [key: string]: string };
  question: Question;
  updateFn?: UseFieldArrayUpdate<ExamCorrection, "questionPools">;
  isReadOnly?: boolean;
}

const removeSpaces = (text?: string) =>
  text?.toLocaleLowerCase().replace(/\s/g, "");
const addSpaces = (text: string) => ` ${text} `;

export const generateBlockReplacements = ({
  text,
  answers,
  correctAnswers,
  isReadOnly,
  wasManualCorrected,
  emptyCorrectAnswersIndexes,
}: {
  text: string;
  answers: { [key: string]: string };
  correctAnswers: string[];
  isReadOnly?: boolean;
  wasManualCorrected?: boolean;
  emptyCorrectAnswersIndexes?: number[];
}) => {
  let index = -1;
  let totalBlanks = 0;
  let correctBlanks = 0;
  const rawHTML =
    text.replace(blocksRegExp, (match) => {
      const noSelfCorrection = match === "[]";

      const isAnswer = !!answers[index];
      index++;
      totalBlanks++;

      if (noSelfCorrection) {
      }

      const answer = answers && answers[index] ? answers[index] : "";

      const correctAnswer =
        correctAnswers && correctAnswers[index]
          ? correctAnswers[index]
          : undefined;

      const isCorrectAnswer =
        removeSpaces(answer) === removeSpaces(correctAnswer);

      if (isCorrectAnswer) {
        correctBlanks++;
      }

      return renderToString(
        <>
          <span
            style={{
              fontWeight: "bold",
              textDecoration: isCorrectAnswer ? "underline" : "line-through",
              color: isCorrectAnswer ? "green" : "red",
            }}
          >
            {addSpaces(answer)}
          </span>
          {!isCorrectAnswer && (!noSelfCorrection || isAnswer) && (
            <span style={{ color: "green" }}>
              {correctAnswer ? `(${correctAnswer})` : ""}
            </span>
          )}
          {wasManualCorrected && emptyCorrectAnswersIndexes?.includes(index) && (
            <span
              className="reset-btn"
              data-reset-index={index}
              style={{
                border: "1px solid #3394b3",
                padding: "3px",
                margin: "0 10px",
                cursor: "pointer",
                backgroundColor: "#71b9d8",
                color: "white",
                fontWeight: "bold",
                borderRadius: "3px",
                fontSize: "0.7rem",
                fontFamily: "Noto Sans",
              }}
              onClick={(e) => e.preventDefault()}
            >
              Reiniciar correción
            </span>
          )}
          {!isReadOnly && noSelfCorrection && correctAnswers[index] === "" && (
            <input
              placeholder="Respuesta correcta"
              type="text"
              key={index}
              data-index={index}
              style={{ margin: "0 10px" }}
            />
          )}
        </>
      );
    }) ?? "";

  return {
    rawHTML,
    totalBlanks,
    correctBlanks,
  };
};

export const BlocksCorrection = ({
  questionIndex,
  questionPoolIndex,
  answer,
  question,
  updateFn,
  isReadOnly = false,
}: Props) => {
  const [emptyCorrectAnswersIndexes, setEmptyCorrectAnswersIndexes] = useState<
    number[]
  >([]);

  const { watch } = useFormContext<ExamForm>();
  const questionPool = watch("questionPools")[questionPoolIndex];

  const onResetCorrection = useCallback(
    (index: number) => {
      const updatedQuestionPool = JSON.parse(JSON.stringify(questionPool));

      updatedQuestionPool.questions[questionIndex].correction = {
        manualCorrection: false,
        teacherScore: undefined,
      };
      updatedQuestionPool.questions[questionIndex].blocks.correctAnswers[
        index
      ] = "";

      updateFn && updateFn(questionPoolIndex, updatedQuestionPool);
    },
    [questionIndex, questionPoolIndex, updateFn, questionPool]
  );

  useEffect(() => {
    const matches = Array.from(
      question.blocks?.blockText.match(blocksRegExp) ?? []
    );

    const emptyCorrectAnswersIndexes = matches.reduce(
      (acc, match, index) => (match === "[]" ? [...acc, index] : acc),
      [] as number[]
    );

    setEmptyCorrectAnswersIndexes(emptyCorrectAnswersIndexes);
  }, [question]);

  const { rawHTML: answers } = generateBlockReplacements({
    text: question.blocks?.blockText ?? "",
    answers: answer,
    correctAnswers: question.blocks?.correctAnswers ?? [],
    isReadOnly,
    wasManualCorrected: question.correction?.manualCorrection,
    emptyCorrectAnswersIndexes,
  });

  const calculateFinaleScoreForBlocks = (
    question: Question,
    correctBlanks: number,
    totalBlanks: number
  ) => {
    const isAllCorrect = correctBlanks === totalBlanks;
    if (isAllCorrect) {
      return Number(question.score);
    }

    // question.score is the max score for the question
    // if the question is not all correct, we calculate the score based on the percentage of correct answers
    return Math.round((correctBlanks / totalBlanks) * Number(question.score));
  };

  const handleChange = useCallback(
    (index: number, teacherAnswer: string, studentAnswer: string) => {
      let finalScore = 0;

      const inputsRegExp = /<input[^>]*>/g;

      const isPendingCorrections =
        (answers.match(inputsRegExp)?.length ?? 0) > 1;

      const updatedQuestionPool = JSON.parse(JSON.stringify(questionPool));
      updatedQuestionPool.questions[questionIndex].blocks.correctAnswers[
        index
      ] = teacherAnswer;

      if (!isPendingCorrections) {
        const { correctAnswers, totalQuestions } =
          calculateQuestionPoolCorrectAnswers(
            updatedQuestionPool.questions[questionIndex],
            answer
          );

        finalScore = calculateFinaleScoreForBlocks(
          question,
          correctAnswers,
          totalQuestions
        );
      }

      updatedQuestionPool.questions[questionIndex] = {
        ...updatedQuestionPool.questions[questionIndex],
        correction: {
          manualCorrection: true,
          teacherScore: isPendingCorrections ? undefined : finalScore,
        },
      };
      updateFn && updateFn(questionPoolIndex, updatedQuestionPool);
    },
    [
      questionIndex,
      questionPoolIndex,
      updateFn,
      questionPool,
      answers,
      question,
      answer,
    ]
  );

  useEffect(() => {
    if (isReadOnly) {
      return;
    }

    const inputs = document.querySelectorAll("input[data-index]");
    let typingTimer: NodeJS.Timeout | undefined;
    inputs.forEach((input) => {
      // Get data-index attribute
      const index = Number(input.getAttribute("data-index")) ?? 0;
      input.addEventListener("input", (event: any) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          handleChange(index, event.target?.value, answer[index]);
        }, 700);
      });
    });
  }, [handleChange, isReadOnly, onResetCorrection, answer]);

  useEffect(() => {
    const resetButtons = document.getElementsByClassName("reset-btn");

    Array.from(resetButtons).forEach((button) => {
      button.addEventListener("click", (event: any) => {
        const index =
          Number(event.target?.getAttribute("data-reset-index")) ?? 0;

        onResetCorrection(index);
      });
    });
  }, [answers, onResetCorrection, question.correction?.manualCorrection]);

  if (!question.blocks) {
    return <></>;
  }

  return (
    <pre
      style={{
        textAlign: "justify",
        whiteSpace: "pre-wrap",
      }}
      dangerouslySetInnerHTML={{ __html: answers }}
    />
  );
};
