import { chakra, Flex, Text } from "@chakra-ui/react";
import { translate } from "../../utils/LanguageUtils";
import { TbMoodEmpty } from "react-icons/tb";

export const NoActiveCoursesPlaceholder = () => {
  const NoResultsIcon = chakra(TbMoodEmpty);
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      h="100%"
      w="100%"
      p={4}
      gap={3}
    >
      <NoResultsIcon size={50} />
      <Text fontSize="xl" fontWeight="bold" textAlign="center">
        {translate("NO_ACTIVE_COURSES")}
      </Text>
      <Text fontSize="md" textAlign="center">
        {translate("NO_ACTIVE_COURSES_DESCRIPTION")}
      </Text>
    </Flex>
  );
};
