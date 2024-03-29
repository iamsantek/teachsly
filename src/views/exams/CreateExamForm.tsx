import {
  Button,
  Text,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  Box,
  AccordionPanel,
  Container,
  Flex,
  HStack,
  Input as ChakraInput,
  Select as ChakraSelect,
  List,
  ListItem,
  ListIcon,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { AiFillDelete, AiOutlinePlus, AiFillFile } from "react-icons/ai";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ConfirmationDialog } from "../../components/AlertDialog/ConfirmationDialog";
import { Input } from "../../components/Inputs/Input";
import { Select } from "../../components/Inputs/Select";
import {
  defaultExamForm,
  defaultHomeWorkForm,
  defaultQuestionPool,
} from "../../constants/Exams";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { useUserGroups } from "../../hooks/useUserGroups";
import { ExamForm } from "../../interfaces/Exams";

import ExamService from "../../services/ExamService";
import { generalGroups } from "../../utils/CognitoGroupsUtils";
import { renderCourseList } from "../../utils/CourseUtils";
import {
  runFieldsValidations,
  formatAPIResponse,
  questionPoolTotalScore,
  totalExamScoreAssigned,
} from "../../utils/ExamUtils";
import { translate } from "../../utils/LanguageUtils";
import { QuestionPoolQuestions } from "./QuestionPoolQuestions";
import { TranslationsDictionary } from "../../dictionaries/dictionary";
import { FileUploader } from "../../components/Inputs/FileUploader";
import StorageService from "../../services/aws/StorageService";
import { removeExtension } from "../../utils/StringUtils";
import { EditableInputComponent } from "../../components/Inputs/EditableInput";
import { TimeGranularity } from "../../API";
import { toastConfig } from "../../utils/ToastUtils";

const getTranslationButton = (isExam: boolean, isUpdate: boolean) => {
  if (isExam) {
    return isUpdate ? "UPDATE_EXAM" : "CREATE_EXAM";
  } else {
    return isUpdate ? "UPDATE_HOMEWORK" : "CREATE_HOMEWORK";
  }
};

