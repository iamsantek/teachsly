import { Course } from "../../API";
import { getUpcomingCourses } from "../../utils/CourseUtils";
import { Stack, Text } from "@chakra-ui/react";
import { UpcomingCourse } from "./UpcomingCourse";
import { translate } from "../../utils/LanguageUtils";

interface Props {
  courses: Course[];
}

export const NextClassMessage = ({ courses }: Props) => {
  const upcomingCourses = getUpcomingCourses(courses);

  if (upcomingCourses.length === 0) return null;

  return (
    <Stack spacing={3} paddingY={5}>
      <Text textStyle={"title"}>{translate("UPCOMING_CLASSES")}</Text>
      {upcomingCourses.map((course) => (
        <UpcomingCourse course={course} key={course.id} />
      ))}
    </Stack>
  );
};
