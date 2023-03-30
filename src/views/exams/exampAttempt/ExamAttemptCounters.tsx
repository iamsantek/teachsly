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
import { calculateNumberOfCorrectAnswers } from "../../../utils/ExamUtils";
import { translate } from "../../../utils/LanguageUtils";
import { useEffect } from "react";

interface Props {
  questionPools: QuestionPool[];
  attempt: ExamAttempt;
}

export const ExamAttemptCounters = ({ questionPools, attempt }: Props) => {
  const { totalPendingQuestions, totalQuestions, correctAnswers } =
    calculateNumberOfCorrectAnswers(questionPools, attempt);
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("correctAnswers", correctAnswers);
    setValue("totalQuestions", totalQuestions);
    setValue("pendingAnswers", totalPendingQuestions);
  }, [correctAnswers, totalQuestions, setValue, totalPendingQuestions]);

  const percentage = (((correctAnswers / totalQuestions) * 100) / 10).toFixed(
    2
  );

  return (
    <Stack spacing={5}>
      <Heading size="lg">{translate("CORRECTION")}</Heading>
      <StatGroup>
        <Stat>
          <StatLabel fontWeight="bold">{translate("RIGHT_ANSWERS")}</StatLabel>
          <StatNumber fontSize="5xl">
            {correctAnswers}/{totalQuestions}
          </StatNumber>
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
            {totalPendingQuestions === 0 ? percentage : "??"}
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
