import { Box, Text, Avatar, Badge, Flex } from "@chakra-ui/react";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { Course } from "../../API";
import DateTimeUtils, { TimeFormats } from "../../utils/DateTimeUtils";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  course: Course;
}

export const CourseCardPreview = ({ course }: Props) => {
  const { name, scheduleStartTime, scheduleEndTime, scheduleDates, isVirtual } =
    course;
  const startTime = DateTimeUtils.formateHour(
    scheduleStartTime,
    TimeFormats.TwentyFourHours
  );
  const endTime = DateTimeUtils.formateHour(
    scheduleEndTime,
    TimeFormats.TwentyFourHours
  );
  const dates = DateTimeUtils.shortDays(scheduleDates as number[]);

  return (
    <Box
      rounded="lg"
      flexBasis="100%"
      borderWidth="1px"
      boxShadow="lg"
      p={4}
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="row"
      gap={4}
      alignContent="flex-start"
      justifyContent="space-between"
      height="100%"
      width="100%"
      _hover={{
        transform: "scale(1.03)",
        cursor: "pointer",
      }}
      onClick={() =>
        (window.location.href = `/lesson-planning/${course.externalId}`)
      }
    >
      <Box display={"flex"} gap={3} width="100%">
        <Avatar name={name} />
        <Box
          display="flex"
          alignItems="baseline"
          flexDirection="column"
          gap={3}
          width="100%"
        >
          <Flex justifyContent="space-between" width="100%">
            <Badge rounded="md" bg="brand.500" color="white">
              {translate(isVirtual ? "VIRTUAL_COURSE" : "ON_SITE_CLASS")}
            </Badge>
            <Text fontSize="xs" fontWeight="bold">
              {course.scheduleYear ?? ""}
            </Text>
          </Flex>
          <Box display="flex" flexDirection={"column"}>
            <Text as="h1" textStyle={"title"} fontSize={"xl"}>
              {name}
            </Text>
            <Box display={"flex"} gap={2} alignItems="center">
              <AiOutlineCalendar />
              <Text textStyle={"paragraph"} color="gray.500">
                {dates}
              </Text>
            </Box>
            <Box display={"flex"} gap={2} alignItems="center">
              <BiTimeFive />
              <Text textStyle={"paragraph"} color="gray.500">
                {startTime} - {endTime}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
