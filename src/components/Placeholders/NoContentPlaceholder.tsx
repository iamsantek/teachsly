import { Center, Stack, Text } from "@chakra-ui/react";
import { AiFillFilter } from "react-icons/ai";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  show: boolean;
}

export const NoContentPlaceholder = ({ show }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <Stack as={Center}>
      <AiFillFilter size={60} />
      <Text textStyle={"title"}>{translate("NO_CONTENT_TILE")}</Text>
      <Text textStyle={"paragraph"}>{translate("NO_CONTENT_DESCRIPTION")}</Text>
    </Stack>
  );
};
