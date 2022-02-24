import * as React from 'react'
import { useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, Form } from 'reactstrap'
import { CustomButton } from '../components/Buttons/CustomButton'
import { defaultCreateStudentModal } from '../constants/Modal'
import {
  AlertNotification,
  MessageLevel
} from '../interfaces/AlertNotification'
import { translate } from '../utils/LanguageUtils'
import { CustomInput } from '../components/Inputs/CustomInput'
import UserService from '../services/UserService'
import { User as PlatformUser, User } from '../platform-models/User'
import { UserTypes } from '../enums/UserTypes'
import { renderCognitoGroupsList } from '../utils/CognitoGroupsUtils'
import { GroupType } from '@aws-sdk/client-cognito-identity-provider'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userType: UserTypes;
  cognitoGroups: GroupType[];
}

const CreateUserModal = (props: Props) => {
  const [user, setNewUser] = useState<PlatformUser>({
    ...defaultCreateStudentModal,
    type: props.userType
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleeOnChange = (
    inputName: keyof PlatformUser,
    inputValue: string
  ) => {
    const updatedStudent: PlatformUser = { ...user };

    (updatedStudent as any)[inputName] = inputValue

    setNewUser(updatedStudent)
  }

  const createUser = async () => {
    // Add specific group via the Modal prop.
    const updatedUser: PlatformUser = {
      ...user,
      groups: [...user.groups, props.userType]
    }

    const createdUser = await UserService.createUser(new User(updatedUser))

    if (createdUser) {
      props.onClose()
      setIsLoading(false)

      new AlertNotification(
        MessageLevel.SUCCESS,
        translate('STUDENT_CREATED_MESSAGE')
      )
    }
  }

  const handleCoursesChange = (event: any) => {
    const courses = Array.from(
      event.target.selectedOptions,
      (option: any) => option.value
    )
    setNewUser({ ...user, groups: courses })
  }

  const updateHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    handleeOnChange(event.target.name as keyof User, event.target.value)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }

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
        <Form onSubmit={(e) => handleSubmit(e)}>
          <h2>Alta de estudiante</h2>
          <CustomInput
            labelName={translate('NAME')}
            value={user.name}
            onChange={updateHandler}
            type="text"
            name="name"
          />
          <CustomInput
            labelName={translate('EMAIL')}
            value={user.email}
            onChange={updateHandler}
            type="text"
            name="email"
          />
          <CustomInput
            labelName={translate('COURSES')}
            value={user.groups}
            onChange={handleCoursesChange}
            type="select"
            name="courses"
            multipleSelect
          >
            {renderCognitoGroupsList(props.cognitoGroups, [])}
          </CustomInput>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.onClose}>{translate('CANCEL')}</Button>{' '}
        <CustomButton
          isLoading={isLoading}
          type={MessageLevel.INFO}
          buttonType="submit"
          onClick={createUser}
        >
          {translate('CREATE_STUDENT_BUTTON')}
        </CustomButton>
      </ModalFooter>
    </Modal>
  )
}
export default CreateUserModal
