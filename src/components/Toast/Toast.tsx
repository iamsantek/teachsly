import {
  AlertStatus,
  createStandaloneToast,
  theme,
  ToastPositionWithLogical,
} from "@chakra-ui/react";
import { TranslationsDictionary } from "../../dictionaries/dictionary";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  description: TranslationsDictionary;
  status: "INFO" | "SUCCESS" | "ERROR";
  position?: ToastPositionWithLogical;
  duration?: number;
}

export const Toast = ({
  description,
  status,
  position = "top",
  duration = 5000,
}: Props) => {
  const toast = createStandaloneToast();

  return toast({
    title: translate(status),
    description: translate(description),
    status: status.toLowerCase() as AlertStatus,
    duration,
    isClosable: true,
    position,
  });
};
