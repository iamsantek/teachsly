import { Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { DisabledAccountWarning } from "../../components/Alert/DisabledAccountWarning";
import { SectionHeader } from "../../components/Headers/SectionHeader";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import { CourseList } from "../courses/CourseList";

export const TeachersHomeScreen = () => {
  const {
    context: { user },
  } = useContext(UserDashboardContext);
  return (
    <Stack>
      {user?.isDisabledUser ? (
        <DisabledAccountWarning />
      ) : (
        <>
          <SectionHeader />
          <CourseList />
        </>
      )}
    </Stack>
  );
};
