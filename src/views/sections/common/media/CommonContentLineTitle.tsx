import { Container, HStack, Text } from "@chakra-ui/react";
import { BadgeList } from "../../../../components/Badges/BadgeList";

interface Props {
  title: string;
  badges?: string[];
}

export const CommonContentLineTitle = ({ title, badges }: Props) => (
  <HStack spacing={3} flex={1} justifyContent="start">
    <Text w="90%" textStyle="title" color={"gray.800"} textAlign="start">
      {title}
    </Text>
    {/* <Container flex="1" display={{ base: "none", md: "flex" }}>
            <BadgeList badges={badges || []} />
        </Container> */}
  </HStack>
);
