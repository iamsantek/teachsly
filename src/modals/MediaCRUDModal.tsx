import { memo, useContext, useEffect, useState } from 'react'
import * as React from 'react'
import { translate } from '../utils/LanguageUtils'
import { Media, MediaWithMultiSelect } from '../interfaces/Media'
import StorageService from '../services/aws/StorageService'
import { GroupType } from '@aws-sdk/client-cognito-identity-provider'
import {
  mapSelectedCognitoGroups,
  renderUserGroups
} from '../utils/CognitoGroupsUtils'
import MediaService from '../services/MediaService'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Modal,
  Stack,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useColorModeValue
} from '@chakra-ui/react'
import { Input as CustomInput } from '../components/Inputs/Input'
import { TextArea } from '../components/Inputs/TextArea'
import { Select } from '../components/Inputs/Select'
import {
  mapSingleValueToMultiSelectOption,
  renderMultiSelectOptions
} from '../utils/SelectUtils'
import { MediaType } from '../models'
import { FileUploader } from '../components/Inputs/FileUploader'
import { PermissionsList } from '../components/Lists/PermissionsList'
import UserGroupsService from '../services/UserGroupsService'
import { ModalFooter } from '../components/Modals/ModalFooter'
import { defaultMedia } from '../constants/Medias'
import { ToastNotification } from '../observables/ToastNotification'
import { UserDashboardContext } from '../contexts/UserDashboardContext'

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (media: Media) => void;
  onUpdate: (media: Media) => void;
  mediaToUpdate?: Media;
}

const MediaCRUDModal = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  mediaToUpdate
}: Props) => {
  const [file, setFile] = useState<File>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [userGroups, setUserGroups] = useState<GroupType[]>([])

  const formControls = useForm({
    defaultValues: defaultMedia as MediaWithMultiSelect
  })

  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors }
  } = formControls

  const groupsSubscriber = watch('groups')
  const mediaId = watch('id')
  const { value: mediaType } = watch('type')

  const { user } = useContext(UserDashboardContext)

  useEffect(() => {
    const fetchCognitoGroups = async () => {
      const groups = await UserGroupsService.getUserGroups()
      setUserGroups(groups || [])
    }

    fetchCognitoGroups()
  }, [])

  useEffect(() => {
    if (!mediaToUpdate) {
      reset(defaultMedia as MediaWithMultiSelect)
      return
    }

    const mappedValues = mapSelectedCognitoGroups(
      userGroups,
      mediaToUpdate.groups
    )
    const type = mapSingleValueToMultiSelectOption(mediaToUpdate.type)

    const media: MediaWithMultiSelect = {
      ...mediaToUpdate,
      groups: mappedValues,
      type
    }

    reset(media)
  }, [mediaToUpdate])

  useEffect(() => {
    if (!isOpen) {
      reset(defaultMedia as MediaWithMultiSelect)
    }
  }, [isOpen])

  const formatMedia = (media: MediaWithMultiSelect): Media => {
    const groupsArray = media.groups.map((group) => group.value)
    const type = media.type.value as MediaType

    return {
      ...media,
      groups: groupsArray as string[],
      type
    }
  }

  const createMedia = async (media: MediaWithMultiSelect) => {
    setIsLoading(true)

    const formattedMedia = formatMedia(media)
    const uploadedMedia = await StorageService.persistMedia(
      formattedMedia,
      file
    )

    if (uploadedMedia) {
      onCreate(uploadedMedia)
    }

    onClose()
    setIsLoading(false)

    if (!uploadedMedia) {
      ToastNotification({
        description: 'MEDIA_CREATED_FAILED_MESSAGE',
        status: 'ERROR'
      })
    }

    ToastNotification({
      description: 'MEDIA_CREATED_MESSAGE',
      status: 'SUCCESS'
    })
  }

  const updateMedia = async (media: MediaWithMultiSelect) => {
    const mediaWithGroups = formatMedia(media)
    const updatedMedia = await MediaService.updateMedia(mediaWithGroups)

    if (updatedMedia) {
      onUpdate(updatedMedia)
      ToastNotification({
        description: 'MEDIA_UPDATED_MESSAGE',
        status: 'SUCCESS'
      })
    } else {
      ToastNotification({
        description: 'MEDIA_UPDATED_ERROR_MESSAGE',
        status: 'ERROR'
      })
    }

    setIsLoading(false)
    onClose()
  }

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return
    }

    setFile(event.target.files[0])
  }

  const onSubmit = (media: MediaWithMultiSelect) => {
    setIsLoading(true)
    const hasErrors = Object.keys(errors).length !== 0

    if (hasErrors) {
      // TODO: Implement form errors
      console.log(errors)
      setIsLoading(false)
      return
    }

    mediaId ? updateMedia(media) : createMedia(media)
  }

  const selectGroupOptions = () => {
    const filteredGroups = userGroups.filter(group => !user?.groups.includes(group.GroupName as string))

    return renderUserGroups(filteredGroups)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textStyle={'paragraph'} color={useColorModeValue('black', 'white')}>
          {mediaId
            ? `${translate('EDITING')} '${mediaToUpdate?.title}'`
            : translate('MEDIA_UPLOAD_MODAL_TITLE')}
        </ModalHeader>
        <ModalBody marginBottom={3}>
          <FormProvider {...formControls}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Stack spacing={4}>
                  <CustomInput
                    name="title"
                    label="TITLE"
                    isRequired={true}
                    placeholder={translate('TITLE')}
                  />
                  <CustomInput
                    name="description"
                    label="DESCRIPTION"
                    isRequired={true}
                    placeholder={translate('DESCRIPTION')}
                  />

                  <Select
                    name="groups"
                    label="GROUP_MULTI_SELECT_TITLE"
                    isRequired={true}
                    placeholder={translate('DESCRIPTION')}
                    options={selectGroupOptions()}
                    isMultiSelect
                    closeMenuOnSelect={false}
                  />

                  <Select
                    name="type"
                    label="TYPE"
                    isRequired={true}
                    placeholder={translate('TYPE')}
                    options={renderMultiSelectOptions(Object.values(MediaType))}
                    isMultiSelect={false}
                    closeMenuOnSelect={true}
                  />

                  {mediaType === MediaType.PDF && (
                    <FileUploader
                      name="file"
                      onChange={onChangeFile}
                      label="ATTACH_FILE"
                    />
                  )}
                 {[MediaType.LINK, MediaType.VIDEO].includes(mediaType as MediaType) && (
                  <CustomInput
                    name="link"
                    label="MEDIA_LINK_DESCRIPTION"
                    isRequired={true}
                    placeholder={translate('MEDIA_LINK_DESCRIPTION')}
                  />
                 )}

                  <TextArea
                    name="content"
                    label="COMMENTARIES"
                    isRequired={false}
                    placeholder={translate('COMMENTARIES')}
                  />

                  <PermissionsList
                    title={translate('REVIEW_PERMISSIONS')}
                    permissionsGroups={groupsSubscriber}
                  />
                </Stack>
              </ModalBody>
              <ModalFooter
                isLoading={isLoading}
                sendButtonText={
                  mediaId ? 'UPDATE_MEDIA_BUTTON' : 'CREATE_MEDIA_BUTTON'
                }
                onClose={onClose}
              />
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default memo(MediaCRUDModal)
