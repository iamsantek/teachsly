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
import { SectionHeader } from '../../components/Headers/SectionHeader'
import { AiOutlinePlus } from 'react-icons/ai'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { ToastNotification } from '../../observables/ToastNotification'
import { LoadMoreButton } from '../../components/Buttons/LoadMoreButton'
import { isAdmin, isTeacher } from '../../utils/CognitoGroupsUtils'
import { NoContentPlaceholder } from '../../components/Placeholders/NoContentPlaceholder'
import { ConfirmationDialog } from '../../components/AlertDialog/ConfirmationDialog'
import { useParams } from 'react-router-dom'

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
  const [showDeleteUserConfirmation, setShowDeleteUserConfirmation] = useState<boolean>(false)

  const { id: courseId } = useParams()

  const fetchMedia = async (courseId: string | undefined = undefined) => {
    const medias = await MediaService.fetchMedias(nextPageResultToken, courseId)

    setNextPageResultToken(medias?.listMedia?.nextToken)
    setIsLoadingNewPage(false)

    setMedias((previousMedias) =>
      previousMedias.concat((medias?.listMedia?.items as PlatformMedia[]) || [])
    )
  }

  useEffect(() => {
    fetchMedia(courseId)
  }, [courseId])

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

  const showDeleteContentDialog = (mediaToDelete: PlatformMedia) => {
    setShowDeleteUserConfirmation(true)
    setSelectedMedia(mediaToDelete)
  }

  const onDelete = async () => {
    const isSuccessfullyDeleted = await MediaService.deleteMedia(
      selectedMedia?.id as string
    )

    if (isSuccessfullyDeleted) {
      setMedias((medias) =>
        medias.filter((media) => media.id !== selectedMedia?.id)
      )

      setShowDeleteUserConfirmation(false)
      setSelectedMedia(undefined)

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
  const hasTeacherRole = isTeacher(user)

  return (
    <>
      <ViewMediaContentModal
        media={selectedMedia as PlatformMedia}
        isOpen={viewMediaContentModalVisibility}
        onClose={() => onClose('ViewMediaContentModal')}
      />

      <ConfirmationDialog
        isOpen={showDeleteUserConfirmation}
        onClose={() => setShowDeleteUserConfirmation(false)}
        title='DELETE_MEDIA_TITLE'
        description='DELETE_MEDIA_CONFIRMATION_MESSAGE'
        confirmButtonText={'DELETE'}
        onAction={onDelete}
      />

      {(hasAdminRole || hasTeacherRole) && (
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
          {(hasAdminRole || hasTeacherRole) && (
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
                onDelete={hasAdminRole ? () => showDeleteContentDialog(media) : undefined}
              >
                <CommonContentLineTitle title={media.title} badges={media.groups} />
              </ContentLine>
            )
          })}
          <Placeholder
            show={isLoadingNewPage}
            number={2}
            placeholderElement={<ContentLinePlaceholder />}
          />
          <NoContentPlaceholder show={medias.length === 0 && !isLoadingNewPage} />
        </Box>
      </Stack>
      <LoadMoreButton show={!!nextPageResultToken} isLoading={isLoadingNewPage} onClick={loadMore} />
    </>
  )
}
