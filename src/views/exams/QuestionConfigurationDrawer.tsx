import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { AnswerType, QuestionType } from "../../interfaces/Exams";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (questionType: QuestionType, answersType: AnswerType) => void;
}

export const QuestionConfigurationDrawer = ({
  isOpen,
  onClose,
  onSave,
}: Props) => {
  const [questionType, setQuestionType] = useState<QuestionType>(
    QuestionType.TEXT
  );
  const [answersType, setAnswersType] = useState<AnswerType>(
    AnswerType.TextArea
  );

  const save = () => {
    onSave(questionType, answersType);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{translate("QUESTION_CONFIGURATION")}</DrawerHeader>

        <DrawerBody>
          <Stack spacing={5}>
            <Stack spacing={3}>
              <Text>{translate("QUESTION_TYPE")}</Text>
              <RadioGroup
                onChange={(nextValue: string) =>
                  setQuestionType(Number(nextValue) as QuestionType)
                }
                value={questionType}
              >
                <Stack direction="column" spacing={2} marginY={3}>
                  <Radio value={QuestionType.TEXT}>{translate("TEXT")}</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
            <Stack spacing={2}>
              <RadioGroup
                onChange={(nextValue: string) =>
                  setAnswersType(Number(nextValue) as AnswerType)
                }
                value={answersType}
              >
                <Text>{translate("ANSWER_TYPE")}</Text>
                <Stack direction="column" spacing={2} marginY={3}>
                  <Radio value={AnswerType.MultipleChoice}>
                    {translate("MULTIPLE_CHOICE")}
                  </Radio>
                  <Radio value={AnswerType.TextArea}>
                    {translate("TEXT_AREA")}
                  </Radio>
                  <Radio value={AnswerType.Blocks}>{translate('BLOCKS')}</Radio>
                  <Radio value={AnswerType.Audio}>{translate('AUDIO')}</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
          </Stack>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            {translate("CANCEL")}
          </Button>
          <Button colorScheme="blue" onClick={save}>
            {translate("SAVE")}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
