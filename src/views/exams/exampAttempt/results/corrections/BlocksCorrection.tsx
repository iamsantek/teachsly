import { useCallback, useEffect, useState } from "react";
import {
  ExamCorrection,
  ExamForm,
  Question,
} from "../../../../../interfaces/Exams";
import { renderToString } from "react-dom/server";
import { UseFieldArrayUpdate, useFormContext } from "react-hook-form";
import { blocksRegExp } from "../../../../../utils/ExamUtils";

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
  const output =
    text.replace(blocksRegExp, (match) => {
      const noSelfCorrection = match === "[]";

      const isAnswer = !!answers[index];
      index++;

      if (noSelfCorrection) {
      }

      const answer = answers && answers[index] ? answers[index] : "";

      const correctAnswer =
        correctAnswers && correctAnswers[index]
          ? correctAnswers[index]
          : undefined;

      const isCorrectAnswer =
        removeSpaces(answer) === removeSpaces(correctAnswer);

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

  return output;
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

  const handleChange = useCallback(
    (index: number, value: string) => {
      const updatedQuestionPool = JSON.parse(JSON.stringify(questionPool));
      updatedQuestionPool.questions[questionIndex].blocks.correctAnswers[
        index
      ] = value;
      updatedQuestionPool.questions[questionIndex] = {
        ...updatedQuestionPool.questions[questionIndex],
        correction: {
          manualCorrection: true,
        },
      };
      updateFn && updateFn(questionPoolIndex, updatedQuestionPool);
    },
    [questionIndex, questionPoolIndex, updateFn, questionPool]
  );

  const onResetCorrection = useCallback(
    (index: number) => {
      const updatedQuestionPool = JSON.parse(JSON.stringify(questionPool));

      updatedQuestionPool.questions[questionIndex].correction = undefined;
      updatedQuestionPool.questions[questionIndex].blocks.correctAnswers[
        index
      ] = "";

      updateFn && updateFn(questionPoolIndex, updatedQuestionPool);
    },
    [questionIndex, questionPoolIndex, updateFn, questionPool]
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
          handleChange(index, event.target?.value);
        }, 700);
      });
    });
  }, [handleChange, isReadOnly, onResetCorrection]);

  useEffect(() => {
    const matches = Array.from(
      question.blocks?.blockText.match(blocksRegExp) ?? []
    );

    const emptyCorrectAnswersIndexes = matches.reduce(
      (acc, match, index) => (match === "[]" ? [...acc, index] : acc),
      [] as number[]
    );

    setEmptyCorrectAnswersIndexes(emptyCorrectAnswersIndexes);
  }, [question.blocks?.blockText]);

  const answers = generateBlockReplacements({
    text: question.blocks?.blockText ?? "",
    answers: answer,
    correctAnswers: question.blocks?.correctAnswers ?? [],
    isReadOnly,
    wasManualCorrected: question.correction?.manualCorrection,
    emptyCorrectAnswersIndexes,
  });

  useEffect(() => {
    const resetButtons2 = document.getElementsByClassName("reset-btn");

    Array.from(resetButtons2).forEach((button) => {
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

  return <pre dangerouslySetInnerHTML={{ __html: answers }} />;
};
