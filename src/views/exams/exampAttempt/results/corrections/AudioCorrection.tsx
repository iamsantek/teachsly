import { useCallback, useEffect, useState } from "react";
import StorageService from "../../../../../services/aws/StorageService";
import { IsCorrectAnswerRadio } from "./IsCorrectAnswerRadio";
import { ExamCorrection, QuestionPool } from "../../../../../interfaces/Exams";
import { UseFieldArrayUpdate } from "react-hook-form";
import { manualTextCorrection } from "../../../../../utils/ExamUtils";
import { Textarea, Text, Stack } from "@chakra-ui/react";
import { translate } from "../../../../../utils/LanguageUtils";

interface Props {
  audioKey: string;
  questionPool: QuestionPool;
  questionPoolIndex: number;
  questionIndex: number;
  updateFn: UseFieldArrayUpdate<ExamCorrection, "questionPools">;
}

export const AudioCorrection = ({
  audioKey,
  questionPool,
  questionIndex,
  questionPoolIndex,
  updateFn,
}: Props) => {
  const [audioUrl, setAudioUrl] = useState<string | undefined>(undefined);
  const [textCorrection, setTextCorrection] = useState<string>("");

  const getAudioUrl = useCallback(async () => {
    // Remove the public/ prefix
    const onlyKey = audioKey.split("/").slice(1).join("/");
    const audioUrlResponse = await StorageService.getSignedUrl(onlyKey);

    if (!audioUrlResponse) {
      return;
    }

    console.log(audioUrlResponse);
    setAudioUrl(audioUrlResponse.url);
  }, [audioKey]);

  useEffect(() => {
    getAudioUrl();
  }, [getAudioUrl]);

  const checkManualCorrection = (
    questionPool: QuestionPool,
    questionIndex: number
  ) => {
    if (
      questionPool.questions[questionIndex].correction?.isCorrectAnswer ===
      undefined
    ) {
      return undefined;
    }

    return questionPool.questions[questionIndex].correction?.isCorrectAnswer
      ? 1
      : 0;
  };

  const onTextManualCorrection = (
    questionPool: QuestionPool,
    questionIndex: number,
    value: boolean
  ) => {
    const updatedValues = manualTextCorrection(
      questionPool,
      questionIndex,
      value,
      textCorrection
    );
    updateFn(questionPoolIndex, updatedValues);
  };

  return (
    <Stack marginY={10}>
      <div>{audioUrl && <audio controls src={audioUrl} />}</div>

      <Text textStyle="title" marginY={3}>
        {translate("AUDIO_CORRECTION")}
      </Text>
      <Textarea
        marginY={5}
        value={textCorrection}
        onChange={(e) => setTextCorrection(e.target.value)}
      />

      <IsCorrectAnswerRadio
        value={checkManualCorrection(questionPool, questionIndex)}
        onChange={(newValue) => {
          onTextManualCorrection(
            questionPool,
            questionIndex,
            !!parseInt(newValue)
          );
        }}
      />
    </Stack>
  );
};
