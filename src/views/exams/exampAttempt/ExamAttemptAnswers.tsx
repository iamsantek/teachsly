import {
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Badge,
  HStack,
} from "@chakra-ui/react";
import { UseFieldArrayUpdate, useFormContext } from "react-hook-form";
import { ExamAttempt } from "../../../API";
import {
  ExamAnswers,
  ExamCorrection,
  QuestionPool,
} from "../../../interfaces/Exams";
import { isPendingCorrectionInQuestionPool } from "../../../utils/ExamUtils";
import { translate } from "../../../utils/LanguageUtils";
import { generateRandomId } from "../../../utils/StringUtils";
import { ExamAttemptQuestionPoolAnswers } from "./ExamAttemptQuestionPoolAnswers";

interface Props {
  attempt: ExamAttempt;
  updateFn: UseFieldArrayUpdate<ExamCorrection, "questionPools">;
}

export const ExamAttemptAnswers = ({ attempt, updateFn }: Props) => {
  const { watch } = useFormContext();
  const questionPools: QuestionPool[] = watch("questionPools");

  const allAnswers =
    (JSON.parse(attempt.results as string) as ExamAnswers | undefined)
      ?.answers ?? {};

  return (
    <Accordion allowMultiple>
      {questionPools.map((questionPool, questionPoolIndex) => {
        const questionPoolAnswers = allAnswers[questionPoolIndex];
        const id = generateRandomId();
        const { color: badgeColor, text: badgeText } =
          isPendingCorrectionInQuestionPool(
            questionPool,
            questionPoolAnswers as unknown as { [key: string]: string }
          );
        return (
          <AccordionItem key={id} boxShadow="md" marginY={5}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  <HStack>
                    <Text marginY={2} fontWeight="bold">
                      {translate("EXERCISE")} #{questionPoolIndex + 1}{" "}
                    </Text>
                    <Badge colorScheme={badgeColor}>
                      {translate(badgeText)}
                    </Badge>
                  </HStack>
                  <Text color="gray.500" fontStyle="italic">
                    {questionPool.exerciseExplanation}
                  </Text>
                  <Text color="gray.500" fontStyle="italic">
                    {questionPool.exerciseDescription}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <ExamAttemptQuestionPoolAnswers
                questionPoolIndex={questionPoolIndex}
                questionPool={questionPool}
                answers={allAnswers && allAnswers[questionPoolIndex]}
                updateFn={updateFn}
              />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
