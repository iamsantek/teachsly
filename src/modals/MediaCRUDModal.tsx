import { memo, useCallback, useContext, useEffect, useState } from "react";
import * as React from "react";
import { translate } from "../utils/LanguageUtils";
import { MediaWithMultiSelect } from "../interfaces/Media";
import StorageService from "../services/aws/StorageService";
import MediaService from "../services/MediaService";
import { FormProvider, useForm } from "react-hook-form";
import {
  Modal,
  Stack,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  useColorModeValue,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Input as CustomInput } from "../components/Inputs/Input";
import { TextArea } from "../components/Inputs/TextArea";
import { Select } from "../components/Inputs/Select";
import {
  mapSingleValueToMultiSelectOption,
  renderMultiSelectOptions,
} from "../utils/SelectUtils";
import { MediaType } from "../models";
import { FileUploader } from "../components/Inputs/FileUploader";
import { PermissionsList } from "../components/Lists/PermissionsList";
import { ModalFooter } from "../components/Modals/ModalFooter";
import { defaultMedia } from "../constants/Medias";
import { UserDashboardContext } from "../contexts/UserDashboardContext";
import {
  Course,
  CreateMediaInput,
  Media as MediaAPI,
  UpdateMediaInput,
} from "../API";
import { renderCourseList, transformGroups } from "../utils/CourseUtils";
import { generalGroups, isAdmin } from "../utils/CognitoGroupsUtils";
import { useParams } from "react-router-dom";
import { recommendedMediaTypes } from "../utils/MediaUtils";
import { NotRecommendedMediaTypeWarning } from "../components/Alert/NotRecommendedMediaTypeWarning";
import { toastConfig } from "../utils/ToastUtils";
import { isNotAllowedWebsite } from "../utils/StringUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (media: MediaAPI) => void;
  onUpdate: (media: MediaAPI) => void;
  mediaToUpdate?: MediaAPI;
  folderGroups?: string[];
}

