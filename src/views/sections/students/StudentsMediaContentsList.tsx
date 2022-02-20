import { useState, useEffect } from "react";
import { mockMedia } from "../../../mocks/medias";
import { Media, Media as PlatformMedia } from "../../../interfaces/Media";
import { Button, Center, Stack } from "@chakra-ui/react";
import { ContentLine } from "../../../components/ContentLine/ContentLine";
import MediaService from "../../../services/MediaService";
import { mediaContentLineIcons } from "../../../constants/media";
import { CommonContentLineTitle } from "../common/media/CommonContentLineTitle";
import { ViewMediaContentModal } from "../../../modals/ViewMediaContentModal";
import { translate } from "../../../utils/LanguageUtils";

export const StudentsMediaContentsList = () => {
  const [medias, setMedias] = useState<PlatformMedia[]>([]);
  const [viewMediaContentModalVisibility, setViewMediaContentModalVisibility] =
    useState<boolean>(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchMedia = async () => {
      //const medias = await MediaService.fetchMedias();
      const medias = mockMedia;
      setMedias((medias as any) || []);
    };

    fetchMedia();
  }, []);

  const onDownload = async (key: string) => {
    console.log("CLICK");
    await MediaService.generateSignedUrl(key);
  };

  const onView = (media: Media) => {
    setSelectedMedia(media);
    setViewMediaContentModalVisibility(true);
  };

  return (
    <>
      <ViewMediaContentModal
        media={selectedMedia as Media}
        isOpen={viewMediaContentModalVisibility}
        onClose={() => setViewMediaContentModalVisibility(false)}
      />

      <Stack spacing={6} flexDirection={"column"}>
        {medias.map((media) => (
          <ContentLine
            key={media.id}
            LeftIcon={mediaContentLineIcons[media.type]}
            onView={() => onView(media)}
            onDownload={media.link ? () => onDownload(media.link) : undefined}
          >
            <CommonContentLineTitle title={media.title} badges={media.groups} />
          </ContentLine>
        ))}
      </Stack>
      <Center>
        <Button rounded={"lg"} bg="brand.primary" color="white">
          {translate("LOAD_MORE")}
        </Button>
      </Center>
    </>
  );
};
