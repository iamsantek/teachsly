import { useEffect, useState } from 'react'
import { translate } from '../utils/LanguageUtils'
import { GroupType } from '@aws-sdk/client-cognito-identity-provider'
import {
  mapSelectedCognitoGroups,
  renderUserGroups
} from '../utils/CognitoGroupsUtils'
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
import UserGroupsService from '../services/UserGroupsService'
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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (user: User) => void;
  onUpdate: (user: User) => void;
  userToUpdate?: User;
  userType: UserTypes;
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
  const [userGroups, setUserGroups] = useState<GroupType[]>([])
  const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] = useState<boolean>(false)

  const formControls = useForm({
    defaultValues: defaultUser as UserWithMultiSelect
  })

  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors }
  } = formControls

  const userId = watch('id')
  const isDisabledUser = watch('isDisabledUser')

  useEffect(() => {
    const fetchCognitoGroups = async () => {
      const groups = await UserGroupsService.getUserGroups()
      setUserGroups(groups || [])
    }

    fetchCognitoGroups()
  }, [])

  useEffect(() => {
    if (userToUpdate) {
      const mappedValues = mapSelectedCognitoGroups(
        userGroups,
        userToUpdate.groups
      )

      const user: UserWithMultiSelect = {
        ...userToUpdate,
        groups: mappedValues
      }

      reset(user)
    }
  }, [userToUpdate])

  useEffect(() => {
    if (!isOpen) {
      reset(defaultUser as UserWithMultiSelect)
    }
  }, [isOpen])

  const formatUser = (user: UserWithMultiSelect) => {
    const groupsArray = user.groups.map((group) => group.value)

    return {
      ...user,
      groups: groupsArray as string[]
    }
  }

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
    const updatedUser = await UserService.updateUser(user)

    if (updatedUser) {
      onUpdate(updatedUser.updateUser as User)
    }

    ToastNotification({
      description: updatedUser ? 'USER_UPDATE_SUCCESS' : 'USER_UPDATE_ERROR',
      status: updatedUser ? 'SUCCESS' : 'ERROR'
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

  const newUserButtonName = userType === UserTypes.STUDENT ? 'CREATE_STUDENT_BUTTON' : 'CREATE_TEACHER_BUTTON'
  const editUserButtonName = userType === UserTypes.STUDENT ? 'EDIT_STUDENT_BUTTON' : 'EDIT_TEACHER_BUTTON'

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
                  />

                  <CustomInput
                    name='phone'
                    label='PHONE_NUMBER'
                    isRequired={true}
                    type='tel'
                    placeholder={translate('PHONE_NUMBER')}
                  />

                  <Select
                    name="groups"
                    label="COURSES"
                    isRequired={true}
                    placeholder={translate('COURSES')}
                    options={renderUserGroups(userGroups, Object.values(UserTypes))}
                    isMultiSelect
                    closeMenuOnSelect={false}
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
