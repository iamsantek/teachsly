import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { CustomButton } from "../components/Buttons/CustomButton";
import { defaultCreateStudentModal } from "../constants/modals";
import {
  AlertNotification,
  MessageLevel,
} from "../interfaces/AlertNotification";
import { translate } from "../utils/LanguageUtils";
import { CustomInput } from "../components/Inputs/CustomInput";
import CourseService from "../services/CourseService";
import { Course as PlatformCourse } from "../platform-models/Course";
import UserService from "../services/UserService";
import { User as PlatformUser, User } from "../platform-models/User";
import { UserTypes } from "../enums/UserTypes";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userType: UserTypes;
}

const CreateUserModal = (props: Props) => {
  const [user, setNewUser] = useState<PlatformUser>({
    ...defaultCreateStudentModal,
    type: props.userType,
  });
  const [courses, setCourses] = useState<PlatformCourse[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await CourseService.fetchCourses();
      if (courses) {
        console.log(courses);
        setCourses(courses as PlatformCourse[]);
      }
    };

    fetchCourses();
  }, []);

  const handleeOnChange = (
    inputName: keyof PlatformUser,
    inputValue: string
  ) => {
    const updatedStudent: PlatformUser = { ...user };

    (updatedStudent as any)[inputName] = inputValue;

    setNewUser(updatedStudent);
  };

  const createUser = async () => {
    console.log(user);
    // setIsLoading(true);
    const createdUser = await UserService.createUser(new User(user));

    if (createdUser) {
      props.onClose();
      setIsLoading(false);

      new AlertNotification(
        MessageLevel.SUCCESS,
        translate("STUDENT_CREATED_MESSAGE")
      );
    }
  };

  const handleCoursesChange = (e: any) => {
    const courses = Array.from(
      e.target.selectedOptions,
      (option: any) => option.value
    );
    setNewUser({ ...user, courses });
  };

  const updateHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleeOnChange(event.target.name as keyof User, event.target.value);

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
        <h2>Alta de estudiante</h2>
        <CustomInput
          labelName={translate("NAME")}
          value={user.name}
          onChange={updateHandler}
          type="text"
          name="name"
        />
        <CustomInput
          labelName={translate("EMAIL")}
          value={user.email}
          onChange={updateHandler}
          type="text"
          name="email"
        />
        <CustomInput
          labelName={translate("COURSES")}
          value={user.courses}
          onChange={handleCoursesChange}
          type="select"
          name="courses"
          multipleSelect
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </CustomInput>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.onClose}>{translate("CANCEL")}</Button>{" "}
        <CustomButton
          isLoading={isLoading}
          onClick={createUser}
          type={MessageLevel.INFO}
        >
          {translate("CREATE_STUDENT_BUTTON")}
        </CustomButton>
      </ModalFooter>
    </Modal>
  );
};
export default CreateUserModal;
