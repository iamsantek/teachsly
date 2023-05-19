import { PutResult } from "@aws-amplify/storage";
import {
  Stack,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  Modal,
  ModalContent,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  CreateLessonPlanMutation,
  LessonPlan,
  LessonPlanningType,
  UpdateLessonPlanMutation,
  CreateLessonPlanInput,
} from "../../API";
import { FileUploader } from "../../components/Inputs/FileUploader";
import { Input } from "../../components/Inputs/Input";
import { Select } from "../../components/Inputs/Select";
import { ModalFooter } from "../../components/Modals/ModalFooter";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { TranslationsDictionary } from "../../dictionaries/dictionary";
import { MultiSelectOption } from "../../interfaces/MultiSelectOption";
import StorageService from "../../services/aws/StorageService";
import {
  createLessonPlan,
  updateLessonPlan,
} from "../../services/LessonPlanService";
import { translate } from "../../utils/LanguageUtils";
import { renderMultiSelectOptions } from "../../utils/SelectUtils";
import { toastConfig } from "../../utils/ToastUtils";

export interface LessonPlanningWithMultiSelect
  extends Omit<CreateLessonPlanInput, "type"> {
  type: MultiSelectOption;
}

export const defaultLessonPlanning: LessonPlanningWithMultiSelect = {
  groups: [],
  title: "",
  date: "",
  uploadedBy: "",
  content: "",
  type: { value: LessonPlanningType.LESSON, label: LessonPlanningType.LESSON },
  externalId: "",
  media: "",
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (lessonPlanning: LessonPlan) => void;
  onUpdate: (lessonPlanning: LessonPlan) => void;
  lessonToUpdate: LessonPlan | null;
}

// Transform LessonPlanningAllowedTypes in something iterable
const lessonPlanningAllowedTypes = Object.entries(LessonPlanningType)
  .filter(([key, value]) => {
    const isAllowedType =
      value !== LessonPlanningType.HOMEWORK &&
      value !== LessonPlanningType.RECORDING &&
      value !== LessonPlanningType.EXAM;
    return isAllowedType;
  })
  .map(([key, value]) => value);

export const LessonPlanningModal = ({
  isOpen,
  onClose,
  onCreate,
  lessonToUpdate,
  onUpdate,
}: Props) => {
  const {
    context: { user, courses },
  } = useContext(UserDashboardContext);
  const { courseId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File>();
  const formControls = useForm<LessonPlanningWithMultiSelect>({
    defaultValues: defaultLessonPlanning,
  });
  const currentCourse = courses.find(
    (course) => course.externalId === courseId
  );

  const { handleSubmit, reset, setValue, watch } = formControls;
  const toast = useToast();

  const type = watch("type");

  useEffect(() => {
    setValue("date", new Date().toISOString().split("T")[0]);

    if (lessonToUpdate) {
      reset({
        ...lessonToUpdate,
        media: lessonToUpdate.media || "",
        content: lessonToUpdate.content ?? "",
        type: {
          value: lessonToUpdate.type ?? LessonPlanningType.LESSON,
          label: lessonToUpdate.type ?? LessonPlanningType.LESSON,
        },
        date: lessonToUpdate.date.split("T")[0],
        link: lessonToUpdate.link ?? "",
      });
    }
  }, [lessonToUpdate, courses]);

  const saveLessonPlanning = async (values: LessonPlanningWithMultiSelect) => {
    setIsLoading(true);
    let savedFile: PutResult | undefined;

    if (file) {
      savedFile = await StorageService.uploadToS3(file);
    }

    const type = values.type.value as LessonPlanningType;

    const lessonPlan = {
      ...lessonToUpdate,
      ...values,
      id: lessonToUpdate?.id as string,
      media: savedFile?.key,
      uploadedBy: user?.name || "",
      type,
      groups: [currentCourse?.externalId as string],
    };

    let result: CreateLessonPlanMutation | UpdateLessonPlanMutation | undefined;
    let toastMessage: TranslationsDictionary;
    if (lessonToUpdate) {
      result = (await updateLessonPlan(lessonPlan)) as
        | UpdateLessonPlanMutation
        | undefined;
      if (result?.updateLessonPlan) {
        onUpdate(result.updateLessonPlan as LessonPlan);
        toastMessage = "LESSON_UPDATE_SUCCESS";
      } else {
        toastMessage = "LESSON_UPDATE_ERROR";
      }
    } else {
      result = (await createLessonPlan(lessonPlan)) as
        | CreateLessonPlanMutation
        | undefined;

      if (result) {
        toastMessage = "LESSON_SUCCESS";
        onCreate(result.createLessonPlan as LessonPlan);
      } else {
        toastMessage = "LESSON_ERROR";
      }
    }

    setIsLoading(false);

    toast(
      toastConfig({
        description: toastMessage,
        status: result ? "success" : "error",
      })
    );

    reset(defaultLessonPlanning);
    onClose();
  };

  const onCloseModal = () => {
    reset(defaultLessonPlanning);
    onClose();
  };

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCloseModal} size="4xl">
        <ModalOverlay />
        <FormProvider {...formControls}>
          <form onSubmit={handleSubmit(saveLessonPlanning)}>
            <ModalContent>
              <ModalHeader textStyle={"paragraph"}>
                {translate("LESSON_PLAN")} - {currentCourse?.name}
              </ModalHeader>
              <ModalBody marginBottom={3}>
                <Stack spacing={6}>
                  <Input
                    name="title"
                    label="TITLE"
                    isRequired={true}
                    placeholder={`E.g Student's Book Page 30`}
                  />
                  <Input
                    name="content"
                    label="DESCRIPTION"
                    isRequired={false}
                    placeholder={`E.g Read the article and answer the questions 1-5`}
                  />

                  <Input
                    name="date"
                    label="EXAM_START_DATE"
                    isRequired={true}
                    placeholder={translate("EXAM_START_DATE")}
                    type="date"
                  />

                  <Select
                    name="type"
                    label="TYPE"
                    isRequired={true}
                    placeholder={translate("TYPE")}
                    options={renderMultiSelectOptions(
                      Object.values(lessonPlanningAllowedTypes)
                    )}
                    isMultiSelect={false}
                    closeMenuOnSelect={true}
                    isDisabled={
                      lessonToUpdate?.type === LessonPlanningType.RECORDING
                    }
                  />

                  {type?.value === LessonPlanningType.MEDIA && (
                    <FileUploader
                      name="media"
                      onChange={onChangeFile}
                      label="ATTACH_FILE"
                    />
                  )}
                  {type?.value === LessonPlanningType.LINK && (
                    <Input
                      name="link"
                      label="LINK"
                      isRequired={true}
                      placeholder="https://www.youtube.com/watch?v="
                      type="text"
                    />
                  )}
                </Stack>
              </ModalBody>
              <ModalFooter
                isLoading={isLoading}
                sendButtonText={
                  lessonToUpdate ? "UPDATE_LESSON_PLAN" : "CREATE_LESSON_PLAN"
                }
                onClose={onClose}
              />
            </ModalContent>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
