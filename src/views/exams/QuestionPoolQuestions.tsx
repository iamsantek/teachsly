import {
  Button,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext, UseFieldArrayUpdate } from "react-hook-form";
import { BsListCheck } from "react-icons/bs";
import {
  QuestionPool,
  ExamForm,
  QuestionType,
  AnswerType,
} from "../../interfaces/Exams";
import { translate } from "../../utils/LanguageUtils";
import { QuestionConfigurationDrawer } from "./QuestionConfigurationDrawer";
import { PoolQuestion } from "./PoolQuestion";

interface Props {
  questionPool: QuestionPool;
  questionPoolIndex: number;
  updateFn: UseFieldArrayUpdate<ExamForm, "questionPools">;
}

export const QuestionPoolQuestions = ({
  questionPool,
  questionPoolIndex,
  updateFn: update,
}: Props) => {
  const { watch } = useFormContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const addQuestion = (
    questionPoolIndex: number,
    questionType = QuestionType.TEXT,
    answerType = AnswerType.MultipleChoice
  ) => {
    update(questionPoolIndex, {
      ...watch("questionPools")[questionPoolIndex],
      questions: [
        ...watch("questionPools")[questionPoolIndex].questions,
        {
          id: String(
            watch("questionPools")[questionPoolIndex].questions.length + 1
          ),
          question: "",
          answerType,
          questionType,
          options:
            answerType === AnswerType.MultipleChoice
              ? [
                  {
                    id: "a",
                    label: "",
                    isCorrectOption: undefined,
                  },
                ]
              : undefined,
          blocks: {
            blockText: "",
            correctAnswers: [],
          },
        },
      ],
    });
  };

  return (
    <Stack marginY={10}>
      {questionPool.questions.length === 0 && (
        <Button
          colorScheme="brand"
          leftIcon={<BsListCheck />}
          onClick={() => setIsDrawerOpen(true)}
        >
          {translate("ADD_FIRST_QUESTION")}
        </Button>
      )}
      {questionPool.questions.map((question, questionIndex) => {
        return (
          <PoolQuestion
            key={question.id}
            question={question}
            questionIndex={questionIndex}
            questionPoolIndex={questionPoolIndex}
            updateFn={update}
            openDrawer={() => setIsDrawerOpen(true)}
            questionPool={questionPool}
          />
        );
      })}
      <QuestionConfigurationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={(questionType, answerType) =>
          addQuestion(questionPoolIndex, questionType, answerType)
        }
      />
    </Stack>
  );
};
