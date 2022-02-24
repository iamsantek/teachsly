import { Stack } from "@chakra-ui/react";
import { FC } from "react";
import { MediaContentsList } from "./MediaContentsList";

interface Props {}

export const MediaContentsScreen: FC<Props> = ({}) => {
  return (
    <Stack spacing={4}>
      <MediaContentsList />
    </Stack>
  );
};
