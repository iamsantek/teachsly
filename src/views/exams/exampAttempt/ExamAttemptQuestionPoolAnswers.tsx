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
    optionIndex: number
  ) => {
    const updatedValues = manualMultipleChoiceCorrection(
      questionPool,
      questionIndex,
      optionIndex
    );
    updateFn(questionPoolIndex, updatedValues);
  };

  return (
    <Stack spacing={5}>
      {questionPool.questions.map((question, questionIndex) => {
        const { answerType } = question;
        const answer = answers && answers[questionIndex];
        const isSomeCorrectAnswer = question.options?.some(
          (option) => option.isCorrectOption
        );
        const id = generateRandomId();

        return (
          <Stack key={id}>
            <HStack>
              <Text>
                {questionIndex + 1}. {question.question}
              </Text>
              <CorrectionBadge question={question} />
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
                      alphabet[optionIndex] === answer
                        ? " ✅"
                        : ""}
                      {isSomeCorrectAnswer &&
                        !option.isCorrectOption &&
                        alphabet[optionIndex].toLocaleLowerCase() === answer &&
                        " ❌"}
                    </Text>
                  </Box>
                ))}
                {(!isSomeCorrectAnswer || question.correction) && (
                  <>
                    <SelectCorrectAnswer
                      question={question}
                      questionIndex={questionIndex}
                      questionPoolIndex={questionPoolIndex}
                      value={value as number}
                      onChange={(newValue) => {
                        setValue(newValue);
                        onMultipleChoiceManualCorrection(
                          questionPoolIndex,
                          questionIndex,
                          newValue
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
                  answer={answer ?? ""}
                />
              </Stack>
            )}
          </Stack>
        );
      })}
    </Stack>
  );
};
