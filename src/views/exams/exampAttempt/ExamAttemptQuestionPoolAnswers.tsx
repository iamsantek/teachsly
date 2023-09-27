import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { UseFieldArrayUpdate, useFormContext } from "react-hook-form";
import {
  AnswerType,
  ExamCorrection,
  ExamForm,
  ExamKeys,
  QuestionPool,
} from "../../../interfaces/Exams";
import {
  alphabet,
  manualMultipleChoiceCorrection,
} from "../../../utils/ExamUtils";
import { generateRandomId } from "../../../utils/StringUtils";
import { CorrectionBadge } from "./CorrectionBadge";
import { SelectCorrectAnswer } from "./results/corrections/SelectCorrectAnswer";
import { TextMarkDownCorrection } from "./results/corrections/TextMarkDownCorrection";
import { BlocksCorrection } from "./results/corrections/BlocksCorrection";
import { TeacherScoreInput } from "./results/TeacherScoreInput";
import { AudioCorrection } from "./results/corrections/AudioCorrection";

interface Props {
  questionPool: QuestionPool;
  answers: ExamKeys | undefined;
  questionPoolIndex: number;
  updateFn: UseFieldArrayUpdate<ExamCorrection, "questionPools">;
}

export const ExamAttemptQuestionPoolAnswers = ({
  questionPoolIndex,
  answers,
  updateFn,
}: Props) => {
  const { watch } = useFormContext<ExamForm>();
  const questionPool = watch("questionPools")[questionPoolIndex];
  const [value, setValue] = useState<number | undefined>(undefined);

  const onMultipleChoiceManualCorrection = (
    questionPoolIndex: number,
    questionIndex: number,
    teacherAnswer: number,
    studentAnswer: string
  ) => {
    const updatedValues = manualMultipleChoiceCorrection(
      questionPool,
      questionIndex,
      teacherAnswer,
      studentAnswer
    );
    updateFn(questionPoolIndex, updatedValues);
  };

  return (
    <Stack spacing={5}>
      {questionPool.questions.map((question, questionIndex) => {
        const teacherScore = question.correction?.teacherScore;
        const score = question.score ?? 0;
        const { answerType } = question;
        const studentAnswer =
          answers &&
          (answers[questionIndex] as
            | string
            | { [key: string]: string }
            | undefined);
        const isSomeCorrectAnswer = question.options?.some(
          (option) => option.isCorrectOption
        );
        const id = generateRandomId();

        return (
          <Stack key={id} spacing={10}>
            <HStack>
              <Text>
                {questionIndex + 1}. {question.question}
              </Text>
              <CorrectionBadge
                question={question}
                answers={answers && answers[questionIndex]}
              />
            </HStack>
            {answerType === AnswerType.MultipleChoice && (
              <>
                {question.options?.map((option, optionIndex) => (
                  <Box key={option.id}>
                    <Text
                      fontWeight={option.isCorrectOption ? "bold" : "normal"}
                    >
                      {alphabet[optionIndex]}.{option.label}
                      {option.isCorrectOption &&
                      alphabet[optionIndex] === studentAnswer
                        ? " ✅"
                        : ""}
                      {isSomeCorrectAnswer &&
                        !option.isCorrectOption &&
                        alphabet[optionIndex].toLocaleLowerCase() ===
                          studentAnswer &&
                        " ❌"}
                    </Text>
                  </Box>
                ))}
                {(!isSomeCorrectAnswer ||
                  question.correction?.manualCorrection) && (
                  <>
                    <SelectCorrectAnswer
                      question={question}
                      questionIndex={questionIndex}
                      questionPoolIndex={questionPoolIndex}
                      value={value as number}
                      onChange={(teacherCorrectAnswer) => {
                        console.log(
                          "teacherCorrectAnswer",
                          teacherCorrectAnswer
                        );
                        setValue(teacherCorrectAnswer);
                        onMultipleChoiceManualCorrection(
                          questionPoolIndex,
                          questionIndex,
                          teacherCorrectAnswer,
                          studentAnswer as string
                        );
                      }}
                    />
                  </>
                )}
              </>
            )}
            {answerType === AnswerType.TextArea && (
              <Stack spacing={3}>
                <TextMarkDownCorrection
                  updateFn={updateFn}
                  questionPoolIndex={questionPoolIndex}
                  questionIndex={questionIndex}
                  answer={(studentAnswer as string) ?? ""}
                />
              </Stack>
            )}
            {answerType === AnswerType.Blocks && (
              <BlocksCorrection
                question={question}
                questionPoolIndex={questionPoolIndex}
                questionIndex={questionIndex}
                answer={(studentAnswer as { [key: string]: string }) ?? {}}
                updateFn={updateFn}
              />
            )}
            {answerType === AnswerType.Audio && (
              <AudioCorrection
                audioKey={studentAnswer as string}
                questionPoolIndex={questionPoolIndex}
                questionIndex={questionIndex}
                questionPool={questionPool}
                updateFn={updateFn}
              />
            )}
            {question.score && (
              <TeacherScoreInput
                questionPoolIndex={questionPoolIndex}
                questionIndex={questionIndex}
                questionPool={questionPool}
                updateFn={updateFn}
                score={score}
                teacherScore={teacherScore}
              />
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};
