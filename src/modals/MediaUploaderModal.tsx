import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { CustomButton } from "../components/Buttons/CustomButton";
import {
  AlertNotification,
  MessageLevel,
} from "../interfaces/AlertNotification";
import { translate } from "../utils/LanguageUtils";
import { CustomInput } from "../components/Inputs/CustomInput";
import { Media } from "../interfaces/Media";
import { defaultMedia } from "../constants/media";
import StorageService from "../services/aws/StorageService";
import CognitoService from "../services/aws/CognitoService";
import { MediaType } from "../models";
import { GroupType } from "@aws-sdk/client-cognito-identity-provider";
import { renderCognitoGroupsList } from "../utils/CognitoGroupsUtils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MediaUploaderModal = (props: Props) => {
  const [file, setFile] = useState<File>();
  const [media, setMedia] = useState<Media>({
    ...defaultMedia,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cognitoGroups, setCognitoGroups] = useState<GroupType[]>([]);

  useEffect(() => {
    const fetchCognitoGroups = async () => {
      const cognitoGroups = await CognitoService.getCognitoGroups();
      if (cognitoGroups) {
        setCognitoGroups(cognitoGroups);
      }
    };

    fetchCognitoGroups();
  }, []);

  const onInputChange = (inputName: keyof Media, inputValue: string) => {
    const updatedMedia: Media = { ...media };

    (updatedMedia as any)[inputName] = inputValue;

    setMedia(updatedMedia);
  };

  const uploadMedia = async () => {
    setIsLoading(true);

    const response = await StorageService.persistMedia(media, file);

    props.onClose();
    setIsLoading(false);

    if (!response) {
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

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];
    setFile(file);
  };

  const updateHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    onInputChange(event.target.name as keyof Media, event.target.value);

  const handleGroupsChange = (e: any) => {
    const groups = Array.from(
      e.target.selectedOptions,
      (option: any) => option.value
    );
    setMedia({ ...media, groups: groups });
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
      <ModalBody>
        <h2>{translate("MEDIA_UPLOAD_MODAL_TITLE")}</h2>

        <CustomInput
          labelName={translate("TITLE")}
          value={media.title}
          onChange={updateHandler}
          type="text"
          name="title"
        />
        <CustomInput
          labelName={translate("DESCRIPTION")}
          value={media.description}
          onChange={updateHandler}
          type="text"
          name="description"
        />
        <CustomInput
          labelName={translate("TYPE")}
          value={media.type}
          onChange={updateHandler}
          type="select"
          name="type"
        >
          {Object.keys(MediaType).map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </CustomInput>
        <CustomInput
          labelName={translate("MEDIA_GROUPS")}
          value={media.groups}
          onChange={handleGroupsChange}
          type="select"
          name="courses"
          multipleSelect
        >
          {renderCognitoGroupsList(cognitoGroups)}
        </CustomInput>
        <input type="file" onChange={onChange} />
      </ModalBody>
      <ModalFooter>
        <Button onClick={props.onClose}>{translate("CANCEL")}</Button>{" "}
        <CustomButton
          isLoading={isLoading}
          onClick={uploadMedia}
          type={MessageLevel.INFO}
        >
          {translate("CREATE_MEDIA_BUTTON")}
        </CustomButton>
      </ModalFooter>
    </Modal>
  );
};
export default MediaUploaderModal;
