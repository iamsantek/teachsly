import {
  Box,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LessonPlan,
  ListLessonPlansQuery,
  MediaType,
} from "../API";
import { UserDashboardContext } from "../contexts/UserDashboardContext";
import { GeneralInformation } from "../enums/GeneralInformation";
import { useUserGroups } from "../hooks/useUserGroups";
import { getLessonPlansByExternalId } from "../services/LessonPlanService";
import MediaService from "../services/MediaService";
import { translate } from "../utils/LanguageUtils";
import { useGroupRoutes } from "../utils/RouteUtils";
import { SpinnerScreen } from "../views/others/SpinnerScreen";
import { toastConfig } from "../utils/ToastUtils";

export const RecordingLayout = () => {
  const [mediaUrl, setMediaUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatTranscription, setChatTranscription] = useState<string>();
  const [lessonPlanning, setLessonPlanning] = useState<
    LessonPlan | undefined
  >();
  const [nextLessonPlanningToken, setNextLessonPlanningToken] = useState<
    string | undefined
  >();

  const { externalId } = useParams();
  const { isAllowedRoute } = useGroupRoutes();
  const { hasAdminRole } = useUserGroups();
  const {
    context: { user },
  } = useContext(UserDashboardContext);
  const navigate = useNavigate();
  const toast = useToast();

  const checkChatUrl = useCallback(async (chatUrl) => {
    if (!chatUrl) {
      return;
    }

    const response = await fetch(chatUrl);
    if (response.status === 200) {
      return response.text();
    } else {
      console.log("Chat is not available");
      return;
    }
  }, []);

  const getLessonPlanning = useCallback(
    async (externalId) => {
      const lessonPlanning: ListLessonPlansQuery | undefined =
        await getLessonPlansByExternalId(externalId, nextLessonPlanningToken);

      if (lessonPlanning?.listLessonPlans?.nextToken) {
        setNextLessonPlanningToken(lessonPlanning?.listLessonPlans.nextToken);
      }

      if (
        lessonPlanning?.listLessonPlans?.items &&
        lessonPlanning?.listLessonPlans?.items[0]
      ) {
        const lessonPlan = lessonPlanning?.listLessonPlans?.items[0];
        setLessonPlanning(lessonPlan);
        return;
      }

      toast(
        toastConfig({
          status: "error",
          description: "RECORDING_NOT_FOUND",
        })
      );
      navigate("/");
    },
    [nextLessonPlanningToken, navigate, toast]
  );

  useEffect(() => {
    getLessonPlanning(externalId);
  }, [externalId, getLessonPlanning]);

  useEffect(() => {
    const getLessonPlanning = async () => {
      if (!externalId || !lessonPlanning) {
        return;
      }

      const isAllowed =
        hasAdminRole ||
        !!lessonPlanning?.groups.some((group) => user?.groups.includes(group));

      if (!isAllowed) {
        navigate("/");
      }

      if (!lessonPlanning) {
        return;
      }

      const recordingFileName = `${lessonPlanning?.media as string}.mp4`;
      const chatFileName = `${lessonPlanning?.media as string}.txt`;

      const [mediaUrl, chartUrl] = await Promise.all([
        MediaService.getMediaLink(recordingFileName, MediaType.FILE),
        MediaService.getMediaLink(chatFileName, MediaType.FILE),
      ]);

      const chatTranscription = await checkChatUrl(chartUrl);
      if (chatTranscription) {
        setChatTranscription(chatTranscription);
      }

      setMediaUrl(mediaUrl);
      setIsLoading(false);
    };

    getLessonPlanning();
  }, [
    navigate,
    user?.groups,
    hasAdminRole,
    externalId,
    checkChatUrl,
    lessonPlanning,
  ]);

  useEffect(() => {
    if (!isAllowedRoute) {
      navigate("/");
    }
  }, [isAllowedRoute, navigate]);

  if (isLoading) {
    return <SpinnerScreen />;
  }

  return (
    <Box w="100%" h="container.lg" bgColor="black">
      <Container paddingY={5} maxW={["95%", "85%"]} centerContent gap={5}>
        <Image w={["20", "24"]} src={require("../assets/img/brand/logo.png")} />
        <Heading
          textAlign="center"
          fontWeight="bold"
          fontSize={"2xl"}
          color="whiteAlpha.800"
        >
          {translate("CLASS_RECORDING")}
        </Heading>
        <Stack maxW="container.sm" spacing={10}>
          {mediaUrl && (
            <video autoPlay muted src={mediaUrl} width="100%" controls />
          )}

          {chatTranscription && (
            <Stack spacing={3}>
              <Text
                textAlign="center"
                textStyle="title"
                color="whiteAlpha.900"
                fontSize="lg"
                fontWeight="bold"
              >
                {translate("RECORDING_CHAT_TITLE")}
              </Text>
              <Text color="whiteAlpha.900" as="pre">
                {chatTranscription}
              </Text>
            </Stack>
          )}
        </Stack>
        <Text color="whiteAlpha.900" fontWeight="bold" as="pre">
          {GeneralInformation.PROJECT_NAME} {new Date().getFullYear()}
        </Text>
      </Container>
    </Box>
  );
};
