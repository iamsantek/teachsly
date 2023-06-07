import { useFormContext, UseFieldArrayUpdate } from "react-hook-form";
import {
  Question,
  AnswerType,
  ExamForm,
  Options,
  QuestionPool as IQuestionPool,
} from "../../interfaces/Exams";
import {
  Stack,
  Flex,
  Input as ChakraInput,
  Button,
  Textarea,
  HStack,
  Checkbox,
  Text,
  Box,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { BsListCheck } from "react-icons/bs";
import { alphabet, blocksRegExp } from "../../utils/ExamUtils";
import { translate } from "../../utils/LanguageUtils";
import { driveRegExp } from "../../utils/StringUtils";
import { useCallback, useEffect, useState } from "react";

interface Props {
  question: Question;
  questionIndex: number;
  questionPoolIndex: number;
  questionPool: IQuestionPool;
  updateFn: UseFieldArrayUpdate<ExamForm, "questionPools">;
  openDrawer: () => void;
}

export const PoolQuestion = ({
  question,
  questionIndex,
  questionPoolIndex,
  questionPool,
  updateFn: update,
  openDrawer,
}: Props) => {
  const { register, watch } = useFormContext();
  const [currentBlockMatches, setCurrentBlockMatches] = useState<string[]>([]);

  const blockText: string = watch(
    `questionPools.${questionPoolIndex}.questions.${questionIndex}.blocks.blockText`
  );

  const setBlockAnswers = useCallback(
    (questionIndex: number, answers: string[]) => {
      const question = questionPool.questions[questionIndex];

      if (!question.blocks) {
        return;
      }

      question.blocks.correctAnswers = answers;
      questionPool.questions[questionIndex] = question;

      update(questionPoolIndex, questionPool);
    },
    [questionPool, questionPoolIndex, update]
  );

  useEffect(() => {
    if (question.answerType === AnswerType.Blocks) {
      const matches = [...blockText.matchAll(blocksRegExp)];
      const blockAnswers = matches.map((match) => match[1]);

      if (
        JSON.stringify(blockAnswers) !== JSON.stringify(currentBlockMatches)
      ) {
        setCurrentBlockMatches(blockAnswers);
        setBlockAnswers(questionIndex, blockAnswers);
      }
    }
  }, [
    blockText,
    question,
    questionIndex,
    questionPoolIndex,
    questionPool,
    setBlockAnswers,
    currentBlockMatches,
  ]);

  const addOption = (questionIndex: number, questionPoolIndex: number) => {
    const { options } =
      watch("questionPools")[questionPoolIndex].questions[questionIndex];

    const newOption = {
      id: alphabet[options.length],
      label: "",
      isCorrectOption: undefined,
    };

    update(questionPoolIndex, {
      ...watch("questionPools")[questionPoolIndex],
      questions: watch("questionPools")[questionPoolIndex].questions.map(
        (question: Question, index: number) => {
          if (index === questionIndex) {
            return {
              ...question,
              options: [...(question.options as Options[]), newOption],
            };
          }

          return question;
        }
      ),
    });
  };

  const onChangeOption = (newValue: string, questionPoolIndex: number) => {
    const [question, option] = newValue.split("-");

    const questionPool: IQuestionPool =
      watch("questionPools")[questionPoolIndex];
    const questionToUpdate: Question = questionPool.questions[Number(question)];
    const index = questionToUpdate.options?.findIndex(
      (_option: Options, index: number) => alphabet[index] === option
    );

    if (
      index !== undefined &&
      !!questionToUpdate?.options &&
      questionToUpdate?.options[index]
    ) {
      questionToUpdate.options[index].isCorrectOption =
        !questionToUpdate.options[index].isCorrectOption;
    }

    questionPool.questions[Number(question)] = questionToUpdate;

    update(questionPoolIndex, questionPool);
  };

  const onDeleteOption = (
    questionIndex: number,
    optionIndex: number,
    questionPoolIndex: number
  ) => {
    const question = questionPool.questions[questionIndex];
    const filteredOptions = question.options?.filter(
      (option: Options, index: number) => index !== optionIndex
    );

    question.options = filteredOptions;
    questionPool.questions[questionIndex] = question;

    update(questionPoolIndex, questionPool);
  };

  const onDeleteQuestion = (questionIndex: number) => {
    const questionPool: IQuestionPool =
      watch("questionPools")[questionPoolIndex];
    const filteredQuestions = questionPool.questions.filter(
      (question: Question, index: number) => index !== questionIndex
    );

    questionPool.questions = filteredQuestions;
    update(questionPoolIndex, questionPool);
  };

  return (
    <Stack marginY={10} spacing={5} key={question.id} width="100%">
      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {translate("QUESTION")} #{questionIndex + 1}
      </Text>
      <Flex gap={2}>
        <ChakraInput
          placeholder={`${translate("QUESTION")} #${questionIndex + 1}`}
          {...register(
            `questionPools.${questionPoolIndex}.questions.${questionIndex}.question`,
            { required: false, pattern: new RegExp(driveRegExp) }
          )}
        />

        <Button
          onClick={() => onDeleteQuestion(questionIndex)}
          colorScheme="brand"
          variant="solid"
        >
          <AiFillDelete />
        </Button>
      </Flex>

      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {translate("DESCRIPTION")} #{questionIndex + 1}
      </Text>

      <ChakraInput
        placeholder={`${translate("DESCRIPTION")} #${questionIndex + 1}`}
        {...register(
          `questionPools.${questionPoolIndex}.questions.${questionIndex}.description`,
          { required: false, pattern: new RegExp(driveRegExp) }
        )}
      />

      <Text fontWeight={600} fontSize="sm" textStyle="title">
        {translate("SCORE")}
      </Text>
      <InputGroup marginX={3} width={"10em"}>
        <ChakraInput
          type="number"
          placeholder="Puntaje"
          {...register(
            `questionPools.${questionPoolIndex}.questions.${questionIndex}.score`,
            { required: false, pattern: new RegExp(driveRegExp) }
          )}
        />
        <InputRightElement
          pointerEvents="none"
          color="gray.400"
          fontSize="0.8em"
          children="/ 100"
          marginX={3}
        />
      </InputGroup>

      {question.answerType === AnswerType.Blocks && (
        <>
          <Text fontWeight={600} fontSize="sm" textStyle="title">
            {translate("BLOCKS")}
          </Text>
          <Textarea
            marginY={5}
            placeholder="My name [is] John Doe."
            {...register(
              `questionPools.${questionPoolIndex}.questions.${questionIndex}.blocks.blockText`,
              { required: true }
            )}
          />
          <Text color="gray.500" fontSize="sm" fontStyle="italic">
            * {translate("BLOCKS_HELPER")}
          </Text>
          {currentBlockMatches && blockText && (
            <>
              <Text fontWeight={600} fontSize="sm" textStyle="title">
                {translate("EXERCISE_PREVIEW")}
              </Text>
              <Text fontSize="sm" as="pre">
                {blockText.replace(blocksRegExp, "____")}
              </Text>
            </>
          )}
        </>
      )}

      {question.answerType === AnswerType.MultipleChoice &&
        question.options?.map((option, optionIndex) => (
          <>
            <Stack key={option.id} paddingLeft={10} marginY={6} spacing={5}>
              <Text fontWeight={600} fontSize="sm" textStyle="title">
                {translate("OPTION")} #{optionIndex + 1}
              </Text>
              <HStack alignContent="center" alignItems="center">
                <Checkbox
                  colorScheme="brand"
                  onChange={(e) =>
                    onChangeOption(e.target.value, questionPoolIndex)
                  }
                  isChecked={
                    !!watch("questionPools")[questionPoolIndex].questions[
                      questionIndex
                    ].options[optionIndex].isCorrectOption
                  }
                  value={`${questionIndex}-${alphabet[optionIndex]}`}
                />
                <ChakraInput
                  placeholder={`${translate("OPTION")} #${optionIndex + 1}`}
                  {...register(
                    `questionPools.${questionPoolIndex}.questions.${questionIndex}.options.${optionIndex}.label`,
                    { required: false, maxLength: 80 }
                  )}
                />

                <Button
                  onClick={() =>
                    onDeleteOption(
                      questionIndex,
                      optionIndex,
                      questionPoolIndex
                    )
                  }
                  colorScheme="brand"
                  variant="solid"
                >
                  <AiFillDelete />
                </Button>
              </HStack>
            </Stack>
            {optionIndex === (question.options?.length as number) - 1 && (
              <Box
                paddingLeft={10}
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                maxWidth="100%"
              >
                <Button
                  size="sm"
                  leftIcon={<BsListCheck />}
                  colorScheme="brand"
                  onClick={() => addOption(questionIndex, questionPoolIndex)}
                >
                  {`${translate("ADD_OPTION_BUTTON")}${questionIndex + 1}`}
                </Button>
              </Box>
            )}
          </>
        ))}
      <Flex justifyContent="flex-end">
        {questionIndex === questionPool.questions.length - 1 && (
          <Button
            colorScheme="brand"
            leftIcon={<BsListCheck />}
            onClick={() => openDrawer()}
          >
            {translate("ADD_QUESTION_BUTTON")}
          </Button>
        )}
      </Flex>
    </Stack>
  );
};
