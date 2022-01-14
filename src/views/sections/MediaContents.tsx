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
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Media,
} from "reactstrap";
import { CustomButton } from "../../components/Buttons/CustomButton";
// core components
import Header from "../../components/Headers/Header.js";
import { mediaIcons } from "../../constants/media";
import { MessageLevel } from "../../interfaces/AlertNotification";
import MediaUploaderModal from "../../modals/MediaUploaderModal";
import { Media as MediaModel } from "../../models";
import { Course } from "../../models/index";
import MediaService from "../../services/MediaService";
import DateTimeUtils from "../../utils/DateTimeUtils";
import { splitCamelCase } from "../../utils/StringUtils";

const MediaContents = () => {
  const [medias, setMedia] = useState<MediaModel[]>([]);
  const [mediaUploaderModalVisibility, setMediaUploaderModalVisibility] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchMedia = async () => {
      const medias = await MediaService.fetchMedia();

      if (medias) {
        console.log("Media", medias);
        setMedia(medias as MediaModel[]);
      }
    };

    fetchMedia();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <MediaUploaderModal
        isOpen={mediaUploaderModalVisibility}
        onClose={() => setMediaUploaderModalVisibility(false)}
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
                  {medias.map((media: MediaModel) => (
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
                            <CustomButton
                              isLoading={false}
                              type={MessageLevel.INFO}
                              onClick={() => window.open(media.link, "_blank")}
                            >
                              Ver contenido
                            </CustomButton>
                          )}
                        </div>
                      </td>
                      <td>
                        {media.groups?.map((group) => (
                          <Badge color="primary" pill>
                            {splitCamelCase(group)}
                          </Badge>
                        ))}
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
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              Another action
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
