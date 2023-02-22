import {
  Avatar,
  Badge,
  Button,
  Center,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect, useContext, useMemo } from "react";
import { AiFillFolder, AiOutlinePlus } from "react-icons/ai";
import { LoadMoreButton } from "../../components/Buttons/LoadMoreButton";
import { ContentLine } from "../../components/ContentLine/ContentLine";
import { SectionHeader } from "../../components/Headers/SectionHeader";
import { ContentLinePlaceholder } from "../../components/Placeholders/ContentLinePlaceholder";
import { NoContentPlaceholder } from "../../components/Placeholders/NoContentPlaceholder";
import { Placeholder } from "../../components/Placeholders/Placeholder";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import CourseCRUDModal from "../../modals/CourseCRUDModal";
import CourseService from "../../services/CourseService";
import DateTimeUtils, { TimeFormats } from "../../utils/DateTimeUtils";
import { findAndUpdateContent } from "../../utils/GeneralUtils";
import { translate } from "../../utils/LanguageUtils";
import { CommonContentLineTitle } from "../media/CommonContentLineTitle";
import { Course as CourseAPI } from "../../API";
import { ViewCourseModal } from "../../modals/ViewCourseModal";
import { useNavigate } from "react-router-dom";
import { ButtonSquare } from "../../components/Buttons/SquareButton";
import { MdGroups } from "react-icons/md";
import { generateRandomId } from "../../utils/StringUtils";
import { TooltipHelper } from "../../components/Tooltips/Tooltip";
import {
  generateMediaByCourseRoute,
  generateStudentsByCourseRoute,
} from "../../utils/RouteUtils";
import { BsCardList } from "react-icons/bs";
import { getActiveAndArchivedCourses } from "../../utils/CourseUtils";
import { NoActiveCoursesPlaceholder } from "./NoActiveCoursesPlaceholder";
import { ArchiveCourseList } from "./ArchiveCourseList";

