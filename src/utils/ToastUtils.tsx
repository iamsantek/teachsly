import { ToastPosition } from "@chakra-ui/react";
import { TranslationsDictionary } from "../dictionaries/dictionary";
import { translate } from "./LanguageUtils";

interface ToastConfig {
  description: TranslationsDictionary;
  status: "info" | "success" | "error";
  id?: string;
  render?: () => JSX.Element;
  duration?: number | null;
  title?: TranslationsDictionary;
}

export const toastConfig = ({
  description,
  status,
  id,
  render,
  duration,
  title,
}: ToastConfig) => {
  const titleMessage = {
    info: translate("INFO"),
    success: translate("SUCCESS"),
    error: translate("ERROR"),
  };

  return {
    title: title ? translate(title) : titleMessage[status],
    position: "top" as ToastPosition,
    description: translate(description),
    status,
    id,
    render,
    duration,
  };
};
