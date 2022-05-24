import { Button, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { FC, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdModeEditOutline } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { Media, MediaFolder } from '../../API'
import { SectionHeader } from '../../components/Headers/SectionHeader'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { FetchType } from '../../enums/Media'
import { useUserGroups } from '../../hooks/useUserGroups'
import MediaFolderService from '../../services/MediaFolderService'
import MediaService from '../../services/MediaService'
import { translate } from '../../utils/LanguageUtils'
import { useGroupRoutes } from '../../utils/RouteUtils'
import { MediaContentsList } from './MediaContentsList'

interface Props {
  fetchType: FetchType
}

const initialNextPageTokens: { [key in FetchType]: string | undefined } = {
  [FetchType.FOLDER]: undefined,
  [FetchType.ALL]: undefined,
  [FetchType.COURSE]: undefined
}

const nextPageTokenReducer = (state: { [key in FetchType]: string | undefined }, action: { type: FetchType, payload: string | undefined | null }) => {
  return {
    ...state,
    [action.type]: action.payload
  }
}

export const MediaContentsScreen: FC<Props> = ({ fetchType }: Props) => {
  const [medias, setMedias] = useState<Media[]>([])
  const [sectionName, setSectionName] = useState<string | undefined>('')
  const [crudModalVisibility, setCrudModalVisibility] = useState<boolean>(false)
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true)
  const [mediaFolder, setMediaFolder] = useState<MediaFolder | undefined>()
  const [nextPageTokens, dispatch] = useReducer(nextPageTokenReducer, initialNextPageTokens)

  const { isAllowedRoute } = useGroupRoutes()
  const navigate = useNavigate()
  const { courseId, folderId } = useParams()
  const { context: { courses } } = useContext(UserDashboardContext)
  const { hasTeacherRole, hasAdminRole } = useUserGroups()

  const fetchMediaFolderName = useCallback(async () => {
    return `${translate('FOLDER')} ${mediaFolder?.name || ''} `
  }, [mediaFolder?.name])

  const fetchCourseName = useCallback(async () => {
    return courses.find(course => course.externalId === courseId)?.name
  }, [courseId, courses])

  const fetchSectionTitleMethods: { [key in FetchType]: () => Promise<string | undefined> } = useMemo(() => ({
    [FetchType.ALL]: async () => translate('MENU_CONTENTS'),
    [FetchType.FOLDER]: () => fetchMediaFolderName(),
    [FetchType.COURSE]: () => fetchCourseName()
  }), [fetchMediaFolderName, fetchCourseName])

  const fetchSectionName = useCallback(async () => {
    const title = await fetchSectionTitleMethods[fetchType]()
    setSectionName(title)
  }, [fetchSectionTitleMethods, fetchType])

  const fetchMediaFolder = useCallback(async () => {
    const mediaFolder = await MediaFolderService.fetchMediaFolderById(folderId)
    const folderMedias = await MediaService.fetchMediaByFolderId(folderId, nextPageTokens.FOLDER)
    setMediaFolder(mediaFolder?.getMediaFolder as MediaFolder ?? [])
    setMedias(medias => medias.concat(folderMedias?.listMedia?.items as Media[]) ?? [])

    if (folderMedias?.listMedia?.nextToken) {
      dispatch({ type: FetchType.FOLDER, payload: folderMedias?.listMedia?.nextToken })
    }

    setIsLoadingNewPage(false)
  }, [folderId, nextPageTokens.FOLDER])

  const fetchCourseMedias = useCallback(async () => {
    const courseMedias = await MediaService.fetchMedias(nextPageTokens.COURSE, courseId)
    setMedias(courseMedias?.listMedia?.items as Media[] ?? [])

    if (courseMedias?.listMedia?.nextToken) {
      dispatch({ type: FetchType.COURSE, payload: courseMedias.listMedia.nextToken })
    }

    setIsLoadingNewPage(false)
  }, [courseId, nextPageTokens.COURSE])

  const fetchAllMedias = useCallback(async () => {
    const allMedias = await MediaService.fetchMedias(nextPageTokens.ALL)
    setMedias(medias => medias.concat(allMedias?.listMedia?.items as Media[] ?? []))

    if (allMedias?.listMedia?.nextToken) {
      dispatch({ type: FetchType.ALL, payload: allMedias?.listMedia?.nextToken })
    }

    setIsLoadingNewPage(false)
  }, [nextPageTokens.ALL])

  useEffect(() => {
    setIsLoadingNewPage(true)
    if (folderId) {
      fetchMediaFolder()
    }
  }, [folderId, fetchMediaFolder])

  useEffect(() => {
    if (courseId) {
      fetchCourseMedias()
    }
  }, [courseId, fetchCourseMedias])

  useEffect(() => {
    if (!courseId && !folderId) {
      setIsLoadingNewPage(true)
      fetchAllMedias()
    }
  }, [fetchAllMedias, courseId, folderId])

  useEffect(() => {
    fetchSectionName()
  }, [fetchSectionName])

  useEffect(() => {
    return () => setMedias([])
  }, [fetchType])

  useEffect(() => {
    if (!isAllowedRoute) {
      navigate('/')
    }
  }, [isAllowedRoute, navigate])

  if (!isAllowedRoute) {
    return null
  }

  return (
    <Stack spacing={4}>
      <SectionHeader sectionName={sectionName}>
        {(hasAdminRole || hasTeacherRole) && (
          <Wrap gap={4}>
            <WrapItem>
              <Button
                leftIcon={<AiOutlinePlus />}
                onClick={() => setCrudModalVisibility(true)}
                colorScheme="brand"
              >
                {translate('MEDIA_UPLOAD_MODAL_TITLE')}
              </Button>
            </WrapItem>
            {fetchType === FetchType.ALL && (
              <WrapItem>
                <Button
                  leftIcon={<AiOutlinePlus />}
                  onClick={() => navigate('/medias/folder/new')}
                  colorScheme="brand"
                >
                  {translate('CREATE_FOLDER')}
                </Button>
              </WrapItem>
            )}
            {folderId && (
              <WrapItem>
                <Button
                  leftIcon={<MdModeEditOutline />}
                  onClick={() => navigate(`/medias/folder/${folderId}/edit`)}
                  colorScheme="brand"
                >
                  {translate('EDIT_FOLDER')}
                </Button>
              </WrapItem>
            )}
          </Wrap>
        )}
      </SectionHeader>
      <MediaContentsList
        medias={medias}
        isLoading={isLoadingNewPage}
        showCRUDModal={crudModalVisibility}
        onCRUDModalVisibilityChange={setCrudModalVisibility}
        fetchType={fetchType}
        folderGroups={mediaFolder?.groups}
        onDeleteFolderComplete={() => fetchAllMedias()}
      />
    </Stack>
  )
}
