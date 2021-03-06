import { Box } from '@chakra-ui/react'
import { Media, MediaType } from '../../API'
import { ContentLine } from '../../components/ContentLine/ContentLine'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
import { NoContentPlaceholder } from '../../components/Placeholders/NoContentPlaceholder'
import { CommonContentLineTitle } from './CommonContentLineTitle'
import { useContext } from 'react'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { isAdmin } from '../../utils/CognitoGroupsUtils'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { getFileTypeIcon } from '../../utils/MediaUtils'

interface Props {
  medias: Media[]
  onDownload: (media: Media) => void
  onView: (media: Media) => void
  onEdit: (media: Media) => void
  onDelete: (media: Media) => void
  isLoading: boolean

}

export const MediaContentsLines = ({ medias, onDownload, onView, onEdit, onDelete, isLoading }: Props) => {
  const { context: { user, externalUserId } } = useContext(UserDashboardContext)
  const hasAdminRole = isAdmin(user)
  const placeholderNumber = Math.floor(Math.random() * 10) + 1

  return (
    <Box>
      {medias?.map((media) => {
        const Icon = getFileTypeIcon(media.mimeType as string, 20)
        const isMediaOwner = externalUserId === (media as any).owner

        return (
          <ContentLine
            key={media.id}
            leftIcon={Icon}
            onView={() => onView(media)}
            onDownload={
              media.link && media.type === MediaType.FILE
                ? () => onDownload(media)
                : undefined
            }
            onEdit={(hasAdminRole || isMediaOwner) ? () => onEdit(media) : undefined}
            onDelete={(hasAdminRole || isMediaOwner) ? () => onDelete(media) : undefined}
          >
            <CommonContentLineTitle title={media.title} badges={media.groups} />
          </ContentLine>
        )
      })}
      <Placeholder
        show={isLoading}
        number={placeholderNumber}
        placeholderElement={<ContentLinePlaceholder />}
      />
      <NoContentPlaceholder show={medias.length === 0 && !isLoading} />
    </Box>
  )
}
