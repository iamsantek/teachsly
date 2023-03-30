import { Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useGroupRoutes } from "../../utils/RouteUtils";
import { AdminCourseList } from "./AdminCourseList";

export const CourseList = () => {
  const { isAllowedRoute } = useGroupRoutes();
  const navigate = useNavigate();

  if (!isAllowedRoute) {
    navigate("/");
    return null;
  }

  return (
    <Stack spacing={4}>
      <AdminCourseList />
    </Stack>
  );
};
