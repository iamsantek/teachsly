import { Stack, Text } from "@chakra-ui/react";
import { AnswerType, ExamKeys, Question } from "../../../../interfaces/Exams";
import { alphabet } from "../../../../utils/ExamUtils";
import { translate } from "../../../../utils/LanguageUtils";
import { generateRandomId } from "../../../../utils/StringUtils";
import { MarkDownColorHelper } from "./corrections/MarkDownColorHelper";
import { TextMarkdownViewer } from "./corrections/TextMarkdownViewer";
import { generateBlockReplacements } from "./corrections/BlocksCorrection";
import { useCallback, useEffect, useState } from "react";
import StorageService from "../../../../services/aws/StorageService";

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
  const [audioUrl, setAudioUrl] = useState<string>("");

  const isSomeCorrectAnswer = question.options?.some(
    (option) => option.isCorrectOption
  );
  const answer = studentAnswers;

  const generateBlocks = useCallback(() => {
    const { rawHTML: text } = generateBlockReplacements({
      text: question.blocks?.blockText ?? "",
      answers: answer as { [key: string]: string },
      correctAnswers: (question.blocks?.correctAnswers as string[]) ?? [],
      isReadOnly: true,
    });

    setBlocksAnswers(text);
  }, [answer, question.blocks?.blockText, question.blocks?.correctAnswers]);

  const getAudioUrl = useCallback(async (audioKey: string) => {
    // Remove the public/ prefix
    const onlyKey = audioKey.split("/").slice(1).join("/");
    const audioUrlResponse = await StorageService.getSignedUrl(onlyKey);

    if (!audioUrlResponse) {
      return;
    }

    setAudioUrl(audioUrlResponse.url);
  }, []);

  useEffect(() => {
    if (question.answerType === AnswerType.Blocks) {
      generateBlocks();
    } else if (question.answerType === AnswerType.Audio) {
      getAudioUrl(answer as string);
    }
  }, [question, generateBlocks, getAudioUrl, answer]);

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
      {question.answerType === AnswerType.Audio && (
        <>
          {audioUrl && <audio controls src={audioUrl} />}
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
            </>
          )}
        </>
      )}
    </Stack>
  );
};
