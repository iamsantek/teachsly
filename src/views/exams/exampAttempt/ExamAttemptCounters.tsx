import {
  Heading,
  Stack,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { ExamAttempt } from "../../../API";
import { QuestionPool } from "../../../interfaces/Exams";
import {
  calculateNumberOfCorrectAnswers,
  calculateRecommendedScore,
} from "../../../utils/ExamUtils";
import { translate } from "../../../utils/LanguageUtils";
import { useEffect, useMemo } from "react";

interface Props {
  questionPools: QuestionPool[];
  attempt: ExamAttempt;
}

export const ExamAttemptCounters = ({ attempt }: Props) => {
  const { setValue, watch } = useFormContext();
  const questionPools = watch("questionPools");

  const { totalPendingQuestions, totalQuestions, correctAnswers } =
    calculateNumberOfCorrectAnswers(questionPools, attempt);

  const recommendedScore = calculateRecommendedScore(questionPools);

  const recommendedFinalMark = (recommendedScore / 10).toFixed(2);

  useEffect(() => {
    if (totalPendingQuestions === 0) {
      setValue("score", recommendedFinalMark);
    }
  }, [recommendedFinalMark, totalPendingQuestions, setValue]);

  useEffect(() => {
    setValue("correctAnswers", correctAnswers);
    setValue("totalQuestions", totalQuestions);
    setValue("pendingAnswers", totalPendingQuestions);
  }, [correctAnswers, totalQuestions, setValue, totalPendingQuestions]);
  return (
    <Stack spacing={5}>
      <Heading size="lg">{translate("CORRECTION")}</Heading>
      <StatGroup>
        <Stat>
          <StatLabel fontWeight="bold">{translate("RIGHT_ANSWERS")}</StatLabel>
          <StatNumber fontSize="5xl">{recommendedScore}/100</StatNumber>
        </Stat>

        <Stat>
          <StatLabel fontWeight="bold">
            {translate("WITH_OUT_CORRECTION")}
          </StatLabel>
          <StatNumber
            fontSize="5xl"
            color={totalPendingQuestions === 0 ? "green.500" : "orange.500"}
          >
            {totalPendingQuestions}
          </StatNumber>
        </Stat>

        <Stat>
          <StatLabel fontWeight="bold">
            {translate("RECOMMENDED_MARK")}
          </StatLabel>
          <StatNumber fontSize="5xl">
            {totalPendingQuestions === 0 ? recommendedFinalMark : "??"}
          </StatNumber>
          {totalPendingQuestions !== 0 && (
            <StatHelpText>
              {translate("PENDING_CORRECTION_WARNING")}
            </StatHelpText>
          )}
        </Stat>
      </StatGroup>
    </Stack>
  );
};
