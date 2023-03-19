import { Box, Container, Heading, Image, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MediaType } from "../API";
import { UserDashboardContext } from "../contexts/UserDashboardContext";
import { GeneralInformation } from "../enums/GeneralInformation";
import { useUserGroups } from "../hooks/useUserGroups";
import { getLessonPlansByExternalId } from "../services/LessonPlanService";
import MediaService from "../services/MediaService";
import { translate } from "../utils/LanguageUtils";
import { useGroupRoutes } from "../utils/RouteUtils";
import { SpinnerScreen } from "../views/others/SpinnerScreen";

export const RecordingLayout = () => {
  const [mediaUrl, setMediaUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { externalId } = useParams();
  const { isAllowedRoute } = useGroupRoutes();
  const { hasAdminRole } = useUserGroups();
  const {
    context: { user },
  } = useContext(UserDashboardContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getLessonPlanning = async () => {
      if (!externalId) {
        return;
      }

      const lessonPlanning = await getLessonPlansByExternalId(externalId);
      const lessonPlan = lessonPlanning?.listLessonPlans?.items[0];
      const isAllowed =
        hasAdminRole ||
        !!lessonPlan?.groups.some((group) => user?.groups.includes(group));

      if (!isAllowed) {
        navigate("/");
      }

      const mediaUrl = await MediaService.getMediaLink(
        lessonPlan?.media as string,
        MediaType.FILE
      );

      setMediaUrl(mediaUrl);
      setIsLoading(false);
    };

    getLessonPlanning();
  }, [navigate, user?.groups, hasAdminRole, externalId]);

  useEffect(() => {
    if (!isAllowedRoute) {
      navigate("/");
    }
  }, [isAllowedRoute, navigate]);

  if (isLoading) {
    return <SpinnerScreen />;
  }

  return (
    <Box w="100%" h="container.lg" bgGradient="linear(to-l, #43cdfb, #38a3c5)">
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
        <Container>
          {mediaUrl && <video src={mediaUrl} width="100%" controls />}
        </Container>
        <Text color="whiteAlpha.900" fontWeight="bold">
          {GeneralInformation.PROJECT_NAME} {new Date().getFullYear()}
        </Text>
      </Container>
    </Box>
  );
};
