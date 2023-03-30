import { Center, Button } from "@chakra-ui/react";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  show: boolean;
  isLoading: boolean;
  onClick: () => void;
}

export const LoadMoreButton = ({ show, isLoading, onClick }: Props) => {
  if (!show) {
    return null;
  }

  return (
    <Center>
      <Button
        rounded={"lg"}
        colorScheme="brand"
        onClick={onClick}
        marginTop={4}
        isLoading={isLoading}
        loadingText={translate("PROCESSING")}
      >
        {translate("LOAD_MORE")}
      </Button>
    </Center>
  );
};
