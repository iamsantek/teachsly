import { Button, Stack, Wrap, WrapItem, useToast } from "@chakra-ui/react";
import {
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Media, MediaFolder } from "../../API";
import { SectionHeader } from "../../components/Headers/SectionHeader";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { FetchType } from "../../enums/Media";
import { useUserGroups } from "../../hooks/useUserGroups";
import MediaFolderService from "../../services/MediaFolderService";
import MediaService from "../../services/MediaService";
import { translate } from "../../utils/LanguageUtils";
import { sortMediasByCreatedAt, sortMediaByName } from "../../utils/MediaUtils";
import { useGroupRoutes } from "../../utils/RouteUtils";
import { MediaContentsList } from "./MediaContentsList";
import { toastConfig } from "../../utils/ToastUtils";

interface Props {
  fetchType: FetchType;
}

const initialNextPageTokens: { [key in FetchType]: string | undefined } = {
  [FetchType.FOLDER]: undefined,
  [FetchType.ALL]: undefined,
  [FetchType.COURSE]: undefined,
};

const nextPageTokenReducer = (
  state: { [key in FetchType]: string | undefined },
  action: { type: FetchType; payload: string | undefined | null }
) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

export const MediaContentsScreen: FC<Props> = ({ fetchType }: Props) => {
  const toast = useToast();
  const [medias, setMedias] = useState<Media[]>([]);
  const [folderMedias, setFolderMedias] = useState<Media[]>([]);
  const [sectionName, setSectionName] = useState<string | undefined>("");
  const [crudModalVisibility, setCrudModalVisibility] =
    useState<boolean>(false);
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true);
  const [mediaFolder, setMediaFolder] = useState<MediaFolder | undefined>();
  const [nextPageTokens, dispatch] = useReducer(
    nextPageTokenReducer,
    initialNextPageTokens
  );

  const location = useLocation();

  useEffect(() => {
    setMedias([]);
    setFolderMedias([]);
  }, [location.pathname]);

  const { isAllowedRoute } = useGroupRoutes();
  const navigate = useNavigate();
  const { courseId, folderId } = useParams();
  const {
    context: { courses },
  } = useContext(UserDashboardContext);
  const { hasTeacherRole, hasAdminRole } = useUserGroups();
  const fetchTypeRef = useRef<FetchType>(fetchType);

  const fetchMediaFolderName = useCallback(async () => {
    return `${translate("FOLDER")} ${mediaFolder?.name || ""} `;
  }, [mediaFolder?.name]);

  const fetchCourseName = useCallback(async () => {
    return courses.find((course) => course.externalId === courseId)?.name;
  }, [courseId, courses]);

  const fetchSectionTitleMethods: {
    [key in FetchType]: () => Promise<string | undefined>;
  } = useMemo(
    () => ({
      [FetchType.ALL]: async () => translate("MENU_CONTENTS"),
      [FetchType.FOLDER]: () => fetchMediaFolderName(),
      [FetchType.COURSE]: () => fetchCourseName(),
    }),
    [fetchMediaFolderName, fetchCourseName]
  );

  const fetchSectionName = useCallback(async () => {
    const title = await fetchSectionTitleMethods[fetchType]();
    setSectionName(title);
  }, [fetchSectionTitleMethods, fetchType]);

  const fetchMediaFolder = useCallback(async () => {
    const mediaFolder = await MediaFolderService.fetchMediaFolderById(folderId);
    const folderMedias = await MediaService.fetchMediaByFolderId(
      folderId,
      nextPageTokens.FOLDER
    );

    if (fetchTypeRef.current !== FetchType.FOLDER) {
      return;
    }

    setMediaFolder((mediaFolder?.getMediaFolder as MediaFolder) ?? []);
    setFolderMedias((medias) =>
      sortMediasByCreatedAt(
        medias.concat(folderMedias?.listMedia?.items as Media[]) ?? []
      )
    );

    if (folderMedias?.listMedia?.nextToken) {
      dispatch({
        type: FetchType.FOLDER,
        payload: folderMedias?.listMedia?.nextToken,
      });
      return;
    }

    setIsLoadingNewPage(false);
  }, [folderId, nextPageTokens.FOLDER]);

  const fetchCourseMedias = useCallback(async () => {
    const courseMedias = await MediaService.fetchMedias(
      nextPageTokens.COURSE,
      courseId
    );

    if (fetchTypeRef.current !== FetchType.COURSE) {
      return;
    }

    setMedias((medias) =>
      sortMediasByCreatedAt(
        medias.concat(courseMedias?.listMedia?.items as Media[]) ?? []
      )
    );

    if (courseMedias?.listMedia?.nextToken) {
      dispatch({
        type: FetchType.COURSE,
        payload: courseMedias.listMedia.nextToken,
      });
      return;
    }

    setIsLoadingNewPage(false);
  }, [courseId, nextPageTokens.COURSE]);

  const fetchAllMedias = useCallback(async () => {
    const allMedias = await MediaService.fetchMedias(nextPageTokens.ALL);

    if (fetchTypeRef.current !== FetchType.ALL) {
      return;
    }

    setMedias((medias) =>
      sortMediasByCreatedAt(
        medias.concat((allMedias?.listMedia?.items as Media[]) ?? [])
      )
    );

    if (allMedias?.listMedia?.nextToken) {
      dispatch({
        type: FetchType.ALL,
        payload: allMedias?.listMedia?.nextToken,
      });
      return;
    }

    setIsLoadingNewPage(false);
  }, [nextPageTokens.ALL]);

  useEffect(() => {
    setIsLoadingNewPage(true);
    if (folderId) {
      fetchMediaFolder();
    }
  }, [fetchType, folderId, fetchMediaFolder]);

  useEffect(() => {
    if (courseId) {
      fetchCourseMedias();
    }
  }, [courseId, fetchCourseMedias]);

  useEffect(() => {
    if (!courseId && !folderId) {
      setIsLoadingNewPage(true);
      fetchAllMedias();
    }
  }, [fetchType, fetchAllMedias, courseId, folderId]);

  useEffect(() => {
    fetchSectionName();
  }, [fetchSectionName]);

  useEffect(() => {
    fetchTypeRef.current = fetchType;
    setMedias([]);
    dispatch({ type: FetchType.ALL, payload: undefined });
    dispatch({ type: FetchType.COURSE, payload: undefined });
    dispatch({ type: FetchType.FOLDER, payload: undefined });
  }, [fetchType]);

  useEffect(() => {
    if (!isAllowedRoute) {
      navigate("/");
    }
  }, [isAllowedRoute, navigate]);

  useEffect(() => {
    if (!isLoadingNewPage && folderId) {
      const sortedMediasByName = sortMediaByName(medias);
      setMedias(sortedMediasByName);
    }
  }, [isLoadingNewPage, medias, folderId]);

  if (!isAllowedRoute) {
    return null;
  }

  if (!isLoadingNewPage) {
    toast.closeAll();
  }

  if (isLoadingNewPage && !toast.isActive("loading")) {
    toast(
      toastConfig({
        description: "LOADING_CONTENT_DESCRIPTION",
        title: "LOADING_CONTENTS",
        status: "info",
        id: "loading",
        duration: null,
      })
    );
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
                {translate("MEDIA_UPLOAD_MODAL_TITLE")}
              </Button>
            </WrapItem>
            {fetchType === FetchType.ALL && (
              <WrapItem>
                <Button
                  leftIcon={<AiOutlinePlus />}
                  onClick={() => navigate("/medias/folder/new")}
                  colorScheme="brand"
                >
                  {translate("CREATE_FOLDER")}
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
                  {translate("EDIT_FOLDER")}
                </Button>
              </WrapItem>
            )}
          </Wrap>
        )}
      </SectionHeader>
      <MediaContentsList
        medias={folderId ? folderMedias : medias}
        isLoading={isLoadingNewPage}
        showCRUDModal={crudModalVisibility}
        onCRUDModalVisibilityChange={setCrudModalVisibility}
        fetchType={fetchType}
        folderGroups={mediaFolder?.groups}
        onDeleteFolderComplete={() => fetchAllMedias()}
      />
    </Stack>
  );
};
