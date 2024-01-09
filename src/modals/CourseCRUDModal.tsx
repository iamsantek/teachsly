import { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Stack,
  useToast,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { translate } from "../utils/LanguageUtils";
import { Input as CustomInput } from "../components/Inputs/Input";
import { defaultCourse } from "../constants/Courses";
import CourseService from "../services/CourseService";
import { FormProvider, useForm } from "react-hook-form";
import DateTimeUtils from "../utils/DateTimeUtils";
import { ModalFooter } from "../components/Modals/ModalFooter";
import { Select } from "../components/Inputs/Select";
import { CourseWithMultiSelect } from "../interfaces/Course";
import {
  mapSingleValueToMultiSelectOption,
  renderMultiSelectOptions,
} from "../utils/SelectUtils";
import { Course as CourseAPI, CourseType, CreateCourseInput } from "../API";
import { toastConfig } from "../utils/ToastUtils";
import { MultiSelectOption } from "../interfaces/MultiSelectOption";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (course: CourseAPI) => void;
  onUpdate: (course: CourseAPI) => void;
  courseToUpdate?: CourseAPI;
}

const daysOfTheWeek = DateTimeUtils.daysOfTheWeek();

const CourseCRUDModal = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  courseToUpdate,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const formControls = useForm({
    defaultValues: defaultCourse as CourseWithMultiSelect,
  });

  const {
    handleSubmit,
    reset,
    watch,
    register,
    formState: { errors, dirtyFields },
  } = formControls;

  const courseId = watch("id");

  useEffect(() => {
    if (courseToUpdate) {
      const course: CourseWithMultiSelect = {
        ...courseToUpdate,
        scheduleDates: DateTimeUtils.dayIndexesToMultiSelectOption(
          courseToUpdate.scheduleDates as number[]
        ),
        scheduleYear: courseToUpdate.scheduleYear
          ? mapSingleValueToMultiSelectOption(
              String(courseToUpdate.scheduleYear)
            )
          : { label: "No year", value: "" },
        type: mapSingleValueToMultiSelectOption(
          courseToUpdate.type || CourseType.GROUP
        ),
      };

      reset(course);
    }
  }, [courseToUpdate]);

  useEffect(() => {
    if (!isOpen) {
      reset(defaultCourse as CourseWithMultiSelect);
    }
  }, [isOpen]);

  const createCourse = async (course: CourseWithMultiSelect) => {
    setIsLoading(true);

    const updatedCourse: CreateCourseInput = {
      ...course,
      scheduleDates: course.scheduleDates.map((date) =>
        Number(date.value)
      ) as number[],
      scheduleYear:
        course.scheduleYear.value !== ""
          ? Number(course.scheduleYear.value)
          : null,
      type: (course.type as MultiSelectOption).value as CourseType,
    };

    const createdCourse = await CourseService.createCourse(updatedCourse);

    if (createdCourse?.createCourse) {
      onCreate(createdCourse?.createCourse);
      onClose();

      toast(
        toastConfig({
          status: "success",
          description: "COURSE_CREATED_MESSAGE",
        })
      );
    }
    setIsLoading(false);
  };

  const formatCourse = (
    course: CourseWithMultiSelect
  ): CourseAPI | CreateCourseInput => ({
    ...course,
    scheduleDates: course.scheduleDates.map((day) =>
      Number(day.value)
    ) as number[],
    scheduleYear: course.scheduleYear.value
      ? Number(course.scheduleYear.value)
      : null,
    type: (course.type as MultiSelectOption).value as CourseType,
  });

  const updateCourse = async (course: CourseWithMultiSelect) => {
    setIsLoading(true);
    const updatedCourse = formatCourse(course);
    const isVirtualCheckboxChanged = !!(
      dirtyFields.isVirtual && course.isVirtual
    );
    const courseSuccessfullyEdited = await CourseService.updateCourse(
      updatedCourse as CourseAPI,
      isVirtualCheckboxChanged
    );

    if (courseSuccessfullyEdited) {
      onUpdate(courseSuccessfullyEdited);
      onClose();

      toast(
        toastConfig({
          status: "success",
          description: "COURSE_UPDATED_SUCCESS",
        })
      );
    }
    setIsLoading(false);
  };

  const onSubmit = (course: CourseWithMultiSelect) => {
    const hasErrors = Object.keys(errors).length !== 0;

    if (hasErrors) {
      // TODO: Implement form errors
      console.log(errors);
      return;
    }

    courseId ? updateCourse(course) : createCourse(course);
  };

  const date = new Date();
  const years = [
    date.getFullYear(),
    date.getFullYear() + 1,
    date.getFullYear() + 2,
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <FormProvider {...formControls}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader textStyle={"paragraph"}>
              {courseId
                ? `${translate("EDITING")} '${courseToUpdate?.name}'`
                : translate("CREATE_COURSE_MODAL_TITLE")}
            </ModalHeader>
            <ModalBody marginBottom={3}>
              <Stack spacing={4}>
                <CustomInput
                  name="name"
                  label="NAME"
                  isRequired={true}
                  placeholder={translate("NAME")}
                />

                <CustomInput
                  name="scheduleStartTime"
                  label="COURSE_SCHEDULE"
                  isRequired={false}
                  type="time"
                />

                <CustomInput
                  name="scheduleEndTime"
                  label="COURSE_END_SCHEDULE"
                  isRequired={false}
                  type="time"
                />

                <Select
                  name="scheduleDates"
                  label="COURSE_DATES"
                  isRequired={false}
                  placeholder={translate("COURSE_DATES")}
                  options={DateTimeUtils.daysToMultiSelectOption(daysOfTheWeek)}
                  isMultiSelect={true}
                  closeMenuOnSelect={true}
                  rules={{ required: false }}
                />

                <Select
                  name="scheduleYear"
                  label="COURSE_YEAR"
                  isRequired={true}
                  options={[
                    ...renderMultiSelectOptions(
                      years.map((year) => year.toString())
                    ),
                    {
                      label: "No year",
                      value: "",
                      colorScheme: "brand",
                    },
                  ]}
                  isMultiSelect={false}
                  closeMenuOnSelect={true}
                />

                <Checkbox
                  isChecked={!!watch("isVirtual")}
                  size="lg"
                  colorScheme="brand"
                  {...register("isVirtual")}
                >
                  {translate("VIRTUAL_COURSE")}
                </Checkbox>
                {watch("isVirtual") && (
                  <Text>{translate("VIRTUAL_COURSE_EXPLANATION")}</Text>
                )}
                <Select
                  name="type"
                  label="COURSE_TYPE"
                  isRequired={true}
                  options={renderMultiSelectOptions(
                    Object.values(CourseType).map((type) => type.toString())
                  )}
                  isMultiSelect={false}
                  closeMenuOnSelect={true}
                />
              </Stack>
            </ModalBody>
            <ModalFooter
              isLoading={isLoading}
              sendButtonText={
                courseToUpdate ? "UPDATE_COURSE_BUTTON" : "CREATE_COURSE_BUTTON"
              }
              onClose={onClose}
            />
          </form>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
};

export default CourseCRUDModal;
