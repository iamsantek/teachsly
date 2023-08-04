import {
  Text,
  Box,
  Heading,
  HStack,
  Stack,
  Flex,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { ExamAttempt } from "../../../../API";
import { useUserGroups } from "../../../../hooks/useUserGroups";
import { ExamAnswers, QuestionPool } from "../../../../interfaces/Exams";
import { translate } from "../../../../utils/LanguageUtils";
import { QuestionPoolResult } from "./QuestionPoolResult";
import { AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { GiConfirmed, GiCancel } from "react-icons/gi";
import ExamService from "../../../../services/ExamService";

interface Props {
  studentAnswers: ExamAnswers | undefined;
  examAttempt: ExamAttempt;
}

export const ExamCompleteResult = ({ studentAnswers, examAttempt }: Props) => {
  const { hasEditPermission } = useUserGroups();
  const [showScoreEditor, setShowScoreEditor] = useState(false);
  const [updatedScore, setUpdatedScore] = useState<number | undefined>();
  const questionPools: QuestionPool[] = JSON.parse(examAttempt.keys ?? "");

  const onUpdateScore = async () => {
    if (!updatedScore) {
      return;
    }

    await ExamService.updateScore(examAttempt, updatedScore);
    setShowScoreEditor(false);
  };

  useEffect(() => {
    if (!examAttempt?.score) {
      return;
    }

    setUpdatedScore(Number(examAttempt?.score));
  }, [examAttempt?.score]);

  return (
    <Stack marginBottom={10} marginTop={5}>
      <Box rounded="lg" boxShadow="md" p={7}>
        <HStack spacing={5}>
          <Stack justifyContent="center" alignItems="center">
            {showScoreEditor ? (
              <>
                <NumberInput
                  onChange={(value) => setUpdatedScore(Number(value))}
                  value={updatedScore}
                  min={0}
                  max={10}
                  precision={2}
                  step={0.25}
                  size="lg"
                >
                  <NumberInputField
                    borderColor="brand.500"
                    border="2px solid"
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>

                <Flex gap={4}>
                  <GiConfirmed
                    cursor="pointer"
                    onClick={() => onUpdateScore()}
                    size={20}
                  />
                  <GiCancel
                    cursor="pointer"
                    size={20}
                    onClick={() => {
                      setShowScoreEditor(false);
                    }}
                  />
                </Flex>
              </>
            ) : (
              <>
                <Text fontWeight="bold" fontSize={"5xl"}>
                  {updatedScore?.toFixed(2)}
                </Text>
                <Text color="gray.700">{translate("FINAL_MARK")}</Text>
              </>
            )}
            {hasEditPermission && !showScoreEditor && (
              <>
                <AiFillEdit
                  cursor="pointer"
                  size={20}
                  onClick={() => {
                    setUpdatedScore(Number(examAttempt?.score ?? 0));
                    setShowScoreEditor(true);
                  }}
                />
              </>
            )}
          </Stack>
          <Box>
            <Heading fontSize={"2xl"}>{examAttempt?.examName}</Heading>
            {hasEditPermission && (
              <Text>
                {translate("REALIZED_BY")} {examAttempt.userName}
              </Text>
            )}
            <Text>
              {translate("CORRECTED_BY")} {examAttempt?.correctedBy}
            </Text>
            <Text>
              {translate("CORRECT_ANSWERS")} {examAttempt?.correctAnswers} /{" "}
              {examAttempt?.totalQuestions}
            </Text>
            {examAttempt?.teacherComments && (
              <Box marginY={5}>
                <Text>{translate("EXAM_TEACHER_COMMENTS")}</Text>
                <Text>{examAttempt?.teacherComments}</Text>
              </Box>
            )}
          </Box>
        </HStack>
      </Box>
      <Stack spacing={10}>
        {questionPools.map((questionPool: QuestionPool, questionPoolIndex) => {
          return (
            <Box key={questionPool.id} rounded="lg" boxShadow="md" p={7}>
              <QuestionPoolResult
                questionPool={questionPool}
                questionPoolIndex={questionPoolIndex}
                studentAnswers={
                  studentAnswers && studentAnswers.answers[questionPoolIndex]
                }
              />
            </Box>
          );
        })}
      </Stack>
    </Stack>
  );
};
