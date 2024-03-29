import {
  Text,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Stack,
} from "@chakra-ui/react";
import { Media } from "../interfaces/Media";
import MediaService from "../services/MediaService";
import { translate } from "../utils/LanguageUtils";
import { BiLinkExternal } from "react-icons/bi";
import { BadgeList } from "../components/Badges/BadgeList";
import { useState } from "react";
import AnalyticsService from "../services/AnalyticsService";
import { GoogleAnalyticsCategory } from "../constants/Analytics";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  media: Media;
}

export const ViewMediaContentModal = ({ isOpen, onClose, media }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClick = async () => {
    AnalyticsService.sendEventToAnalytics({
      category: GoogleAnalyticsCategory.MEDIA,
      action: "VIEW_MEDIA",
    });
    setIsLoading(true);
    await MediaService.redirectToMediaUrl(media);
    setIsLoading(false);
  };

  return (
    <>
      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textStyle={"paragraph"} flex="1" flexDirection="row">
            {media?.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginBottom={3}>
            <Stack spacing={4}>
              {media?.description && (
                <>
                  <Text textStyle={"title"}>{translate("DESCRIPTION")}</Text>
                  <Text textStyle={"paragraph"}>{media?.description}</Text>
                </>
              )}
              {media?.content && (
                <>
                  <Text textStyle={"title"}>{translate("CONTENT")}</Text>
                  <Text textStyle={"paragraph"}>{media?.content}</Text>
                </>
              )}
              {media?.uploadedBy && (
                <>
                  <Text textStyle={"title"}>{translate("UPLOADED_BY")}</Text>
                  <Text textStyle={"paragraph"}>{media?.uploadedBy}</Text>
                </>
              )}
              <Text textStyle={"title"}>{translate("MEDIA_GROUPS")}</Text>
              <BadgeList badges={media?.groups} />
              <Button
                layerStyle={"base"}
                rightIcon={<BiLinkExternal />}
                onClick={onClick}
                isLoading={isLoading}
                loadingText={translate("PROCESSING")}
              >
                {translate("SEE_CONTENT")}
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
