import { ReactNode } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  VisuallyHidden,
  useColorModeValue,
  Circle,
} from "@chakra-ui/react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import { GeneralInformation } from "../../enums/GeneralInformation";
import { BsCodeSlash } from "react-icons/bs";
import { FiLink } from "react-icons/fi";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <Circle
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      cursor={"pointer"}
      as={"a"}
      href={href}
      target="_blank"
      size={8}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Circle>
  );
};

export const Footer = () => {
  return (
    <Box
      borderTopWidth={1}
      borderStyle={"solid"}
      bg="red.900"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        position="absolute"
        bottom={0}
        py={4}
        flex={1}
        direction={"column"}
        spacing={4}
      >
        <Text textStyle={"title"} fontSize={"xs"}>
          {GeneralInformation.PROJECT_NAME} {new Date().getFullYear()}
        </Text>

        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Website"} href={GeneralInformation.WEBSITE}>
            <FiLink />
          </SocialButton>
          <SocialButton label={"Twitter"} href={GeneralInformation.FACEBOOK}>
            <FaFacebook />
          </SocialButton>
          <SocialButton label={"Instagram"} href={GeneralInformation.INSTAGRAM}>
            <FaInstagram />
          </SocialButton>
          <SocialButton
            label={"Developer"}
            href={GeneralInformation.DEVELOPED_BY}
          >
            <BsCodeSlash />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};
