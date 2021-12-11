import { useState } from "react";
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { CustomButton } from "../components/Buttons/CustomButton";
import { defaultCreateStudentModal } from "../constants/modals";
import {
  AlertNotification,
  MessageLevel,
} from "../interfaces/AlertNotification";
import { ObservableTopics } from "../interfaces/ObservableTopics";
import { StudentCreation } from "../interfaces/Student";
import ObservableService from "../observables/ObservableService";
import { translate } from "../utils/LanguageUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateStudentModal = (props: Props) => {
  const [student, setNewStudent] = useState<StudentCreation>(
    defaultCreateStudentModal
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleeOnChange = (
    inputName: keyof StudentCreation,
    inputValue: string
  ) => {
    const updatedStudent: StudentCreation = { ...student };

    (updatedStudent as any)[inputName] = inputValue;

    setNewStudent(updatedStudent);
  };

  const createStudent = async () => {
    console.log(student);
    setIsLoading(true);
    // const createdStudent = await UserService.createStudent(
    //     student.email,
    //     student.password,
    //     student.name
    // )

    if (true) {
      props.onClose();
      setIsLoading(false);

      const alert: AlertNotification = {
        type: MessageLevel.WARNING,
        message: "Esto es una prueba",
      };

      ObservableService.notifyListeners(
        ObservableTopics.NotificationAlert,
        alert
      );
    }
  };

  const handleCoursesChange = (e: any) => {
    const courses = Array.from(
      e.target.selectedOptions,
      (option: any) => option.value
    );
    setNewStudent({ ...student, courses });
  };

  return (
    <Modal
      centered
      fullscreen=""
      scrollable
      size="lg"
      toggle={props.onClose}
      isOpen={props.isOpen}
    >
      <ModalHeader>Alta de usuario</ModalHeader>
      <ModalBody>
        <Label for="exampleEmail">{translate("NAME")}</Label>
        <Input
          bsSize="sm"
          name="name"
          value={student.name}
          onChange={(e) =>
            handleeOnChange(
              e.target.name as keyof StudentCreation,
              e.target.value
            )
          }
        />
        <Label for="exampleEmail">{translate("EMAIL")}</Label>
        <Input
          bsSize="sm"
          className="my-2"
          autoComplete="false"
          name="email"
          value={student.email}
          onChange={(e) =>
            handleeOnChange(
              e.target.name as keyof StudentCreation,
              e.target.value
            )
          }
        />
        <Label for="exampleEmail">{translate("PASSWORD")}</Label>
        <Input
          bsSize="sm"
          name="password"
          type="password"
          autoComplete="new-password"
          value={student.password}
          onChange={(e) =>
            handleeOnChange(
              e.target.name as keyof StudentCreation,
              e.target.value
            )
          }
        />
        <Label for="exampleEmail">{translate("PASSWORD")}</Label>
        <Input
          id="courses"
          multiple
          name="courses"
          type="select"
          onChange={handleCoursesChange}
        >
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.onClose}>{translate("CANCEL")}</Button>{" "}
        <CustomButton
          isLoading={isLoading}
          onClick={createStudent}
          type={MessageLevel.INFO}
        >
          {translate("CREATE_STUDENT_BUTTON")}
        </CustomButton>
      </ModalFooter>
    </Modal>
  );
};
export default CreateStudentModal;
