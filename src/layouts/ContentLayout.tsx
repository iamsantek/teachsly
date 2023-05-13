import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Container,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Media, MediaType } from "../API";
import { UserDashboardContext } from "../contexts/UserDashboardContext";
import { GeneralInformation } from "../enums/GeneralInformation";
import { useUserGroups } from "../hooks/useUserGroups";
import MediaService from "../services/MediaService";
import { useGroupRoutes } from "../utils/RouteUtils";
import { SpinnerScreen } from "../views/others/SpinnerScreen";
import { translate } from "../utils/LanguageUtils";

export const ContentLayout = () => {
  const [media, setMedia] = useState<Media>();
  const [mediaUrl, setMediaUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [audioTranscription, setAudioTranscription] = useState<string>();

  const { mediaId } = useParams();
  const { isAllowedRoute } = useGroupRoutes();
  const { hasAdminRole } = useUserGroups();
  const {
    context: { user },
  } = useContext(UserDashboardContext);
  const navigate = useNavigate();

  const fetchTranscription = useCallback(async () => {
    const isAudio = media?.mimeType?.includes("audio");
    if (!isAudio) {
      return;
    }

    const key = media?.link as string;
    const transcription = await MediaService.fetchAudioTranscript(key);
    setAudioTranscription(transcription);
  }, [media]);

  useEffect(() => {
    const getMedia = async () => {
      if (!mediaId) {
        return;
      }

      const media = await MediaService.fetchMediaById(mediaId);

      const isAllowed =
        hasAdminRole ||
        !!media?.getMedia?.groups.some((group) => user?.groups.includes(group));

      if (!isAllowed) {
        navigate("/");
      }

      const mediaUrl = await MediaService.getMediaLink(
        media?.getMedia?.link as string,
        media?.getMedia?.type as MediaType
      );

      setMedia(media?.getMedia as Media);
      setMediaUrl(mediaUrl);
      setIsLoading(false);
    };

    getMedia();
  }, [mediaId, navigate, user?.groups, hasAdminRole]);

  useEffect(() => {
    fetchTranscription();
  }, [fetchTranscription]);

  useEffect(() => {
    if (!isAllowedRoute) {
      navigate("/");
    }
  }, [isAllowedRoute, navigate]);

  if (isLoading) {
    return <SpinnerScreen />;
  }

  return (
    <Box minHeight="100vh" bgColor="black">
      <Container paddingY={5} maxW={["95%", "85%"]} centerContent gap={5}>
        <Image w={["20", "24"]} src={require("../assets/img/brand/logo.png")} />
        <Heading
          textAlign="center"
          fontWeight="bold"
          fontSize={"2xl"}
          color="whiteAlpha.800"
        >
          {media?.title}
        </Heading>
        {media?.mimeType?.includes("video") && (
          <video src={mediaUrl} width="100%" controls />
        )}
        {media?.mimeType?.includes("audio") && (
          <audio controls>
            <source src={mediaUrl} type={media.mimeType as string} />
            Your browser does not support the audio element.
          </audio>
        )}
        {audioTranscription && (
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    display="flex"
                    gap={3}
                    alignItems="center"
                  >
                    <Text color="whiteAlpha.900" fontWeight="bold">
                      {translate("TRANSCRIPTION_TITLE")}
                    </Text>
                    <Badge colorScheme="purple">BETA</Badge>
                  </Box>
                  <AccordionIcon color="white" fontSize="3xl" />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4} display='flex' flexDirection='column' gap={4}>
                <Text color="brand.500" fontWeight="bold">
                  {translate("TRANSCRIPTION_DISCLAIMER")}
                </Text>
                <Text color="whiteAlpha.900" textAlign="justify">
                  {audioTranscription}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
        <Text color="whiteAlpha.900" fontWeight="bold">
          {GeneralInformation.PROJECT_NAME} {new Date().getFullYear()}
        </Text>
      </Container>
    </Box>
  );
};
