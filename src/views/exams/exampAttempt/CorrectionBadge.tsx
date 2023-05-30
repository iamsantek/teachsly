import { Badge } from "@chakra-ui/react";
import { AnswerType, Question } from "../../../interfaces/Exams";
import { translate } from "../../../utils/LanguageUtils";
import { useMemo } from "react";

interface Props {
  question: Question;
  answers: string | { [key: string]: string } | undefined;
}

export enum BadgeColors {
  ORANGE = "orange",
  GREEN = "green",
  RED = "red",
}

export const CorrectionBadge = ({ question, answers }: Props) => {
  const withSelfCorrection = useMemo(() => {
    switch (question.answerType) {
      case AnswerType.MultipleChoice:
        return question.options?.some((option) => option.isCorrectOption);
      case AnswerType.Blocks:
        const totalAnswers = question.blocks?.correctAnswers?.filter(
          (answer) => answer
        ).length;

        const totalAnsweredQuestions = Object.values(
          answers as { [key: string]: string }
        ).length;

        return totalAnswers === totalAnsweredQuestions;
      default:
        return false;
    }
  }, [question.answerType, question.options, question.blocks, answers]);

  const badgeColor = () => {
    if (question.correction?.manualCorrection) {
      return BadgeColors.ORANGE;
    }

    if (withSelfCorrection) {
      return BadgeColors.GREEN;
    }

    return BadgeColors.RED;
  };

  return (
    <Badge
      p={1}
      colorScheme={badgeColor()}
      textAlign="center"
      alignContent="center"
      alignItems="center"
      justifyContent="center"
    >
      {translate(
        question.correction?.manualCorrection
          ? "MANUAL_CORRECTION"
          : withSelfCorrection
          ? "WITH_SELF_CORRECTION"
          : "WITH_OUT_SELF_CORRECTION"
      )}
    </Badge>
  );
};