export const CreateExamForm = () => {
  const [
    showDeleteQuestionPoolConfirmation,
    setShowDeleteQuestionPoolConfirmation,
  ] = useState(false);
  const [questionPoolIndexToDelete, setQuestionPoolIndexToDelete] =
    useState(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { groups } = useUserGroups();

  const location = useLocation();
  const toast = useToast();
  const isExam = location.pathname.includes("exams");

  const {
    context: { courses },
  } = useContext(UserDashboardContext);
  const formControls = useForm<ExamForm>({
    defaultValues: isExam ? defaultExamForm : defaultHomeWorkForm,
  });
  const { handleSubmit, control, reset, watch, setValue, register } =
    formControls;
  const navigate = useNavigate();

  const { examId } = useParams();
  const { timer } = watch();

  const fetchExamById = useCallback(async () => {
    if (!examId) {
      return;
    }

    const examResponse = await ExamService.getExamById(examId);

    const examForm: ExamForm | undefined = formatAPIResponse(
      examResponse,
      courses
    );

    if (!examForm) {
      return;
    }

    reset(examForm);
  }, [examId, courses, reset]);

  useEffect(() => {
    fetchExamById();
  }, [examId, fetchExamById]);

  const saveExam = async () => {
    const exam = formControls.getValues();
    const errors = runFieldsValidations(exam);

    if (errors.length > 0) {
      errors.forEach((field) => {
        toast(
          toastConfig({
            description: field,
            status: "error",
          })
        );
      });
      return;
    }

    setIsLoading(true);

    const examResponse = examId
      ? await ExamService.updateExam(exam)
      : await ExamService.createExam(exam);
    let toastDescription: TranslationsDictionary;

    if (examId) {
      // Update exam
      toastDescription = examResponse
        ? "UPDATE_EXAM_SUCCESS"
        : "UPDATE_EXAM_ERROR";
    } else {
      // Create exam
      toastDescription = examResponse
        ? "CREATE_EXAM_SUCCESS"
        : "CREATE_EXAM_ERROR";
    }

    toast(
      toastConfig({
        description: toastDescription,
        status: examResponse ? "success" : "error",
      })
    );
    setIsLoading(false);
    navigate(isExam ? "/exams" : "/homework");
  };

  const {
    fields: questionPools,
    update,
    remove,
    append,
  } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "questionPools", // unique name for your Field Array
  });

  const onDeleteQuestionPool = (questionPoolIndex: number) => {
    if (questionPools.length === 1) {
      toast(
        toastConfig({
          description: "DELETE_LAST_QUESTIONS_POOL_ERROR",
          status: "info",
        })
      );
      return;
    }

    setQuestionPoolIndexToDelete(questionPoolIndex);
    setShowDeleteQuestionPoolConfirmation(true);
  };

  const deleteQuestionPool = () => {
    setShowDeleteQuestionPoolConfirmation(false);
    remove(questionPoolIndexToDelete);
  };

  const onAddQuestionPool = () => {
    append(defaultQuestionPool);
  };

  const onChangeFile = async (
    questionPoolIndex: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    const uploadFile = await StorageService.uploadToS3(file);

    if (uploadFile?.key) {
      update(questionPoolIndex, {
        ...questionPools[questionPoolIndex],
        attachments: [
          ...questionPools[questionPoolIndex].attachments,
          {
            name: removeExtension(file.name),
            path: uploadFile.key,
          },
        ],
      });
    }
  };

  const onDeleteAttachment = (
    questionPoolIndex: number,
    attachmentIndex: number
  ) => {
    const newAttachments = questionPools[questionPoolIndex].attachments.filter(
      (attachment, index) => index !== attachmentIndex
    );

    update(questionPoolIndex, {
      ...questionPools[questionPoolIndex],
      attachments: newAttachments,
    });
  };

  const updateAttachment = (
    questionPoolIndex: number,
    attachmentIndex: number,
    newValue: string
  ) => {
    const updatedAttachments = [
      ...questionPools[questionPoolIndex].attachments,
    ];
    const attachment = questionPools[questionPoolIndex].attachments.find(
      (attachment, index) => index === attachmentIndex
    );

    if (!attachment) {
      return;
    }

    attachment.name = newValue;
    updatedAttachments[attachmentIndex] = attachment;

    update(questionPoolIndex, {
      ...questionPools[questionPoolIndex],
      attachments: updatedAttachments,
    });
  };

  const onChangeTime = (e: ChangeEvent<HTMLSelectElement>) => {
    const granularity = e.target.value;
    setValue("timer.timeGranularity", granularity as TimeGranularity);

    if (granularity === TimeGranularity.SECONDS) {
      setValue("timer.timeInSeconds", timer.timeInSeconds * 60);
    } else if (granularity === TimeGranularity.MINUTES) {
      setValue("timer.timeInSeconds", timer.timeInSeconds / 60);
    }
  };

  const isSomeQuestionPoolWithQuestions = useMemo(
    () =>
      questionPools.some((questionPool) => questionPool.questions.length > 0),
    [questionPools]
  );

  const totalScoreAssigned = totalExamScoreAssigned(questionPools);

  return (
    <>
      <FormProvider {...formControls}>
        <form onSubmit={handleSubmit(saveExam)}>
          <Stack spacing={6}>
            <Input
              name="title"
              label="TITLE"
              isRequired={true}
              placeholder={translate("TITLE")}
            />
            <Select
              name="groups"
              label="GROUP_MULTI_SELECT_TITLE"
              placeholder={translate("COURSES")}
              isRequired={true}
              options={renderCourseList({
                courses: groups,
                additionalGroups: generalGroups,
                includeEnglishLevels: true,
              })}
              isMultiSelect
              closeMenuOnSelect={true}
            />

            <Flex>
              <Input
                name="startDate"
                label="EXAM_START_DATE"
                isRequired={true}
                placeholder={translate("EXAM_START_DATE")}
                type="datetime-local"
              />
              <Input
                name="deadline"
                label="EXAM_DEADLINE"
                isRequired={false}
                placeholder={translate("EXAM_DEADLINE")}
                type="datetime-local"
              />
            </Flex>
            <Text color="gray.500" fontWeight="italic">
              ** {translate("NO_DEADLINE_EXPLANATION")}
            </Text>

            {/* <Select
              name="timer.type"
              label="EXAM_TIME_TYPE"
              isRequired={true}
              options={defaultExamTimerOptions}
              isMultiSelect={false}
              closeMenuOnSelect={true}
              defaultValue={defaultExamTimerOptions[0]}
            
              
            /> */}
            <Text fontWeight="bold">{translate("EXAM_DURATION")}</Text>
            <HStack spacing={1}>
              <ChakraSelect
                maxW={"20%"}
                {...register("timer.timeGranularity")}
                onChange={(e) => onChangeTime(e)}
              >
                <option value={TimeGranularity.MINUTES}>Minutos</option>
                <option value={TimeGranularity.SECONDS}>Segundos</option>
              </ChakraSelect>
              <ChakraInput
                type="number"
                {...register("timer.timeInSeconds", { required: true })}
              />
            </HStack>

            <Stack spacing={4}>
              <Text textStyle="title">{translate("EXAM_SETTINGS")}</Text>
              <Checkbox
                isChecked={watch("settings.allowRetake")}
                size="lg"
                colorScheme="brand"
                {...register("settings.allowRetake")}
              >
                {translate("ALLOW_RE_TAKE_EXAM")}
              </Checkbox>
            </Stack>

            <ConfirmationDialog
              isOpen={showDeleteQuestionPoolConfirmation}
              onClose={() => setShowDeleteQuestionPoolConfirmation(false)}
              title="DELETE_QUESTIONS_POOL_TITLE"
              description="DELETE_QUESTIONS_POOL_DESCRIPTION"
              confirmButtonText={"DELETE"}
              onAction={deleteQuestionPool}
            />

            <Accordion allowMultiple>
              {questionPools?.map((questionPool, questionPoolIndex) => {
                const exerciseExplanation = watch(
                  `questionPools.${questionPoolIndex}.exerciseExplanation`
                );
                const exerciseDescription = watch(
                  `questionPools.${questionPoolIndex}.exerciseDescription`
                );

                return (
                  <AccordionItem
                    boxShadow="md"
                    key={questionPoolIndex}
                    marginY={5}
                  >
                    <h2>
                      <AccordionButton
                        display="flex"
                        justifyContent="space-between"
                        flexDir="row"
                      >
                        <Flex
                          flexDirection="column"
                          justifyContent="flex-start"
                          gap={3}
                        >
                          <Text fontWeight="bold" textAlign="left">
                            {translate("EXERCISE")} #{questionPoolIndex + 1}
                            {exerciseExplanation && ` - ${exerciseExplanation}`}
                          </Text>
                          <Text
                            textAlign={"left"}
                            fontWeight={"italic"}
                            fontSize="sm"
                          >
                            {exerciseDescription}
                          </Text>
                        </Flex>
                        <Box display="flex" alignItems="center" gap={3}>
                          <Text fontWeight="bold" textAlign="left">
                            {questionPoolTotalScore(questionPool)}{" "}
                            {translate("POINTS")}
                          </Text>
                          <Button
                            onClick={() =>
                              onDeleteQuestionPool(questionPoolIndex)
                            }
                          >
                            <AiFillDelete />
                          </Button>
                          <AccordionIcon />
                        </Box>
                      </AccordionButton>
                    </h2>
                    <AccordionPanel paddingY={4}>
                      <Stack spacing={4}>
                        <Input
                          name={`questionPools.${questionPoolIndex}.exerciseExplanation`}
                          label="EXERCISE_EXPLANATION"
                          isRequired={true}
                        />
                        <Input
                          name={`questionPools.${questionPoolIndex}.exerciseDescription`}
                          label="EXERCISE_DESCRIPTION"
                          isRequired={false}
                        />

                        {questionPool.attachments.length > 0 ? (
                          <>
                            <Text fontWeight="bold">
                              {translate("MEANINGFUL_FILE_NAMES")}
                            </Text>
                            <List spacing={3}>
                              {questionPool.attachments.map(
                                (attachment, attachmentIndex) => (
                                  <ListItem key={attachmentIndex}>
                                    <Flex gap={1} alignItems="center">
                                      <ListIcon
                                        as={AiFillFile}
                                        cursor="pointer"
                                        onClick={async () => {
                                          const url =
                                            await StorageService.getSignedUrl(
                                              attachment.path
                                            );
                                          window.open(url?.url, "_blank");
                                        }}
                                      />
                                      <EditableInputComponent
                                        value={attachment.name}
                                        onComplete={(newValue) =>
                                          updateAttachment(
                                            questionPoolIndex,
                                            attachmentIndex,
                                            newValue
                                          )
                                        }
                                        onDelete={() =>
                                          onDeleteAttachment(
                                            questionPoolIndex,
                                            attachmentIndex
                                          )
                                        }
                                        permissions={{
                                          canEdit: true,
                                          canDelete: true,
                                        }}
                                      />
                                    </Flex>
                                  </ListItem>
                                )
                              )}
                            </List>
                          </>
                        ) : (
                          <>
                            <FileUploader
                              name="file"
                              onChange={(e) =>
                                onChangeFile(questionPoolIndex, e)
                              }
                              label="ATTACH_FILE"
                            />
                            <Text color="gray.500">
                              {translate("EXAM_ATTACHMENT_HELPER")}{" "}
                              {questionPoolIndex + 1}
                            </Text>
                          </>
                        )}
                      </Stack>
                      <QuestionPoolQuestions
                        questionPoolIndex={questionPoolIndex}
                        questionPool={questionPool}
                        updateFn={update}
                      />
                    </AccordionPanel>
                  </AccordionItem>
                );
              })}
            </Accordion>

            <Flex
              border="3px solid"
              borderColor="gray.500"
              borderRadius="md"
              padding={2}
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Text>
                {translate("ASSIGNED_MARK")} {totalScoreAssigned}{" "}
                {translate("OF")} 100
              </Text>
            </Flex>
            <Container
              centerContent
              maxW="100%"
              display="flex"
              flexDirection="row"
              gap={5}
              justifyContent="center"
            >
              <Button
                leftIcon={<AiOutlinePlus />}
                marginTop={5}
                onClick={() => onAddQuestionPool()}
                colorScheme="brand"
                variant="solid"
              >
                {translate("ADD_QUESTION_POOL")}
              </Button>
              <Button
                leftIcon={<AiOutlinePlus />}
                isLoading={isLoading}
                marginTop={5}
                disabled={!isSomeQuestionPoolWithQuestions}
                colorScheme="brand"
                variant="solid"
                // type="submit"
                onClick={() => saveExam()}
              >
                {translate(getTranslationButton(isExam, !!examId))}
              </Button>
            </Container>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};
