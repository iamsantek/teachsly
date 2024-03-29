import { useHighlight, Text } from "@chakra-ui/react";
import {
  generateCorrectionMatches,
  getMarkColor,
} from "../../../../../utils/ExamUtils";

interface Props {
  markdownText: string;
}

export const TextMarkdownViewer = ({ markdownText }: Props) => {
  const { matches } = generateCorrectionMatches(markdownText);

  const generalChunks = useHighlight({
    text: markdownText.replace("\n", "___"),
    query: matches,
  });

  const deleteSpecialCharactersRegExp = /[*#\-/+]/g;

  if (!generalChunks.length) {
    return <Text>{markdownText}</Text>;
  }

  return (
    <>
      {generalChunks.map(
        ({ text, match }: { text: string; match: boolean }) => {
          if (!match) {
            return (
              <span
                dangerouslySetInnerHTML={{
                  __html: text.replace("___", "</br>"),
                }}
              />
            );
          }

          const { color } = getMarkColor(text);
          return (
            <Text as="span" bgColor={color} marginX={1} color="whiteAlpha.900">
              {text.replace(deleteSpecialCharactersRegExp, "")}
            </Text>
          );
        }
      )}
    </>
  );
};
