import { Stack } from "@chakra-ui/react";
import { FC } from "react";
import { StudentsMediaContentsList } from "./StudentsMediaContentsList";

interface Props {}

export const StudentsMediaContentsScreen: FC<Props> = ({}) => {
  return (
    <Stack spacing={4}>
      <StudentsMediaContentsList />
    </Stack>
  );
};
