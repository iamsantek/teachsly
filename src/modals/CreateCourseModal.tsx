import { useState } from "react";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { CustomButton } from "../components/Buttons/CustomButton";
import {
  AlertNotification,
  MessageLevel,
} from "../interfaces/AlertNotification";
import { translate } from "../utils/LanguageUtils";
import { CustomInput } from "../components/Inputs/CustomInput";
import { defaultCourse } from "../constants/Course";
import CourseService from "../services/CourseService";
import { Course as PlatformCourse } from "../platform-models/Course";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const daysOfTheWeek = translate("DAYS_OF_THE_WEEK").split(",");

const sortDaysOfTheWeek = (unsortedDaysOfTheWeek: string[]) => {
  return unsortedDaysOfTheWeek.sort(
    (day1, day2) => daysOfTheWeek.indexOf(day1) - daysOfTheWeek.indexOf(day2)
  );
};

const CreateCourseModal = (props: Props) => {
  const [course, setCourse] = useState<PlatformCourse>(defaultCourse);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onInputChange = (
    inputName: keyof PlatformCourse,
    inputValue: string | boolean
  ) => {
    const updatedStudent: PlatformCourse = { ...course };

    (updatedStudent as any)[inputName] = inputValue;

    setCourse(updatedStudent);
  };

  const onCheckboxChange = (inputName: string, inputValue: boolean) => {
    let updatedDates = [...course.scheduleDates];

    if (!inputValue) {
      updatedDates = updatedDates.filter((i) => i !== inputName);
    } else {
      updatedDates.push(inputName);
    }

    setCourse({
      ...course,
      scheduleDates: sortDaysOfTheWeek(updatedDates),
    });
  };

  const createCourse = async () => {
    setIsLoading(true);

    const createdCourse = await CourseService.createCourse(course);

    if (createdCourse) {
      props.onClose();
      setIsLoading(false);

      new AlertNotification(
        MessageLevel.SUCCESS,
        translate("COURSE_CREATED_MESSAGE")
      );
    }
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    onInputChange(
      event.target.name as keyof PlatformCourse,
      event.target.value
    );

  const checkboxHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    onCheckboxChange(
      event.target.name as keyof PlatformCourse,
      event.target.checked
    );

  const generateDayCheckboxes = () =>
    daysOfTheWeek.map((day: string) => (
      <FormGroup check inline key={day}>
        <Input type="checkbox" name={day} onChange={checkboxHandler} />
        <Label check>{day}</Label>
      </FormGroup>
    ));

  return (
    <Modal
      centered
      fullscreen=""
      scrollable
      size="lg"
      toggle={props.onClose}
      isOpen={props.isOpen}
    >
      <ModalBody>
        <h2>{translate("CREATE_COURSE_MODAL_TITLE")}</h2>
        <CustomInput
          labelName={translate("COURSE_NAME")}
          value={course.name}
          onChange={inputHandler}
          type="text"
          name="name"
        />
        {generateDayCheckboxes()}
        <CustomInput
          labelName={translate("COURSE_SCHEDULE")}
          value={course.scheduleStartTime}
          onChange={inputHandler}
          type="time"
          name="scheduleStartTime"
        />
        <CustomInput
          labelName={translate("COURSE_SCHEDULE")}
          value={course.scheduleEndTime}
          onChange={inputHandler}
          type="time"
          name="scheduleEndTime"
        />
        <FormGroup check inline>
          <Input
            type="checkbox"
            name="isVirtual"
            onChange={(e) =>
              onInputChange(
                e.target.name as keyof PlatformCourse,
                e.target.checked
              )
            }
          />
          <Label check>Curso Virtual</Label>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.onClose}>{translate("CANCEL")}</Button>{" "}
        <CustomButton
          isLoading={isLoading}
          onClick={createCourse}
          type={MessageLevel.INFO}
        >
          {translate("CREATE_COURSE_BUTTON")}
        </CustomButton>
      </ModalFooter>
    </Modal>
  );
};

export default CreateCourseModal;
