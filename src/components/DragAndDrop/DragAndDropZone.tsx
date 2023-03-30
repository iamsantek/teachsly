import { Box, Center, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  onDropSuccess: (files: File[]) => void;
}

export const DragAndDropZone = ({ onDropSuccess }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onDropSuccess(acceptedFiles);
    },
    [onDropSuccess]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box
      {...getRootProps()}
      borderWidth={2}
      borderColor="brand.500"
      borderStyle={"dashed"}
      bg="gray.200"
      cursor="pointer"
      borderRadius={8}
      marginY={10}
    >
      <input {...getInputProps()} />
      <Center minHeight="40" display="flex" flexDirection="column" gap={3}>
        <Text textStyle="paragraph" fontWeight="bold">
          {translate("DRAG_AND_DROP_HELPER_TEXT")}
        </Text>
        <Text textStyle="paragraph">
          {translate("DRAG_AND_DROP_HELPER_TEXT_2")}
        </Text>
      </Center>
    </Box>
  );
};
