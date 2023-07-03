import {
  InputGroup,
  Input,
  InputRightElement,
  Text,
  Flex,
  Button,
  Stack,
  NumberInputProps,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ExamCorrection, QuestionPool } from "../../../../interfaces/Exams";
import { UseFieldArrayUpdate } from "react-hook-form";
import { onUpdateTeacherScore } from "../../../../utils/ExamUtils";
import { AiFillCheckCircle } from "react-icons/ai";

interface Props {
  questionPoolIndex: number;
  questionIndex: number;
  questionPool: QuestionPool;
  score: number;
  updateFn: UseFieldArrayUpdate<ExamCorrection, "questionPools">;
  teacherScore?: number;
}

export const TeacherScoreInput = ({
  questionIndex,
  questionPoolIndex,
  questionPool,
  score,
  updateFn,
  teacherScore: teacherScoreProp,
}: Props) => {
  const [teacherScoreUpdated, setTeacherScoreUpdated] =
    useState<boolean>(false);
  const [teacherScore, setTeacherScore] = useState<number>(
    teacherScoreProp ?? 0
  );

  const updateTeacherScore = (
    questionPoolIndex: number,
    questionIndex: number,
    teacherScore: number
  ) => {
    const updatedValues = onUpdateTeacherScore(
      questionPool,
      questionIndex,
      teacherScore
    );

    updateFn(questionPoolIndex, updatedValues);
    setTeacherScoreUpdated(true);
  };

  useEffect(() => {
    const teacherScore =
      questionPool.questions[questionIndex]?.correction?.teacherScore ?? 0;
    setTeacherScore(teacherScore);
  }, [questionPoolIndex, questionPool.questions, questionIndex]);

  const isScoreGreaterThanMax = teacherScore > score;

  return (
    <>
      <Text fontWeight="bold">Puntaje asignado</Text>
      <Flex flexDirection="row" alignItems="center">
        <InputGroup marginX={3} width={"10em"}>
          <Input
            min={0}
            type="number"
            value={teacherScore ?? 0}
            onChange={(e) => {
              const teacherScore = parseInt(e.target.value);

              setTeacherScore(teacherScore);
              setTeacherScoreUpdated(true);
            }}
            isInvalid={isScoreGreaterThanMax || isNaN(teacherScore)}
          />
          <InputRightElement
            pointerEvents="none"
            color="gray.400"
            fontSize="0.8em"
            children={`/ ${score}`}
            marginX={3}
            marginRight={3}
          />
        </InputGroup>
        {teacherScoreUpdated && !isScoreGreaterThanMax && !isNaN(teacherScore) && (
          <Stack direction="row" spacing={4}>
            <Button
              colorScheme="brand"
              variant="solid"
              onClick={() =>
                updateTeacherScore(
                  questionPoolIndex,
                  questionIndex,
                  teacherScore ?? 0
                )
              }
            >
              <AiFillCheckCircle />
            </Button>
          </Stack>
        )}
      </Flex>
      {isScoreGreaterThanMax && (
        <Text color="red.500" fontSize="0.8em">
          El puntaje asignado no puede ser mayor al puntaje máximo
        </Text>
      )}
      {teacherScoreUpdated && !isScoreGreaterThanMax && !isNaN(teacherScore) && (
        <Text color="gray.500" fontSize="0.8em">
          * Confirmar para asignar puntaje
        </Text>
      )}
      {isNaN(teacherScore) && (
        <Text color="red.500" fontSize="0.8em">
          * El puntaje no puede estar en blanco, se usara el puntaje
          recomendado.
        </Text>
      )}
    </>
  );
};
