import { Badge, Stack } from "@chakra-ui/react";
import { EnglishLevel, Media, MediaType } from "../../API";
import { ContentLine } from "../../components/ContentLine/ContentLine";
import { ContentLinePlaceholder } from "../../components/Placeholders/ContentLinePlaceholder";
import { NoContentPlaceholder } from "../../components/Placeholders/NoContentPlaceholder";
import { CommonContentLineTitle } from "./CommonContentLineTitle";
import { useContext } from "react";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { Placeholder } from "../../components/Placeholders/Placeholder";
import {
  getFileTypeIcon,
  isMediaCreatedWithinLastWeek,
} from "../../utils/MediaUtils";
import {
  checkIfContentHasBeenSeenBefore,
  findMatch,
} from "../../utils/GeneralUtils";
import { useUserGroups } from "../../hooks/useUserGroups";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  medias: Media[];
  onDownload: (media: Media) => void;
  onView: (media: Media) => void;
  onEdit: (media: Media) => void;
  onDelete: (media: Media) => void;
  isLoading: boolean;
  showSeenOpacity?: boolean;
  onCheck?(id?: string, checked?: boolean): void;
  mediaCheckedIds?: string[];
}

export const MediaContentsLines = ({
  medias,
  onDownload,
  onView,
  onEdit,
  onDelete,
  isLoading,
  showSeenOpacity = false,
  onCheck,
  mediaCheckedIds,
}: Props) => {
  const {
    context: { externalUserId, user },
  } = useContext(UserDashboardContext);
  const { groups, userType, hasAdminRole, hasEditPermission } = useUserGroups();
  const filterMedias = hasAdminRole
    ? medias
    : findMatch(
        medias,
        groups.map((group) => group.externalId),
        userType,
        user?.englishLevel as EnglishLevel
      );

  const onClickDownload = (media: Media) => {
    if (media.link && media.type === MediaType.FILE) {
      onDownload(media);
    }

    if (!showSeenOpacity) {
      return;
    }

    checkIfContentHasBeenSeenBefore(media.id);
  };

  const onClickView = (media: Media) => {
    onView(media);

    if (!showSeenOpacity) {
      return;
    }

    checkIfContentHasBeenSeenBefore(media.id);
  };

  return (
    <Stack spacing={4}>
      {filterMedias?.map((media) => {
        const Icon = getFileTypeIcon(media.mimeType as string, 20);
        const isMediaOwner = externalUserId === (media as any).owner;

        return (
          <ContentLine
            key={media.id}
            id={media.id}
            leftIcon={Icon}
            onView={() => onClickView(media)}
            onDownload={() => onClickDownload(media)}
            onEdit={
              hasAdminRole || isMediaOwner ? () => onEdit(media) : undefined
            }
            onDelete={
              hasAdminRole || isMediaOwner ? () => onDelete(media) : undefined
            }
            checkable={hasEditPermission}
            onCheck={onCheck}
            isChecked={mediaCheckedIds?.includes(media.id)}
          >
            <CommonContentLineTitle
              id={media.id}
              title={media.title}
              badges={media.groups}
              showSeenBadge={true}
            >
              {isMediaCreatedWithinLastWeek(media) && (
                <Badge colorScheme="orange">{translate("NEW")}</Badge>
              )}
            </CommonContentLineTitle>
          </ContentLine>
        );
      })}
      <Placeholder
        show={isLoading}
        number={3}
        placeholderElement={<ContentLinePlaceholder />}
      />
      <NoContentPlaceholder show={medias.length === 0 && !isLoading} />
    </Stack>
  );
};
