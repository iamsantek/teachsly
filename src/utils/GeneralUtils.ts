import { UserTypes } from "../enums/UserTypes"

export const findAndUpdateContent = <T extends { id: string }>(
  singleContent: T,
  contents: T[]
) => {
  const index = contents.findIndex(
    (content) => content.id === singleContent.id
  )
  contents[index] = singleContent

  return contents
}

export const findMatch = <T extends { groups?: string[]}>(models: T[] | undefined | null, userGroups: string[], userType: UserTypes) => {
  const userGroupsWithType = [...userGroups, userType]
  return models?.filter(model => (model.groups as string[]).filter(group => userGroupsWithType.includes(group)).length > 0)
}
