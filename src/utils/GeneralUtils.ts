import { EnglishLevel } from "../API";
import { UserTypes } from "../enums/UserTypes";
import { LocalStorageSeenItem } from "../interfaces/LocalStorage";
import LocalStorageService, {
  LocalStorageKeys,
} from "../services/LocalStorageService";

export const findAndUpdateContent = <T extends { id: string }>(
  singleContent: T,
  contents: T[]
) => {
  const index = contents.findIndex(
    (content) => content.id === singleContent.id
  );
  contents[index] = singleContent;

  return contents;
};

export const findMatch = <T extends { groups?: string[] }>(
  models: T[] | undefined | null,
  userGroups: string[],
  userType: UserTypes,
  englishLevel: EnglishLevel | undefined
) => {
  if (userType === UserTypes.ADMIN) return models;

  const userGroupsWithType = [...userGroups, userType, englishLevel];
  return models?.filter(
    (model) =>
      (model.groups as string[]).filter((group) =>
        userGroupsWithType.includes(group)
      ).length > 0
  );
};

export const isContentSeen = (mediaId: string) => {
  const storage = LocalStorageService.getItem<LocalStorageSeenItem[]>(
    LocalStorageKeys.VIEWED_CONTENT
  );

  return storage?.some((item) => item.id === mediaId);
};

export const checkIfContentHasBeenSeenBefore = (id: string) => {
  const items =
    LocalStorageService.getItem<LocalStorageSeenItem[]>(
      LocalStorageKeys.VIEWED_CONTENT
    ) ?? [];
  const item = items?.find((item) => item.id === id);

  if (!item) {
    const newItem: LocalStorageSeenItem = {
      id: id,
      timestamp: new Date().getTime(),
    };

    LocalStorageService.saveItem(LocalStorageKeys.VIEWED_CONTENT, [
      ...(items ?? []),
      newItem,
    ]);
    return newItem;
  }

  return item;
};
