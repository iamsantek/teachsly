import { ToastPosition } from "@chakra-ui/react";
import { TranslationsDictionary } from "../dictionaries/dictionary";
import { translate } from "./LanguageUtils";

interface ToastConfig {
  description: TranslationsDictionary;
  status: "info" | "success" | "error";
}

export const toastConfig = ({ description, status }: ToastConfig) => {
  const titleMessage = {
    info: translate("INFO"),
    success: translate("SUCCESS"),
    error: translate("ERROR"),
  };

  return {
    title: titleMessage[status],
    position: "top" as ToastPosition,
    description: translate(description),
    status,
  };
};
