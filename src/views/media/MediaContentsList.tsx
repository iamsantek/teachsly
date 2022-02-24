import { useState, useEffect, useContext } from 'react';
import { Media, Media as PlatformMedia } from '../../interfaces/Media'
import { Box, Button, Center, Stack } from '@chakra-ui/react'
import { ContentLine } from '../../components/ContentLine/ContentLine'
import MediaService from '../../services/MediaService'
import {
  mediaContentLineIcons as MediaIcon
} from '../../constants/Media'
import { CommonContentLineTitle } from './CommonContentLineTitle'
import { ViewMediaContentModal } from '../../modals/ViewMediaContentModal'
import { translate } from '../../utils/LanguageUtils'
import { MediaType } from '../../models'
import MediaCRUDModal from '../../modals/MediaCRUDModal'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import UserGroupsService from '../../services/UserGroupsService'
import { UserTypes } from '../../enums/UserTypes'
import { SectionHeader } from '../../components/Headers/SectionHeader'
import { AiOutlinePlus } from 'react-icons/ai'
import { BadgeList } from '../../components/Badges/BadgeList'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { Toast } from '../../components/Toast/Toast'

export const MediaContentsList = () => {
  const [medias, setMedias] = useState<PlatformMedia[]>([])
  const [viewMediaContentModalVisibility, setViewMediaContentModalVisibility] =
    useState<boolean>(false)
  const [selectedMedia, setSelectedMedia] = useState<Media | undefined>(
    undefined
  )
  const [crudModalVisibility, setCrudModalVisibility] =
    useState<boolean>(false)
  const [nextPageResultToken, setNextPageResultToken] = useState<string>()
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true)

  const fetchMedia = async () => {
    const medias = await MediaService.fetchMedias(nextPageResultToken)

    setNextPageResultToken(medias?.nextToken)
    setIsLoadingNewPage(false)

    setMedias((previousMedias) =>
      previousMedias.concat((medias?.items as Media[]) || [])
    )
  }

  useEffect(() => {
    fetchMedia()
  }, [])

  const loadMore = () => {
    setIsLoadingNewPage(true)
    fetchMedia()
  }

  const onDownload = async (key: string) => {
    await MediaService.generateSignedUrl(key)
  }

  const onView = (media: Media) => {
    setSelectedMedia(media)
    setViewMediaContentModalVisibility(true)
  }

  const onEdit = (media: PlatformMedia) => {
    setSelectedMedia(media)
    setCrudModalVisibility(true)
  }

  const onDelete = async (mediaToDelete: PlatformMedia) => {
    const isSuccessfullyDeleted = await MediaService.deleteMedia(
      mediaToDelete.id as string
    )

    if (isSuccessfullyDeleted) {
      setMedias((medias) =>
        medias.filter((media) => media.id !== mediaToDelete.id)
      )

      Toast({
        status: 'SUCCESS',
        description: 'MEDIA_DELETED'
      })
    }
  }

  const onUpdate = (updatedMedia: PlatformMedia) => {
    const updatedMedias = [...medias]
    const index = medias.indexOf(
      medias.find((media) => media.id === updatedMedia.id) as PlatformMedia
    )
    updatedMedias[index] = updatedMedia
    setMedias(updatedMedias)
  }

  const { user } = useContext(UserDashboardContext)
  const isAdmin = UserGroupsService.isUser(user, UserTypes.ADMIN)

  return (
    <>
      <ViewMediaContentModal
        media={selectedMedia as Media}
        isOpen={viewMediaContentModalVisibility}
        onClose={() => setViewMediaContentModalVisibility(false)}
      />

      <MediaCRUDModal
        isOpen={crudModalVisibility}
        onUpdate={onUpdate}
        onClose={() => setCrudModalVisibility(false)}
        onCreate={(media) => setMedias([media, ...medias])}
        mediaToUpdate={selectedMedia}
      />

      <Stack spacing={4} flexDirection={'column'}>
        <SectionHeader>
          <Center>
            <Button
              leftIcon={<AiOutlinePlus />}
              onClick={() => setCrudModalVisibility(true)}
              colorScheme="brand"
            >
              {translate('MEDIA_UPLOAD_MODAL_TITLE')}
            </Button>
          </Center>
        </SectionHeader>
        <Box>
          {medias.map((media) => {
            const Icon = MediaIcon[media.type]
            return (
              <ContentLine
                key={media.id}
                leftIcon={<Icon />}
                onView={() => onView(media)}
                onDownload={
                  media.link && media.type === MediaType.PDF
                    ? () => onDownload(media.link)
                    : undefined
                }
                onEdit={isAdmin ? () => onEdit(media) : undefined}
                onDelete={isAdmin ? () => onDelete(media) : undefined}
              >
                <CommonContentLineTitle title={media.title} badges={media.groups}>
                  <BadgeList badges={media.groups || []} />
                </CommonContentLineTitle>
              </ContentLine>
            )
          })}
          <Placeholder
            show={isLoadingNewPage}
            number={2}
            placeholderElement={<ContentLinePlaceholder />}
          />
        </Box>
      </Stack>
      <Center>
        {nextPageResultToken && (
          <Button
            rounded={'lg'}
            colorScheme="brand"
            onClick={loadMore}
            marginTop={4}
            isLoading={isLoadingNewPage}
            loadingText={translate('PROCESSING')}
          >
            {translate('LOAD_MORE')}
          </Button>
        )}
      </Center>
    </>
  )
}
