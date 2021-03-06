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
  Button,
  Divider,
  VStack,
  Text,
  Flex
} from '@chakra-ui/react'
import { Input as CustomInput } from '../components/Inputs/Input'
import { Select } from '../components/Inputs/Select'
import { ModalFooter } from '../components/Modals/ModalFooter'
import { ToastNotification } from '../observables/ToastNotification'
import { UserWithMultiSelect } from '../platform-models/User'
import { CreateUserInput, UpdateUserInput, User } from '../API'
import { defaultUser } from '../constants/User'
import UserService from '../services/UserService'
import { UserTypes } from '../enums/UserTypes'
import { MdDangerous } from 'react-icons/md'
import { GrPowerReset } from 'react-icons/gr'
import { ConfirmationDialog } from '../components/AlertDialog/ConfirmationDialog'
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

function formatUser (user: UserWithMultiSelect) {
  const groupsArray = user?.groups?.map((group) => group.value)

  return {
    ...user,
    groups: groupsArray as string[]
  } as CreateUserInput | UpdateUserInput
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
    const formattedUser = formatUser(user) as CreateUserInput
    const createdUser = await UserService.createUser(formattedUser, userType)

    if (createdUser) {
      onCreate(createdUser)
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

    userId ? updateUser(updatedUser as UpdateUserInput) : createUser(user)
  }

  const modalTitle = () => {
    const newUserModalTitle = translate(userType === UserTypes.STUDENT ? 'CREATE_STUDENT_MODAL_TITLE' : 'CREATE_TEACHER_MODAL_TITLE')

    return userId ? `${translate('EDITING')} '${userToUpdate?.name}'` : newUserModalTitle
  }

  const toggleAccountStatus = () => {
    setShowDeleteUserConfirmation(false)
    const user = formatUser(watch())
    const disabledUser = {
      ...user,
      isDisabledUser: !isDisabledUser
    }

    updateUser(disabledUser as UpdateUserInput)
  }

  const resetPassword = async () => {
    const resetPasswordResponse = await UserService.resetPassword(userToUpdate?.cognitoId as string)
    setIsLoading(true)

    if (resetPasswordResponse?.$metadata.httpStatusCode === 200) {
      ToastNotification({
        status: 'SUCCESS',
        description: 'PASSWORD_RESET_SUCCESS'
      })
    } else {
      ToastNotification({
        status: 'ERROR',
        description: 'PASSWORD_RESET_ERROR'
      })
    }

    setIsLoading(false)
    onClose()
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
                {userToUpdate && (
                  <Flex gap={4} direction='column' align='flex-start'>
                    <Divider />
                    <VStack spacing={3} align='flex-start'>
                      <Text fontWeight='bold' fontSize='medium'>Acciones</Text>
                      <Button
                        isLoading={isLoading}
                        w={['100%', 'auto']}
                        onClick={() => setShowDeleteUserConfirmation(true)}
                        leftIcon={isDisabledUser ? <AiFillCheckCircle /> : <MdDangerous />}
                      >
                        {translate(isDisabledUser ? 'ACTIVE_USER_BUTTON' : 'DEACTIVATED_USER_BUTTON')}
                      </Button>
                      <Button
                        leftIcon={<GrPowerReset />}
                        w={['100%', 'auto']}
                        isLoading={isLoading}
                        onClick={() => resetPassword()}
                      >
                        {translate('RESET_PASSWORD_BUTTON')}
                      </Button>
                    </VStack>
                  </Flex>
                )}
              </ModalBody>
              <ModalFooter
                isLoading={isLoading}
                sendButtonText={userToUpdate ? editUserButtonName : newUserButtonName}
                onClose={onClose}
              >
              </ModalFooter>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default UserCRUDModal
