import { Stack, Text } from "@chakra-ui/react";
import { AnswerType, ExamKeys, Question } from "../../../../interfaces/Exams";
import { alphabet } from "../../../../utils/ExamUtils";
import { translate } from "../../../../utils/LanguageUtils";
import { generateRandomId } from "../../../../utils/StringUtils";
import { MarkDownColorHelper } from "./corrections/MarkDownColorHelper";
import { TextMarkdownViewer } from "./corrections/TextMarkdownViewer";
import { generateBlockReplacements } from "./corrections/BlocksCorrection";
import { useCallback, useEffect, useState } from "react";

interface Props {
  question: Question;
  studentAnswers: ExamKeys | undefined;
  questionIndex: number;
}

export const QuestionResult = ({
  question,
  studentAnswers,
  questionIndex,
}: Props) => {
  const [blockAnswers, setBlocksAnswers] = useState<string>("");

  const isSomeCorrectAnswer = question.options?.some(
    (option) => option.isCorrectOption
  );
  const answer = studentAnswers;

  const generateBlocks = useCallback(() => {
    const text = generateBlockReplacements({
      text: question.blocks?.blockText ?? "",
      answers: answer as { [key: string]: string },
      correctAnswers: (question.blocks?.correctAnswers as string[]) ?? [],
      isReadOnly: true,
    });

    setBlocksAnswers(text);
  }, [answer, question.blocks?.blockText, question.blocks?.correctAnswers]);

  useEffect(() => {
    if (question.answerType === AnswerType.Blocks) {
      generateBlocks();
    }
  }, [question, generateBlocks]);

  return (
    <Stack>
      <Text>
        {questionIndex + 1}) {question.question}
      </Text>
      {question.options?.map((option, optionIndex) => {
        const id = generateRandomId();
        return (
          <Text
            fontWeight={option.isCorrectOption ? "bold" : "normal"}
            key={id}
          >
            {alphabet[optionIndex].toUpperCase()}) {option.label}
            {option.isCorrectOption && alphabet[optionIndex] === answer
              ? " ✅"
              : ""}
            {isSomeCorrectAnswer &&
              !option.isCorrectOption &&
              alphabet[optionIndex].toLocaleLowerCase() === answer &&
              " ❌"}
          </Text>
        );
      })}
      {question.answerType === AnswerType.TextArea && (
        <Text textAlign="justify">
          <>
            {answer}
            <Text marginY={5}>
              {translate("CORRECT_ANSWER")}{" "}
              {question.correction?.isCorrectAnswer === true ? " ✅" : ""}{" "}
              {question.correction?.isCorrectAnswer === false ? " ❌" : ""}
            </Text>
            {question.correction?.markDownCorrection && (
              <>
                <Text fontWeight="bold" marginY={3}>
                  {translate("CORRECTION")}
                </Text>
                <TextMarkdownViewer
                  markdownText={question.correction?.markDownCorrection}
                />
                <MarkDownColorHelper showResetButton={false} />
              </>
            )}
          </>
        </Text>
      )}
      {question.answerType === AnswerType.Blocks && (
        <pre dangerouslySetInnerHTML={{ __html: blockAnswers }} />
      )}
    </Stack>
  );
};
