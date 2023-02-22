import { Stack, Text, Center, Button } from "@chakra-ui/react";
import { translate } from "../../utils/LanguageUtils";
import { AiFillFilter } from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";

export const DisabledAccountWarning = () => {
  return (
    <>
      <Stack as={Center} padding={10} margin={10}>
        <AiFillFilter size={60} />
        <Text textStyle={"title"}>
          {translate("DISABLED_ACCOUNT_ALERT_TITLE")}
        </Text>
        <Text textStyle={"paragraph"}>
          {translate("DISABLED_ACCOUNT_ALERT_DESCRIPTION")}
        </Text>
        <Button
          colorScheme="whatsapp"
          leftIcon={<BsWhatsapp />}
          onClick={() =>
            window.open(
              `https://api.whatsapp.com/send?phone=5492213041958`,
              "_blank"
            )
          }
          color="whiteAlpha.900"
        >
          {translate("CONTACT_US")}
        </Button>
      </Stack>
    </>
  );
};
