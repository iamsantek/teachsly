import { Grid, GridItem } from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import { Course } from "../../API";
import { CourseCardPreview } from "../../components/Card/CourseCardPreview";
import { CoursePreviewPlaceholder } from "../../components/Placeholders/CoursePreviewPlaceholder";
import { Placeholder } from "../../components/Placeholders/Placeholder";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import CourseService from "../../services/CourseService";
import { getActiveAndArchivedCourses } from "../../utils/CourseUtils";
import { ArchiveCourseList } from "./ArchiveCourseList";
import { NoActiveCoursesPlaceholder } from "./NoActiveCoursesPlaceholder";

export const CourseList = () => {
  const [currentCourses, setCurrentCourses] = useState<Course[]>([]);
  const {
    context: { user, courses },
  } = useContext(UserDashboardContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      if (!user?.groups) {
        return;
      }

      const enrolledCourses = CourseService.getEnrolledCourses(
        user?.groups as string[]
      );
      const userCourses = courses.filter(
        (course) =>
          enrolledCourses.includes(course.externalId) && course.isActive
      );

      setCurrentCourses(userCourses || []);
      setIsLoading(false);
    };

    fetchCourses();
  }, [user?.groups, courses]);

  const { currentYearCourses, archivedCourses } = useMemo(
    () => getActiveAndArchivedCourses(currentCourses),
    [currentCourses]
  );

  return (
    <>
      {currentYearCourses.length === 0 && <NoActiveCoursesPlaceholder />}
      <Grid
        gap={5}
        flexDir={["column", "row"]}
        templateColumns={["repeat(1, 1,fr)", "repeat(3, 1fr)"]}
      >
        {currentYearCourses.map((course) => (
          <GridItem>
            <CourseCardPreview course={course} key={course.id} />
          </GridItem>
        ))}
      </Grid>
      {archivedCourses.length > 0 && (
        <ArchiveCourseList courses={archivedCourses} />
      )}
      <Placeholder
        show={isLoading}
        number={2}
        placeholderElement={<CoursePreviewPlaceholder />}
        orientation="row"
      />
    </>
  );
};
