import {
  HStack,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";

export const ContentLinePlaceholder = () => {
  const color = useColorModeValue("white", "gray.800");

  return (
    <HStack
      padding={4}
      boxShadow="lg"
      bg={color}
      flex={1}
      flexDirection="row"
      rounded="lg"
      borderWidth="1px"
    >
      <SkeletonCircle />
      <SkeletonText width={1} flex={1} />
    </HStack>
  );
};
