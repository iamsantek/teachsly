import { useContext, useEffect, useState } from 'react'
import { translate } from '../utils/LanguageUtils'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Modal,
  Stack,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Button
} from '@chakra-ui/react'
import { Input as CustomInput } from '../components/Inputs/Input'
import { Select } from '../components/Inputs/Select'
import { ModalFooter } from '../components/Modals/ModalFooter'
import { ToastNotification } from '../observables/ToastNotification'
import { User, UserWithMultiSelect } from '../platform-models/User'
import { defaultUser } from '../constants/User'
import UserService from '../services/UserService'
import { UserTypes } from '../enums/UserTypes'
import { MdDangerous } from 'react-icons/md'
import { ConfirmationDialog } from '../components/AlertDialog/ConfirmationDialog'
import { UpdateUserInput } from '../API'
import { AiFillCheckCircle } from 'react-icons/ai'
import { renderCourseList, transformGroups } from '../utils/CourseUtils'
import { UserDashboardContext } from '../contexts/UserDashboardContext'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: User) => void;
  onUpdate: (user: User) => void;
  userToUpdate?: User;
  userType: UserTypes;
}

const formatUser = (user: UserWithMultiSelect): User => {
  const groupsArray = user.groups.map((group) => group.value)

  return {
    ...user,
    groups: groupsArray as string[]
  }
}

const UserCRUDModal = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  userToUpdate,
  userType
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] = useState<boolean>(false)

  const { context: { courses } } = useContext(UserDashboardContext)

  const formControls = useForm({
    defaultValues: defaultUser as UserWithMultiSelect
  })

  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty, dirtyFields }
  } = formControls

  const userId = watch('id')
  const isDisabledUser = watch('isDisabledUser')

  const newUserButtonName = userType === UserTypes.STUDENT ? 'CREATE_STUDENT_BUTTON' : 'CREATE_TEACHER_BUTTON'
  const editUserButtonName = userType === UserTypes.STUDENT ? 'EDIT_STUDENT_BUTTON' : 'EDIT_TEACHER_BUTTON'

  useEffect(() => {
    if (!userToUpdate) {
      reset(defaultUser as UserWithMultiSelect)
      return
    }

    const mappedValues = transformGroups(courses, userToUpdate.groups)

    const user: UserWithMultiSelect = {
      ...userToUpdate,
      groups: mappedValues
    }

    reset(user)
  }, [userToUpdate])

  useEffect(() => {
    if (!isOpen) {
      reset(defaultUser as UserWithMultiSelect)
    }
  }, [isOpen])

  const createUser = async (user: UserWithMultiSelect) => {
    const formattedUser = formatUser(user)
    const createdUser = await UserService.createUser(formattedUser, userType)

    if (createdUser) {
      onCreate(formattedUser)
      ToastNotification({
        status: 'SUCCESS',
        description: userType === UserTypes.STUDENT ? 'STUDENT_CREATED_MESSAGE' : 'TEACHER_CREATED_MESSAGE'
      })
    } else {
      ToastNotification({
        status: 'ERROR',
        description: 'USER_CREATED_ERROR'
      })
    }

    setIsLoading(false)
    onClose()
  }

  const updateUser = async (user: UpdateUserInput) => {
    const updatedFields = Object.keys(dirtyFields)
    if (!isDirty && !!updatedFields) {
      return
    }

    const shouldUpdateGroups = Object.keys(dirtyFields).includes('groups')
    const updateUserResponse = await UserService.updateUser(user, shouldUpdateGroups, userToUpdate?.groups as string[])

    if (updateUserResponse) {
      onUpdate(updateUserResponse.updateUser as User)
    }

    ToastNotification({
      description: updateUserResponse ? 'USER_UPDATE_SUCCESS' : 'USER_UPDATE_ERROR',
      status: updateUserResponse ? 'SUCCESS' : 'ERROR'
    })

    setIsLoading(false)
    onClose()
  }

  const onSubmit = (user: UserWithMultiSelect) => {
    setIsLoading(true)
    const hasErrors = Object.keys(errors).length !== 0

    if (hasErrors) {
      // TODO: Implement form errors
      console.log(errors)
      setIsLoading(false)
      return
    }

    const updatedUser = formatUser(user)

    userId ? updateUser(updatedUser) : createUser(user)
  }

  const modalTitle = () => {
    const newUserModalTitle = translate(userType === UserTypes.STUDENT ? 'CREATE_STUDENT_MODAL_TITLE' : 'CREATE_TEACHER_MODAL_TITLE')

    return userId ? `${translate('EDITING')} '${userToUpdate?.name}'` : newUserModalTitle
  }

  const toggleAccountStatus = () => {
    setShowDeleteUserConfirmation(false)
    const user: UpdateUserInput = formatUser(watch())
    const disabledUser = {
      ...user,
      isDisabledUser: !isDisabledUser
    }

    updateUser(disabledUser)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle={'paragraph'}>
          {modalTitle()}
        </ModalHeader>
        <ModalBody marginBottom={3}>
          <FormProvider {...formControls}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Stack spacing={4}>
                  <CustomInput
                    name="name"
                    label="NAME"
                    isRequired={true}
                    placeholder={translate('NAME')}
                  />
                  <CustomInput
                    name="email"
                    label="EMAIL"
                    isRequired={true}
                    placeholder={translate('EMAIL')}
                    isDisabled={!!userToUpdate}
                  />

                  <CustomInput
                    name='phone'
                    label='PHONE_NUMBER'
                    isRequired={true}
                    type='tel'
                    placeholder={translate('PHONE_NUMBER')}
                    bottomNote={translate('PHONE_NUMBER_HELPER_TEXT')}
                  />

                  <Select
                    name="groups"
                    label="COURSES"
                    isRequired={true}
                    placeholder={translate('COURSES')}
                    options={renderCourseList(courses)}
                    isMultiSelect
                    closeMenuOnSelect={true}
                  />
                </Stack>
                <ConfirmationDialog
                  isOpen={showDeleteUserConfirmation}
                  onClose={() => setShowDeleteUserConfirmation(false)}
                  title={isDisabledUser ? 'ACTIVE_USER_BUTTON' : 'DEACTIVATED_USER_BUTTON'}
                  description={isDisabledUser ? 'ACTIVE_USER_DESCRIPTION' : 'DEACTIVATED_USER_DESCRIPTION'}
                  confirmButtonText={isDisabledUser ? 'ACTIVE_USER_BUTTON' : 'DEACTIVATED_USER_BUTTON'}
                  onAction={toggleAccountStatus}
                />
              </ModalBody>
              <ModalFooter
                isLoading={isLoading}
                sendButtonText={userToUpdate ? editUserButtonName : newUserButtonName}
                onClose={onClose}
              >
                {userToUpdate && (
                  <Button

                    onClick={() => setShowDeleteUserConfirmation(true)}
                    leftIcon={isDisabledUser ? <AiFillCheckCircle /> : <MdDangerous />}
                  >
                    {translate(isDisabledUser ? 'ACTIVE_USER_BUTTON' : 'DEACTIVATED_USER_BUTTON')}
                  </Button>
                )}
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UserCRUDModal
