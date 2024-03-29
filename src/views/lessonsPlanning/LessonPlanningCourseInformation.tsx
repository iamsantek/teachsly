import { Heading, Stack, Flex, Text, Box, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import {
  AiFillFolder,
  AiOutlineClockCircle,
  AiOutlinePlus,
} from "react-icons/ai";
import { BsWhatsapp } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Course, User } from "../../API";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { useUserGroups } from "../../hooks/useUserGroups";
import UserService from "../../services/UserService";
import DateTimeUtils, { TimeFormats } from "../../utils/DateTimeUtils";
import { translate } from "../../utils/LanguageUtils";
import { CourseDays } from "./CourseDays";

interface Props {
  onAddLessonClick: () => void;
}

export const LessonPlanningCourseInformation = ({
  onAddLessonClick,
}: Props) => {
  const [teachers, setTeachers] = useState<User[]>([]);
  const { courseId } = useParams();
  const { hasEditPermission } = useUserGroups();
  const {
    context: { courses, user },
  } = useContext(UserDashboardContext);
  const navigate = useNavigate();
  const course = courses.find(
    (course) => course.externalId === courseId
  ) as Course;

  useEffect(() => {
    fetchTeachers();
  }, []);

  if (!course) {
    return null;
  }

  const fetchTeachers = async () => {
    const teachers = await UserService.fetchTeacherByCourseId(
      course.externalId
    );
    setTeachers((teachers?.listUsers?.items as User[]) ?? []);
  };

  const { name, scheduleDates, scheduleEndTime, scheduleStartTime } = course;
  const startTime = DateTimeUtils.formateHour(
    scheduleStartTime,
    TimeFormats.TwentyFourHours
  );
  const endTime = DateTimeUtils.formateHour(
    scheduleEndTime,
    TimeFormats.TwentyFourHours
  );

  const liveClassesUrl = `${process.env.REACT_APP_ZOOM_CLASSES_LINK}/?meetingId=${course.zoomMeetingId}&userId=${user?.id}`;

  return (
    <Stack spacing={4} marginBottom={10}>
      <Flex gap={5}>
        <Heading>{name}</Heading>
        {hasEditPermission && (
          <Button
            colorScheme="brand"
            leftIcon={<AiOutlinePlus />}
            onClick={onAddLessonClick}
          >
            {translate("NEW_LESSON_PLAN")}
          </Button>
        )}
      </Flex>
      <Flex justifyContent="space-between" flexDirection={{ base: 'column', md: 'row'}}>
        <Flex gap={3} flexDirection="column">
          <Flex gap={3}>
            <CourseDays days={scheduleDates as number[]} />
            <Flex gap={3} alignItems="center">
              <AiOutlineClockCircle size={25} color="gray.300" />
              <Text>
                {startTime} - {endTime}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            {teachers.length > 0 && (
              <Box>
                <Text fontWeight="bold">{translate("MENU_TEACHERS")}</Text>
                {teachers.map((teacher) => (
                  <Flex gap={3}>
                    <Text>🗒 {teacher.name}</Text>
                    <BsWhatsapp
                      size={20}
                      color="green.500"
                      cursor="pointer"
                      onClick={() =>
                        window.open(
                          `https://api.whatsapp.com/send?phone=${teacher.phone}`
                        )
                      }
                    />
                  </Flex>
                ))}
              </Box>
            )}
          </Flex>
        </Flex>

        <Flex flexDirection="column" marginY={{base: 3, md: 0}} gap={3} alignItems={{ base: "flex-start", md: "flex-end"}}>
          <Text fontWeight="bold">{translate("USEFUL_LINKS")}</Text>
          <Button
            size="sm"
            onClick={() => navigate(`/medias/${course.externalId}`)}
            leftIcon={<AiFillFolder color="brand" />}
          >
            {translate("MENU_CONTENTS")}
          </Button>
          {course?.zoomMeetingId && (
            <Button
              size="sm"
              onClick={() =>
                window.open(liveClassesUrl as string, "_blank")
              }
              leftIcon={<FaExternalLinkAlt color="brand" />}
            >
              {translate("GO_TO_VIRTUAL_CLASS")}
            </Button>
          )}
        </Flex>
      </Flex>
    </Stack>
  );
};
