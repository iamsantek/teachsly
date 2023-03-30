import { Button } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionHeader } from "../../components/Headers/SectionHeader";
import { translate } from "../../utils/LanguageUtils";
import { ExamsList } from "./ExamsList";
import { useUserGroups } from "../../hooks/useUserGroups";
import { BsCardChecklist } from "react-icons/bs";

export const ExamsHomeScreen = () => {
  const navigate = useNavigate();
  const { hasEditPermission } = useUserGroups();
  const location = useLocation();
  const isExam = location.pathname.includes("exams");

  return (
    <>
      <SectionHeader>
        {hasEditPermission && (
          <>
            <Button
              colorScheme="brand"
              leftIcon={<AiOutlinePlus />}
              onClick={() => navigate(isExam ? "/exams/new" : "/homework/new")}
            >
              {translate(isExam ? "NEW_EXAM" : "NEW_HOMEWORK")}
            </Button>
            <Button
              colorScheme="brand"
              leftIcon={<BsCardChecklist />}
              onClick={() =>
                navigate(isExam ? "/exams/attempts" : "/homework/attempts")
              }
            >
              {translate(isExam ? "EXAM_ATTEMPTS" : "HOMEWORK_DONE")}
            </Button>
          </>
        )}
      </SectionHeader>
      <ExamsList />
    </>
  );
};
