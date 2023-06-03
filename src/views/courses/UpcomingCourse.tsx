import { Alert, Flex, Text, Button, Box } from "@chakra-ui/react";
import { Course } from "../../API";
import DateTimeUtils, { TimeFormats } from "../../utils/DateTimeUtils";
import { GrNext } from "react-icons/gr";
import { BiVideoRecording } from "react-icons/bi";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { useContext } from "react";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  course: Course;
}

export const UpcomingCourse = ({ course }: Props) => {
  const {
    context: { user },
  } = useContext(UserDashboardContext);
  const today = new Date().getDay();
  const correctedToday = today === 7 ? 0 : today;

  const liveClassesUrl = `${process.env.REACT_APP_ZOOM_CLASSES_LINK}/?meetingId=${course.zoomMeetingId}&userId=${user?.id}`;

  const startTime = DateTimeUtils.formateHour(
    course.scheduleStartTime,
    TimeFormats.TwentyFourHours
  );

  return (
    <Alert
      w="100%"
      bgColor="gray.100"
      border="1px solid"
    >
      <Flex alignItems="center" gap={3} width="100%">
        <GrNext />
        <Flex
          flexDirection={["column", "row"]}
          justifyContent={["flex-start", "space-between"]}
          width="100%"
          alignItems="center"
          gap={3}
        >
          <Text textAlign="start" textStyle={"title"} minW={'50%'}>
            {translate("YOUR_CLASS")} {course.name} {translate("BEGINS")}{" "}
            {translate(
              course.scheduleDates?.includes(correctedToday)
                ? "TODAY"
                : "TOMORROW"
            )}{" "}
            {translate("AT")} {startTime}hs
          </Text>
          {course.isVirtual && course.zoomMeetingId && (
            <Flex width="100%" justifyContent={"flex-end"}>
              <Button
                colorScheme="brand"
                leftIcon={<BiVideoRecording />}
                onClick={() => window.open(liveClassesUrl, "_blank")}
                color="whiteAlpha.900"
                width={["100%", "auto"]}
              >
                {translate("GO_TO_CLASS")}
              </Button>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Alert>
  );
};
