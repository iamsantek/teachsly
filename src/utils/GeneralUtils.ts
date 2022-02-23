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