const MediaCRUDModal = ({
  isOpen,
  onClose,
  onCreate,
  onUpdate,
  mediaToUpdate,
  folderGroups,
}: Props) => {
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const { folderId } = useParams();
  const [invalidFileType, setInvalidFileType] = useState<boolean>(false);
  const toast = useToast();

  const formControls = useForm({
    defaultValues: defaultMedia as MediaWithMultiSelect,
  });

  const {
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = formControls;

  const {
    id: mediaId,
    groups: groupsSubscriber,
    type: { value: mediaType },
  } = watch();
  const {
    context: { user, courses: allCourses },
  } = useContext(UserDashboardContext);

  const onCloseModal = () => {
    reset(defaultMedia as MediaWithMultiSelect);
    setFile(undefined);
    onClose();
  };

  const fetchFolder = useCallback(async () => {
    if (!folderId) {
      return;
    }

    const updatedValues: MediaWithMultiSelect = {
      ...watch(),
      groups: transformGroups(courses, folderGroups as string[]),
    };

    reset(updatedValues);
  }, [reset, watch, courses, folderGroups, folderId]);

  useEffect(() => {
    const filterCourses = async () => {
      const hasRoleAdmin = isAdmin(user);

      setCourses(
        hasRoleAdmin
          ? allCourses
          : allCourses.filter((course) =>
              user?.groups.includes(course.externalId)
            )
      );
    };

    filterCourses();
  }, [allCourses, user]);

  useEffect(() => {
    fetchFolder();
  }, [folderId, fetchFolder, isOpen]);

  useEffect(() => {
    if (!mediaToUpdate) {
      reset(defaultMedia as MediaWithMultiSelect);
      return;
    }

    const mappedValues = transformGroups(courses, mediaToUpdate.groups);
    const type = mapSingleValueToMultiSelectOption(mediaToUpdate.type);

    const media: MediaWithMultiSelect = {
      ...mediaToUpdate,
      groups: mappedValues,
      type,
    };

    reset(media);
  }, [mediaToUpdate, courses, reset]);

  useEffect(() => {
    if (!isOpen) {
      reset(defaultMedia as MediaWithMultiSelect);
    }
  }, [isOpen, reset]);

  useEffect(() => {
    setFile(undefined);
    setInvalidFileType(false);
  }, [mediaType]);

  const formatMedia = (
    media: MediaWithMultiSelect
  ): CreateMediaInput | UpdateMediaInput => {
    const groupsArray = media.groups.map((group) => group.value);
    const type = media.type.value as MediaType;

    return {
      ...media,
      folderId,
      groups: groupsArray as string[],
      type,
      mimeType: type === MediaType.LINK ? "application/link" : file?.type,
      uploadedBy: user?.name || "",
    };
  };

  const createMedia = async (media: MediaWithMultiSelect) => {
    setIsLoading(true);

    const formattedMedia = formatMedia(media) as CreateMediaInput;
    const uploadedMedia = await StorageService.persistMedia(
      formattedMedia,
      file
    );

    if (uploadedMedia?.createMedia) {
      onCreate(uploadedMedia.createMedia as MediaAPI);
    }

    onCloseModal();
    setIsLoading(false);

    toast(
      toastConfig({
        description: uploadedMedia?.createMedia
          ? "MEDIA_CREATED_MESSAGE"
          : "MEDIA_CREATED_FAILED_MESSAGE",
        status: uploadedMedia?.createMedia ? "success" : "error",
      })
    );
  };

  const updateMedia = async (media: MediaWithMultiSelect) => {
    const mediaWithGroups = formatMedia(media);
    const updatedMedia = await MediaService.updateMedia(
      mediaWithGroups as UpdateMediaInput
    );

    if (updatedMedia?.updateMedia) {
      onUpdate(updatedMedia.updateMedia as MediaAPI);
    }

    toast(
      toastConfig({
        description: updatedMedia?.updateMedia
          ? "MEDIA_UPDATED_MESSAGE"
          : "MEDIA_UPDATED_ERROR_MESSAGE",
        status: updatedMedia?.updateMedia ? "success" : "error",
      })
    );

    setIsLoading(false);
    onCloseModal();
  };

  const onChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (!recommendedMediaTypes.includes(file.type)) {
      setFile(undefined);
      setInvalidFileType(true);
      return;
    }

    setInvalidFileType(false);
    setFile(file);
  };

  const onSubmit = (media: MediaWithMultiSelect) => {
    const isDriveLink = [
      isNotAllowedWebsite(media.link),
      isNotAllowedWebsite(media.title),
      isNotAllowedWebsite(media.description),
    ].some(Boolean);

    if (isDriveLink) {
      toast(
        toastConfig({
          description: "DRIVE_LINK_NOT_ALLOWED",
          status: "error",
        })
      );
      return;
    }

    const hasErrors = Object.keys(errors).length !== 0;

    if (hasErrors) {
      // TODO: Implement form errors
      console.log(errors);
      setIsLoading(false);
      return;
    }

    mediaId ? updateMedia(media) : createMedia(media);
  };

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          textStyle={"paragraph"}
          color={useColorModeValue("black", "white")}
        >
          {mediaId
            ? `${translate("EDITING")} '${mediaToUpdate?.title}'`
            : translate("MEDIA_UPLOAD_MODAL_TITLE")}
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
                    placeholder={translate("TITLE")}
                  />
                  <CustomInput
                    name="description"
                    label="DESCRIPTION"
                    isRequired={true}
                    placeholder={translate("DESCRIPTION")}
                  />

                  <Select
                    name="groups"
                    label="GROUP_MULTI_SELECT_TITLE"
                    isRequired={true}
                    placeholder={translate("DESCRIPTION")}
                    options={renderCourseList({
                      courses,
                      additionalGroups: generalGroups,
                      includeEnglishLevels: true,
                    })}
                    isMultiSelect
                    closeMenuOnSelect={true}
                    isDisabled={!!folderId}
                  />

                  {folderId && (
                    <Text as="i" color="gray.500">
                      {translate("FOLDER_GROUPS_HELPER_TEXT")}
                    </Text>
                  )}

                  <Select
                    name="type"
                    label="TYPE"
                    isRequired={true}
                    placeholder={translate("TYPE")}
                    options={renderMultiSelectOptions(Object.values(MediaType))}
                    isMultiSelect={false}
                    closeMenuOnSelect={true}
                    isDisabled={!!mediaToUpdate}
                  />

                  {mediaType === MediaType.FILE && !mediaToUpdate && (
                    <FileUploader
                      name="file"
                      onChange={onChangeFile}
                      label="ATTACH_FILE"
                    />
                  )}
                  {invalidFileType && mediaType === MediaType.FILE && (
                    <NotRecommendedMediaTypeWarning />
                  )}
                  <Box
                    display={
                      [MediaType.LINK].includes(mediaType as MediaType)
                        ? "inline-block"
                        : "none"
                    }
                    w="100%"
                  >
                    <CustomInput
                      name="link"
                      label="MEDIA_LINK_DESCRIPTION"
                      isRequired={[MediaType.LINK].includes(
                        mediaType as MediaType
                      )}
                      placeholder={translate("MEDIA_LINK_DESCRIPTION")}
                    />
                  </Box>

                  <TextArea
                    name="content"
                    label="COMMENTARIES"
                    isRequired={false}
                    placeholder={translate("COMMENTARIES")}
                  />

                  <PermissionsList
                    title={translate("REVIEW_PERMISSIONS")}
                    permissionsGroups={groupsSubscriber}
                  />
                </Stack>
              </ModalBody>
              <ModalFooter
                isLoading={isLoading}
                isDisabled={invalidFileType}
                sendButtonText={
                  mediaId ? "UPDATE_MEDIA_BUTTON" : "CREATE_MEDIA_BUTTON"
                }
                onClose={onCloseModal}
              />
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default memo(MediaCRUDModal);