export const AdminCourseList = () => {
  const [courses, setCourses] = useState<CourseAPI[]>([]);
  const [courseCRUDModalVisibility, setCourseCRUDModalVisibility] =
    useState<boolean>(false);
  const [viewCourseModalVisibility, setViewCourseModalVisibility] =
    useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseAPI>();
  const [nextPageResultToken, setNextPageResultToken] = useState<
    string | null
  >();
  const [isLoadingNewPage, setIsLoadingNewPage] = useState<boolean>(true);

  const { context, setApplicationContext } = useContext(UserDashboardContext);

  const navigate = useNavigate();

  const fetchCourses = async () => {
    const courses = await CourseService.fetchCourses({
      nextToken: nextPageResultToken,
    });

    setNextPageResultToken(courses?.listCourses?.nextToken);
    setIsLoadingNewPage(false);

    setCourses((previousCourses) =>
      previousCourses.concat((courses?.listCourses?.items as CourseAPI[]) || [])
    );
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const onEdit = (course: CourseAPI) => {
    setSelectedCourse(course);
    setCourseCRUDModalVisibility(true);
  };

  const onUpdate = (updatedCourse: CourseAPI) => {
    const updatedCourses = findAndUpdateContent(updatedCourse, courses);
    setCourses(updatedCourses);
  };

  const loadMore = () => {
    setIsLoadingNewPage(true);
    fetchCourses();
  };

  const color = useColorModeValue("gray.500", "white");

  const onClose = (modal: "ViewCourseModal" | "CourseCRUDModal") => {
    setSelectedCourse(undefined);
    modal === "ViewCourseModal"
      ? setViewCourseModalVisibility(false)
      : setCourseCRUDModalVisibility(false);
  };

  const onCreate = (newCourse: CourseAPI) => {
    setCourses([newCourse, ...courses]);
    setApplicationContext({
      ...context,
      courses: [newCourse as CourseAPI, ...(courses as CourseAPI[])],
    });
  };

  const { currentYearCourses, archivedCourses } = useMemo(
    () => getActiveAndArchivedCourses(courses),
    [courses]
  );

  // Sort courses by name in ascending order
  const sortedCourses = useMemo(() => {
    return currentYearCourses.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
  }, [currentYearCourses]);

  return (
    <>
      <ViewCourseModal
        isOpen={viewCourseModalVisibility}
        onClose={() => onClose("ViewCourseModal")}
        course={selectedCourse as CourseAPI}
      />
      <CourseCRUDModal
        onCreate={onCreate}
        isOpen={courseCRUDModalVisibility}
        onClose={() => onClose("CourseCRUDModal")}
        courseToUpdate={selectedCourse}
        onUpdate={onUpdate}
      />
      <Stack spacing={4} flexDirection={"column"}>
        <SectionHeader>
          <Center>
            <Button
              leftIcon={<AiOutlinePlus />}
              onClick={() => setCourseCRUDModalVisibility(true)}
              colorScheme="brand"
            >
              {translate("ADD_COURSE_BUTTON")}
            </Button>
          </Center>
        </SectionHeader>
        {currentYearCourses.length === 0 && <NoActiveCoursesPlaceholder />}
        <Stack spacing={4}>
          {sortedCourses.map((course) => {
            const days = DateTimeUtils.shortDays(
              course.scheduleDates as number[]
            );
            const startTime = DateTimeUtils.formateHour(
              course.scheduleStartTime,
              TimeFormats.TwentyFourHours
            );
            const endTime = DateTimeUtils.formateHour(
              course.scheduleEndTime,
              TimeFormats.TwentyFourHours
            );

            const customButtons = [
              <TooltipHelper
                key={generateRandomId()}
                label={translate("LESSON_PLAN")}
              >
                <ButtonSquare
                  onClick={() =>
                    navigate(`/lesson-planning/${course.externalId}`)
                  }
                  icon={<BsCardList />}
                />
              </TooltipHelper>,
              <TooltipHelper
                key={generateRandomId()}
                label={translate("VIEW_STUDENTS")}
              >
                <ButtonSquare
                  onClick={() =>
                    navigate(generateStudentsByCourseRoute(course.externalId))
                  }
                  icon={<MdGroups />}
                />
              </TooltipHelper>,
              <TooltipHelper
                key={generateRandomId()}
                label={translate("VIEW_MEDIAS")}
              >
                <ButtonSquare
                  onClick={() =>
                    navigate(generateMediaByCourseRoute(course.externalId))
                  }
                  icon={<AiFillFolder />}
                />
              </TooltipHelper>,
            ];

            return (
              <ContentLine
                key={course.id}
                leftIcon={<Avatar name={course.name} />}
                onEdit={() => onEdit(course)}
                customButtons={customButtons}
              >
                <CommonContentLineTitle id={course.id} title={course.name}>
                  <Text textStyle={"title"} color={color}>
                    {days}{" "}
                    {!!startTime && !!endTime && `${startTime} - ${endTime}`} (
                    {course.scheduleYear})
                  </Text>
                  {course.virtualClassLink && (
                    <Badge marginLeft={3} colorScheme={"brand"}>
                      {translate("VIRTUAL_COURSE")}
                    </Badge>
                  )}
                </CommonContentLineTitle>
              </ContentLine>
            );
          })}
          <Placeholder
            show={isLoadingNewPage}
            number={2}
            placeholderElement={<ContentLinePlaceholder />}
          />
          <NoContentPlaceholder
            show={courses.length === 0 && !isLoadingNewPage}
          />
          {archivedCourses.length > 0 && (
            <ArchiveCourseList courses={archivedCourses} />
          )}
        </Stack>
      </Stack>
      <LoadMoreButton
        show={!!nextPageResultToken}
        isLoading={isLoadingNewPage}
        onClick={loadMore}
      />
    </>
  );
};
