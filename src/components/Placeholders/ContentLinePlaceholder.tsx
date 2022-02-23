import { HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

export const ContentLinePlaceholder = () => (
  <HStack
    marginY={4}
    padding={4}
    boxShadow="lg"
    bg="white"
    flex={1}
    flexDirection="row"
  >
    <SkeletonCircle />
    <SkeletonText width={1} flex={1} />
  </HStack>
);
