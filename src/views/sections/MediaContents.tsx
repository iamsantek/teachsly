import React, { useEffect, useMemo, useState } from 'react'
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
  Media
} from 'reactstrap'
import { CourseBadgeList } from '../../components/Badges/CourseBadge'
import { CustomButton } from '../../components/Buttons/CustomButton'
// core components
import { mediaIcons } from '../../constants/media'
import { MessageLevel } from '../../interfaces/AlertNotification'
import MediaUploaderModal from '../../modals/MediaUploaderModal'
import { Media as MediaModel } from '../../models/index'
import StorageService from '../../services/aws/StorageService'
import MediaService from '../../services/MediaService'

const MediaContents = () => {
  const [medias, setMedia] = useState<MediaModel[]>([])
  const [isGeneratingLink, setIsGeneratingLink] = useState<boolean>(false);
  const [mediaUploaderModalVisibility, setMediaUploaderModalVisibility] =
    useState<boolean>(false)


  useEffect(() => {
    const fetchMedia = async () => {
      const medias = await MediaService.fetchMedia()

      if (medias) {
        setMedia(medias as MediaModel[])
      }
    }

    fetchMedia()
  }, [])

  const generateSignedUrl = async (key: string) => {
    setIsGeneratingLink(true)
    const signedURL = await StorageService.getSignedUrl(key);
  
    if (signedURL) {
      window.open(signedURL, '_blank')
    }
    
    setIsGeneratingLink(false)
  }

  return (
    <>
      {/* Page content */}
      <MediaUploaderModal
        isOpen={mediaUploaderModalVisibility}
        onClose={() => setMediaUploaderModalVisibility(false)}
        onComplete={(uploadedMedia: MediaModel) => setMedia([uploadedMedia, ...medias])}
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
                  {medias.map((media: MediaModel) =>
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
                              isLoading={isGeneratingLink}
                              type={MessageLevel.INFO}
                              onClick={() => generateSignedUrl(media.link)}
                            >
                              Ver contenido
                            </CustomButton>
                          )}
                        </div>
                      </td>
                      <td>
                        <CourseBadgeList courses={media.groups as string[]} />
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
                  )}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default MediaContents
