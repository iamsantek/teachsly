import * as React from "react";
import { capitalize, generateRandomId } from "../../utils/StringUtils";
import { HStack, Badge, Wrap, WrapItem } from "@chakra-ui/react";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { groupsToString } from "../../utils/CourseUtils";
import { EnglishLevel } from "../../API";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  badges: string[];
}

const englishLevels = Object.values(EnglishLevel).map((level) =>
  capitalize(level)
);

export const BadgeList: React.FC<Props> = ({ badges }) => {
  const {
    context: { courses },
  } = React.useContext(UserDashboardContext);
  const groupNames = groupsToString(courses, badges);

  return (
    <HStack spacing={3}>
      <Wrap>
        {groupNames?.map((group) => {
          const id = generateRandomId();
          const isEnglishLLevel = englishLevels.includes(group);
          return (
            <WrapItem key={id}>
              <Badge
                rounded="md"
                bg={isEnglishLLevel ? "red.500" : "brand.500"}
                color="white"
              >
                {group}
                {isEnglishLLevel && ` (${translate("ALL_COURSES")})`}
              </Badge>
            </WrapItem>
          );
        })}
      </Wrap>
    </HStack>
  );
};
