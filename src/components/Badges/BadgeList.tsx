import React from "react";
import { generateRandomId, splitCamelCase } from "../../utils/StringUtils";
import { HStack, Badge } from "@chakra-ui/react";

interface Props {
  badges: string[];
}

export const BadgeList: React.FC<Props> = ({ badges }) => (
  <HStack spacing={3}>
    {badges?.map((badge) => {
      const id = generateRandomId();
      return (
        <Badge
          key={id}
          variant="outline"
          rounded={"sm"}
          color="brand.500"
          borderColor={"red"}
        >
          {splitCamelCase(badge)}
        </Badge>
      );
    })}
  </HStack>
);
