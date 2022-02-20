import { useEffect, useState } from "react";
import {
  AlertNotification,
  MessageLevel,
} from "../interfaces/AlertNotification";
import { translate } from "../utils/LanguageUtils";
import { Media, MediaWithMultiSelect } from "../interfaces/Media";
import { defaultMedia } from "../constants/media";
import StorageService from "../services/aws/StorageService";
import { GroupType } from "@aws-sdk/client-cognito-identity-provider";
import {
  mapSelectedCognitoGroups,
  renderAllCognitoGroups,
} from "../utils/CognitoGroupsUtils";
import MediaService from "../services/MediaService";
import { FormProvider, useForm } from "react-hook-form";
import {
  Modal,
  Stack,
  Button,
  Heading,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Input as CustomInput } from "../components/Inputs/Input";
import { TextArea } from "../components/Inputs/TextArea";
import { Select } from "../components/Inputs/Select";
import {
  mapMediaTypeToMultiSelectOption,
  renderMediaTypeList,
} from "../utils/MediaUtils";
import { MediaType } from "../models";
import { FileUploader } from "../components/Inputs/FileUploader";
import { PermissionsList } from "../components/Lists/PermissionsList";
import UserGroupsService from "../services/UserGroupsService";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (media: Media) => void;
  onUpdate: (media: Media) => void;
  mediaToUpdate?: Media;
}

const MediaCRUDModal = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [media, setMedia] = useState<MediaWithMultiSelect>(
    defaultMedia as MediaWithMultiSelect
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userGroups, setUserGroups] = useState<GroupType[]>([]);

  useEffect(() => {
    const fetchCognitoGroups = async () => {
      const groups = await UserGroupsService.getUserGroups();
      setUserGroups(groups || []);
    };

    fetchCognitoGroups();
  }, []);

  useEffect(() => {
    if (props.mediaToUpdate) {
      const mappedValues = mapSelectedCognitoGroups(
        userGroups,
        props.mediaToUpdate.groups
      );
      const type = mapMediaTypeToMultiSelectOption(props.mediaToUpdate.type);

      const media: MediaWithMultiSelect = {
        ...props.mediaToUpdate,
        groups: mappedValues,
        type,
      };

      setMedia(media);
      reset(media);
    }
  }, [props.mediaToUpdate]);

  useEffect(() => {
    if (!props.isOpen) {
      setMedia(defaultMedia as MediaWithMultiSelect);
    }
  }, [props.isOpen]);

  const createMedia = async (media: MediaWithMultiSelect) => {
    setIsLoading(true);

    const formattedMedia = formatMedia(media);
    const uploadedMedia = await StorageService.persistMedia(
      formattedMedia,
      file
    );

    if (uploadedMedia) {
      props.onCreate(uploadedMedia);
    }

    props.onClose();
    setIsLoading(false);

    if (!uploadedMedia) {
      new AlertNotification(
        MessageLevel.ERROR,
        translate("MEDIA_CREATED_FAILED_MESSAGE")
      );
    }

    new AlertNotification(
      MessageLevel.SUCCESS,
      translate("MEDIA_CREATED_MESSAGE")
    );
  };

  const formatMedia = (media: MediaWithMultiSelect): Media => {
    const groupsArray = media.groups.map((group) => group.value);
    const type = media.type.value as MediaType;

    return {
      ...media,
      groups: groupsArray as string[],
      type,
    };
  };

  const updateMedia = async (media: MediaWithMultiSelect) => {
    const mediaWithGroups = formatMedia(media);
    const updatedMedia = await MediaService.updateMedia(mediaWithGroups);

    if (updatedMedia) {
      console.log("Updated media", updatedMedia);
      props.onUpdate(updatedMedia);
      props.onClose();
    }
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    setFile(event.target.files[0]);
  };

  const formControls = useForm({
    defaultValues: media,
  });

  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = formControls;

  const groupsSubscriber = watch("groups");

  console.log(groupsSubscriber);

  //control, register, handleSubmit, reset, formState: { errors

  const onSubmit = (media: MediaWithMultiSelect) => {
    const hasErrors = Object.keys(errors).length !== 0;

    if (hasErrors) {
      console.log(errors);
      return;
    }

    props.mediaToUpdate ? updateMedia(media) : createMedia(media);
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <FormProvider {...formControls}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Heading as="h3" marginY={4} size="lg">
              {translate("MEDIA_UPLOAD_MODAL_TITLE")}
            </Heading>

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
                options={renderAllCognitoGroups(userGroups)}
                isMultiSelect
                closeMenuOnSelect={false}
              />

              <Select
                name="type"
                label="TYPE"
                isRequired={true}
                placeholder={translate("TYPE")}
                options={renderMediaTypeList()}
                isMultiSelect={false}
                closeMenuOnSelect={true}
              />

              <TextArea
                name="content"
                label="DESCRIPTION"
                isRequired={true}
                placeholder={translate("DESCRIPTION")}
              />

              <FileUploader
                name="file"
                onChange={onChange}
                label="ATTACH_FILE"
              />

              <PermissionsList
                title={translate("REVIEW_PERMISSIONS")}
                permissionsGroups={groupsSubscriber}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.onClose}>{translate("CANCEL")}</Button>{" "}
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              loadingText={translate("PROCESSING")}
              type="submit"
            >
              {translate("CREATE_MEDIA_BUTTON")}
            </Button>
          </ModalFooter>
        </form>
      </FormProvider>
    </Modal>
  );
};
export default MediaCRUDModal;
