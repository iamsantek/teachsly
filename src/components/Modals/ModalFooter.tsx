import {
  ModalFooter as ChakraModalFooter,
  HStack,
  Button,
} from "@chakra-ui/react";
import { TranslationsDictionary } from "../../dictionaries/dictionary";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  isLoading: boolean;
  onClose: () => void;
  sendButtonText: TranslationsDictionary;
}

export const ModalFooter = ({ isLoading, onClose, sendButtonText }: Props) => (
  <ChakraModalFooter>
    <HStack>
      <Button onClick={onClose}>{translate("CANCEL")}</Button>
      <Button
        colorScheme="brand"
        isLoading={isLoading}
        loadingText={translate("PROCESSING")}
        type="submit"
      >
        {translate(sendButtonText)}
      </Button>
    </HStack>
  </ChakraModalFooter>
);
