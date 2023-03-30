import { Box, Container, Heading, Image, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Media, MediaType } from "../API";
import { UserDashboardContext } from "../contexts/UserDashboardContext";
import { GeneralInformation } from "../enums/GeneralInformation";
import { useUserGroups } from "../hooks/useUserGroups";
import MediaService from "../services/MediaService";
import { useGroupRoutes } from "../utils/RouteUtils";
import { SpinnerScreen } from "../views/others/SpinnerScreen";

export const ContentLayout = () => {
  const [media, setMedia] = useState<Media>();
  const [mediaUrl, setMediaUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { mediaId } = useParams();
  const { isAllowedRoute } = useGroupRoutes();
  const { hasAdminRole } = useUserGroups();
  const {
    context: { user },
  } = useContext(UserDashboardContext);
  const navigate = useNavigate();

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
        <Text color="whiteAlpha.900" fontWeight="bold">
          {GeneralInformation.PROJECT_NAME} {new Date().getFullYear()}
        </Text>
      </Container>
    </Box>
  );
};
