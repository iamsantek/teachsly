import React from "react";
import { splitCamelCase } from "../../utils/StringUtils";
import { HStack, Badge } from "@chakra-ui/react";

interface Props {
  badges: string[];
}

export const BadgeList: React.FC<Props> = ({ badges }) => (
  <HStack spacing={3}>
    {badges?.map((badge) => (
      <Badge
        key={badge}
        variant="outline"
        rounded={"sm"}
        color="brand.primary"
        borderColor={"red"}
      >
        {splitCamelCase(badge)}
      </Badge>
    ))}
  </HStack>
);
