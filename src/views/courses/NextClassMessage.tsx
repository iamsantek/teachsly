import { Course } from "../../API";
import { getUpcomingCourses } from "../../utils/CourseUtils";
import { Stack, Text } from "@chakra-ui/react";
import { UpcomingCourse } from "./UpcomingCourse";

interface Props {
  courses: Course[];
}

export const NextClassMessage = ({ courses }: Props) => {
  const upcomingCourses = getUpcomingCourses(courses);

  return (
    <Stack spacing={3} paddingY={5}>
        <Text textStyle={'title'}>
            Próximas clases
        </Text>
      {upcomingCourses.map((course) => (
        <UpcomingCourse course={course} key={course.id} />
      ))}
    </Stack>
  );
};
