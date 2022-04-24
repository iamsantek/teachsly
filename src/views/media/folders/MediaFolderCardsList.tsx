import { Stack } from '@chakra-ui/react'
import { useCallback, useEffect, useState } from 'react'
import { MdFolder } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { MediaFolder } from '../../../API'
import { ContentLine } from '../../../components/ContentLine/ContentLine'
import { FetchType } from '../../../enums/Media'
import MediaFolderService from '../../../services/MediaFolderService'
import { CommonContentLineTitle } from '../CommonContentLineTitle'
import { useUserGroups } from '../../../hooks/useUserGroups'

interface Props {
  fetchType: FetchType
}

export const MediaFolderCardsList = ({ fetchType }: Props) => {
  const [folders, setFolders] = useState<MediaFolder[]>([])
  const { courseId } = useParams()
  const { hasEditPermission } = useUserGroups()
  const navigate = useNavigate()

  const fetchFolders = useCallback(async () => {
    const folders = await MediaFolderService.fetchMediaFolders(fetchType, courseId)

    setFolders(folders?.listMediaFolders?.items as MediaFolder[] || [])
  }, [fetchType, courseId])

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders])

  return (
    <Stack>
      {folders.map((folder) => (
        <ContentLine
          key={folder.id}
          leftIcon={<MdFolder />}
          onView={() => navigate(`/medias/folder/${folder.id}`)}
          onEdit={hasEditPermission ? () => navigate(`/medias/folder/${folder.id}/edit`) : undefined}
        >
          <CommonContentLineTitle title={folder.name} />
        </ContentLine>
      ))}
    </Stack>
  )
}
