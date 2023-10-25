import { Badge, Box, Flex, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { ExamType, LessonPlan, LessonPlanningType } from "../../API";
import { ContentLine } from "../../components/ContentLine/ContentLine";
import { contentLineColor } from "../../constants/LessonPlanning";
import { useUserGroups } from "../../hooks/useUserGroups";
import { LessonPlanningItem } from "../../interfaces/LessonPlanning";
import StorageService from "../../services/aws/StorageService";
import { translate } from "../../utils/LanguageUtils";
import { CommonContentLineTitle } from "../media/CommonContentLineTitle";
import { LessonPlanningModal } from "./LessonPlanningModal";
import { GoogleAnalyticsCategory } from "../../constants/Analytics";
import AnalyticsService from "../../services/AnalyticsService";
import { useEffect } from "react";

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
  const { hasEditPermission, hasStudentRole } = useUserGroups();

  useEffect(() => {
    if (hasStudentRole) {
      AnalyticsService.sendEventToAnalytics({
        category: GoogleAnalyticsCategory.CLASS,
        action: "VIEW_LESSON_PLANNING",
      });
    }
  }, [hasStudentRole]);

  const LessonDate = ({ date }: { date: string }) => {
    const formattedDate = dayjs(date).format("DD MMM");
    return (
      <Flex flexDirection="column" zIndex={11}>
        <Text fontSize={10} fontWeight="bold" textAlign={"center"}>
          {formattedDate}
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
        AnalyticsService.sendEventToAnalytics({
          category: GoogleAnalyticsCategory.EXAM,
          action: "VIEW_HOMEWORK",
        });
        onViewExamHandler(lesson, ExamType.HOMEWORK);
        break;
      case LessonPlanningType.EXAM:
        AnalyticsService.sendEventToAnalytics({
          category: GoogleAnalyticsCategory.EXAM,
          action: "VIEW_EXAM",
        });
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
      case LessonPlanningType.RECORDING:
        AnalyticsService.sendEventToAnalytics({
          category: GoogleAnalyticsCategory.MEDIA,
          action: "VIEW_RECORDING",
        });
        window.open(`/recording/${lesson.externalId}`, "_blank");
        break;
      case LessonPlanningType.LINK:
        AnalyticsService.sendEventToAnalytics({
          category: GoogleAnalyticsCategory.MEDIA,
          action: "VIEW_LINK",
        });
        window.open(lesson.link as string, "_blank");
        break;
      default:
        return undefined;
    }
  };

  const deletionAllowedTypes = [
    LessonPlanningType.LESSON,
    LessonPlanningType.MEDIA,
    LessonPlanningType.OTHER,
    LessonPlanningType.LINK,
    LessonPlanningType.RECORDING,
  ];

  const editionAllowedTypes = [
    LessonPlanningType.LESSON,
    LessonPlanningType.OTHER,
    LessonPlanningType.LINK,
    LessonPlanningType.RECORDING,
  ];

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
        {lessons.length !== 0 && (
          <Text textStyle="title" fontSize="xl">
            {translate("LESSON_PLAN_TITLE")}
          </Text>
        )}
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
              const isRecording = lesson.type === LessonPlanningType.RECORDING;
              return (
                <Box paddingLeft={isRecording ? 50 : 0}>
                  <ContentLine
                    key={lesson.id}
                    transformOnHover={false}
                    leftIcon={<LessonDate date={lesson.date} />}
                    noBorder={true}
                    onDelete={
                      hasEditPermission &&
                      deletionAllowedTypes.includes(
                        lesson.type as LessonPlanningType
                      )
                        ? () => onDelete(lesson)
                        : undefined
                    }
                    onEdit={
                      hasEditPermission &&
                      editionAllowedTypes.includes(
                        lesson.type as LessonPlanningType
                      )
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
