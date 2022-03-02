import { useState, useEffect, useContext } from 'react'
import { Media as PlatformMedia } from '../../interfaces/Media'
import { Box, Button, Center, Stack } from '@chakra-ui/react'
import { ContentLine } from '../../components/ContentLine/ContentLine'
import MediaService from '../../services/MediaService'
import {
  mediaContentLineIcons as MediaIcon
} from '../../constants/Medias'
import { CommonContentLineTitle } from './CommonContentLineTitle'
import { ViewMediaContentModal } from '../../modals/ViewMediaContentModal'
import { translate } from '../../utils/LanguageUtils'
import { MediaType } from '../../models'
import MediaCRUDModal from '../../modals/MediaCRUDModal'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { UserTypes } from '../../enums/UserTypes'
import { SectionHeader } from '../../components/Headers/SectionHeader'
import { AiOutlinePlus } from 'react-icons/ai'
import { BadgeList } from '../../components/Badges/BadgeList'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { ToastNotification } from '../../observables/ToastNotification'
import { LoadMoreButton } from '../../components/Buttons/LoadMoreButton'
import { nonStudentGroups } from '../../constants/User'
import { isAdmin } from '../../utils/CognitoGroupsUtils'

export const MediaContentsList = () => {
  const [medias, setMedias] = useState<PlatformMedia[]>([])
  const [viewMediaContentModalVisibility, setViewMediaContentModalVisibility] =
    useState<boolean>(false)
  const [selectedMedia, setSelectedMedia] = useState<PlatformMedia | undefined>(
    undefined
  )
  const [crudModalVisibility, setCrudModalVisibility] =
    useState<boolean>(false)
  const [nextPageResultToken, setNextPageResultToken] = useState<string | null>()
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true)

  const fetchMedia = async () => {
    const medias = await MediaService.fetchMedias(nextPageResultToken)

    setNextPageResultToken(medias?.listMedia?.nextToken)
    setIsLoadingNewPage(false)

    setMedias((previousMedias) =>
      previousMedias.concat((medias?.listMedia?.items as PlatformMedia[]) || [])
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

  const onView = (media: PlatformMedia) => {
    setSelectedMedia(media)
    setViewMediaContentModalVisibility(true)
  }

  const onEdit = (media: PlatformMedia) => {
    setSelectedMedia(media)
    setCrudModalVisibility(true)
  }

  const onClose = (modal: 'ViewMediaContentModal' | 'MediaCRUDModal') => {
    setSelectedMedia(undefined)

    modal === 'MediaCRUDModal' ? setCrudModalVisibility(false) : setViewMediaContentModalVisibility(false)
  }

  const onDelete = async (mediaToDelete: PlatformMedia) => {
    const isSuccessfullyDeleted = await MediaService.deleteMedia(
      mediaToDelete.id as string
    )

    if (isSuccessfullyDeleted) {
      setMedias((medias) =>
        medias.filter((media) => media.id !== mediaToDelete.id)
      )

      ToastNotification({
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
  const hasAdminRole = isAdmin(user)

  return (
    <>
      <ViewMediaContentModal
        media={selectedMedia as PlatformMedia}
        isOpen={viewMediaContentModalVisibility}
        onClose={() => onClose('ViewMediaContentModal')}
      />

      {hasAdminRole && (
        <MediaCRUDModal
          isOpen={crudModalVisibility}
          onUpdate={onUpdate}
          onClose={() => onClose('MediaCRUDModal')}
          onCreate={(media) => setMedias([media, ...medias])}
          mediaToUpdate={selectedMedia}
        />
      )}
      <Stack spacing={4} flexDirection={'column'}>
        <SectionHeader>
          {hasAdminRole && (
            <Center>
              <Button
                leftIcon={<AiOutlinePlus />}
                onClick={() => setCrudModalVisibility(true)}
                colorScheme="brand"
              >
                {translate('MEDIA_UPLOAD_MODAL_TITLE')}
              </Button>
            </Center>
          )}
        </SectionHeader>
        <Box>
          {medias.map((media) => {
            const Icon = MediaIcon[media.type]
            const badges = media.groups.filter(group => !nonStudentGroups.includes(group as UserTypes))

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
                onEdit={hasAdminRole ? () => onEdit(media) : undefined}
                onDelete={hasAdminRole ? () => onDelete(media) : undefined}
              >
                <CommonContentLineTitle title={media.title} badges={media.groups}>
                  <BadgeList badges={badges} />
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
      <LoadMoreButton show={!!nextPageResultToken} isLoading={isLoadingNewPage} onClick={loadMore} />
    </>
  )
}
