import { useEffect, useState } from "react";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Media,
} from "reactstrap";
import { BadgeList } from "../../components/Badges/BadgeList";
import { CustomButton } from "../../components/Buttons/CustomButton";
// core components
import { mediaIcons } from "../../constants/media";
import {
  AlertNotification,
  MessageLevel,
} from "../../interfaces/AlertNotification";
import MediaCRUDModal from "../../modals/MediaCRUDModal";
import StorageService from "../../services/aws/StorageService";
import MediaService from "../../services/MediaService";
import { Media as PlatformMedia } from "../../interfaces/Media";
import { translate } from "../../utils/LanguageUtils";
import { Button } from "@chakra-ui/react";

const MediaContents = () => {
  const [medias, setMedias] = useState<PlatformMedia[]>([]);
  const [mediaToUpdate, setMediaToUpdate] = useState<PlatformMedia>();
  const [isGeneratingLink, setIsGeneratingLink] = useState<boolean>(false);
  const [mediaUploaderModalVisibility, setMediaUploaderModalVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchMedia = async () => {
      const medias = await MediaService.fetchMedias();
      setMedias(medias || []);
    };

    fetchMedia();
  }, []);

  const generateSignedUrl = async (key: string) => {
    setIsGeneratingLink(true);
    const signedURL = await StorageService.getSignedUrl(key);

    if (signedURL) {
      window.open(signedURL, "_blank");
    }

    setIsGeneratingLink(false);
  };

  const onEditMedia = (media: PlatformMedia) => {
    setMediaToUpdate(media);
    setMediaUploaderModalVisibility(true);
  };

  const onDeleteMedia = async (mediaToDelete: PlatformMedia) => {
    const isSuccessfullyDeleted = await MediaService.deleteMedia(
      mediaToDelete.id as string
    );

    if (!!isSuccessfullyDeleted) {
      setMedias((medias) =>
        medias.filter((media) => media.id !== mediaToDelete.id)
      );
      new AlertNotification(MessageLevel.SUCCESS, translate("MEDIA_DELETED"));
    }
  };

  const onUpdateMedia = (updatedMedia: PlatformMedia) => {
    const updatedMedias = [...medias];
    const index = medias.indexOf(
      medias.find((media) => media.id === updatedMedia.id) as PlatformMedia
    );
    updatedMedias[index] = updatedMedia;
    setMedias(updatedMedias);
  };

  return (
    <>
      {/* Page content */}
      <MediaCRUDModal
        mediaToUpdate={mediaToUpdate}
        isOpen={mediaUploaderModalVisibility}
        onClose={() => {
          setMediaUploaderModalVisibility(false);
          setMediaToUpdate(undefined);
        }}
        onCreate={(uploadedMedia: PlatformMedia) =>
          setMedias([uploadedMedia, ...medias])
        }
        onUpdate={onUpdateMedia}
      />
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Media contents</h3>
                <CustomButton
                  isLoading={false}
                  onClick={() => setMediaUploaderModalVisibility(true)}
                  type={MessageLevel.INFO}
                >
                  Agregar contenido
                </CustomButton>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Contenido</th>
                    <th scope="col">Disponible para</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {medias.map((media: PlatformMedia) => (
                    <tr key={media.id}>
                      <th scope="row">
                        <Media className="align-items-center">
                          <a
                            className="avatar rounded-circle mr-3 bg-info"
                            href={media.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className={mediaIcons[media.type]} />
                          </a>
                          <Media>
                            <span className="mb-0 text-sm">{media.title}</span>
                          </Media>
                        </Media>
                      </th>
                      <td>
                        <Badge color="" className="badgje-dot mr-4">
                          <span className="mb-0 text-sm">
                            {media.description}
                          </span>
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          {!!media.link && (
                            <Button
                              isLoading={isGeneratingLink}
                              onClick={() => generateSignedUrl(media.link)}
                              loadingText={translate("PROCESSING")}
                            >
                              {translate("SEE_CONTENT")}
                            </Button>
                          )}
                        </div>
                      </td>
                      <td>
                        <BadgeList badges={media.groups as string[]} />
                      </td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#edit"
                              onClick={() => onEditMedia(media)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={() => onDeleteMedia(media)}
                            >
                              Delete
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Something else here
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default MediaContents;
