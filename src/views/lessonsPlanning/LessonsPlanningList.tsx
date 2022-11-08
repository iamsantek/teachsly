import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react";
import { ExamType, LessonPlan, LessonPlanningType } from "../../API";
import { ContentLine } from "../../components/ContentLine/ContentLine";
import { contentLineColor } from "../../constants/LessonPlanning";
import { useUserGroups } from "../../hooks/useUserGroups";
import { LessonPlanningItem } from "../../interfaces/LessonPlanning";
import StorageService from "../../services/aws/StorageService";
import { translate } from "../../utils/LanguageUtils";
import { CommonContentLineTitle } from "../media/CommonContentLineTitle";
import { LessonPlanningModal } from "./LessonPlanningModal";

interface Props {
  lessons: LessonPlanningItem[];
  onCreate: (lessonPlan: LessonPlan) => void;
  onDelete: (lessonPlan: LessonPlan) => void;
  onUpdate: (lessonPlan: LessonPlan) => void;
  isModalOpen: boolean;
  onCloseModal: () => void;
  lessonToUpdate: LessonPlan | null;
  onUpdateSuccess: (lessonPlan: LessonPlan) => void;
}

export const LessonsPlanningList = ({
  lessons,
  onCreate,
  onDelete,
  onUpdate,
  isModalOpen,
  onCloseModal,
  lessonToUpdate,
  onUpdateSuccess,
}: Props) => {
  const { hasEditPermission } = useUserGroups();

  // Format date like this: 30 July
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "short" });
    const day = dateObj.getDate();
    return { day, month };
  };

  const LessonDate = ({ date }: { date: string }) => {
    const { day, month } = formatDate(date);
    return (
      <Flex flexDirection="column" zIndex={11}>
        <Text fontSize={10} fontWeight="bold" textAlign={"center"}>
          {" "}
          {day}
        </Text>
        <Text fontSize={10} fontWeight="bold" textAlign={"center"}>
          {" "}
          {month}
        </Text>
      </Flex>
    );
  };

  const onViewExamHandler = (lesson: LessonPlanningItem, type: ExamType) => {
    const examType = type === ExamType.EXAM ? "exams" : "homework";

    if (!lesson.isCompleted) {
      window.open(`/${examType}/${lesson?.id}/intro`, "_blank");
      return;
    }

    if (!lesson.pendingCorrection) {
      window.open(`/${examType}/results/${lesson.examAttemptId}`, "_blank");
      return;
    }

    if (hasEditPermission) {
      window.open(`/${examType}/attempt/${lesson.examAttemptId}`, "_blank");
    } else {
      return null;
    }
  };

  const onView = async (lesson: LessonPlanningItem) => {
    switch (lesson.type) {
      case LessonPlanningType.MEDIA:
        // Open in a new tab the media
        const mediaLink = await StorageService.getSignedUrl(
          lesson.media as string
        );
        window.open(mediaLink?.url, "_blank");
        break;
      case LessonPlanningType.HOMEWORK:
        onViewExamHandler(lesson, ExamType.HOMEWORK);
        break;
      case LessonPlanningType.EXAM:
        onViewExamHandler(lesson, ExamType.EXAM);
        break;
      case LessonPlanningType.LESSON:
        if (lesson.media) {
          const mediaLink = await StorageService.getSignedUrl(
            lesson.media as string
          );
          window.open(mediaLink?.url, "_blank");
        }
        break;
      default:
        return undefined;
    }
  };

  return (
    <>
      <LessonPlanningModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        onUpdate={onUpdateSuccess}
        onCreate={onCreate}
        lessonToUpdate={lessonToUpdate}
      />
      <Stack spacing={5} marginBottom={10}>
        <Text textStyle="title" fontSize="xl">
          {translate("LESSON_PLAN_TITLE")}
        </Text>
        <Box position={"relative"}>
          <Box
            marginLeft={8}
            position={"absolute"}
            top="0"
            height="100%"
            width={2}
            backgroundColor="brand.500"
            zIndex={1}
          />
          <Stack spacing={5}>
            {lessons.map((lesson) => {
              const isLessonPlan = lesson.type === LessonPlanningType.LESSON;
              return (
                <Box>
                  <ContentLine
                    key={lesson.id}
                    transformOnHover={false}
                    leftIcon={<LessonDate date={lesson.date} />}
                    noBorder={true}
                    onDelete={
                      hasEditPermission && isLessonPlan
                        ? () => onDelete(lesson)
                        : undefined
                    }
                    onEdit={
                      hasEditPermission && isLessonPlan
                        ? () => onUpdate(lesson)
                        : undefined
                    }
                    onView={() => onView(lesson)}
                  >
                    <CommonContentLineTitle
                      id={lesson.id}
                      title={lesson.title}
                      header={
                        <Badge
                          variant="subtle"
                          color="gray.900"
                          colorScheme={
                            contentLineColor[
                              lesson.type ?? LessonPlanningType.OTHER
                            ]
                          }
                        >
                          {lesson.type}
                        </Badge>
                      }
                    >
                      <Text color="gray.600" noOfLines={3}>
                        {lesson.content}
                      </Text>
                      <Flex gap={3}>{lesson.renderElement}</Flex>
                    </CommonContentLineTitle>
                  </ContentLine>
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Stack>
    </>
  );
};
