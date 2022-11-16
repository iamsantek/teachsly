import { LessonsPlanningList } from "./LessonsPlanningList";
import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  deleteLessonPlan,
  getLessonPlansByCourseId,
} from "../../services/LessonPlanService";
import {
  CreateLessonPlanInput,
  EnglishLevel,
  Exam,
  ExamAttempt,
  ExamType,
  LessonPlan,
  LessonPlanningType,
} from "../../API";
import { findAndUpdateContent } from "../../utils/GeneralUtils";
import MediaService from "../../services/MediaService";
import { useParams } from "react-router-dom";
import { UserDashboardContext } from "../../contexts/UserDashboardContext";
import ExamService from "../../services/ExamService";
import { LessonPlanningCourseInformation } from "./LessonPlanningCourseInformation";
import { Placeholder } from "../../components/Placeholders/Placeholder";
import { ContentLinePlaceholder } from "../../components/Placeholders/ContentLinePlaceholder";
import { LessonPlanningItem } from "../../interfaces/LessonPlanning";
import { Badge, Box } from "@chakra-ui/react";
import { getBadgeWithExamAttempt } from "../../utils/ExamUtils";
import { useUserGroups } from "../../hooks/useUserGroups";
import { NoContentPlaceholder } from "../../components/Placeholders/NoContentPlaceholder";

enum FetchType {
  EXAMS = "EXAMS",
  MEDIA = "MEDIA",
  EXAM_ATTEMPTS = "EXAM_ATTEMPTS",
  LESSONS = "LESSONS",
}

const initialNextPageTokens: { [key in FetchType]: string | undefined } = {
  [FetchType.EXAMS]: undefined,
  [FetchType.EXAM_ATTEMPTS]: undefined,
  [FetchType.MEDIA]: undefined,
  [FetchType.LESSONS]: undefined,
};

const nextPageTokenReducer = (
  state: { [key in FetchType]: string | undefined },
  action: { type: FetchType; payload: string | undefined | null }
) => {
  return {
    ...state,
    [action.type]: action.payload,
  };
};

export const LessonsPlanningHomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessons, setLessons] = useState<LessonPlanningItem[]>([]);
  const [mediaLoading, setMediaLoading] = useState(true);
  const [examLoading, setExamLoading] = useState(true);
  const [examAttemptsLoading, setExamAttemptsLoading] = useState(true);
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [lessonPlanningLoading, setLessonPlanningLoading] = useState(true);
  const [lessonToUpdate, setLessonToUpdate] = useState<LessonPlan | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const { courseId } = useParams();
  const {
    context: { user },
  } = useContext(UserDashboardContext);
  const [nextPageTokens, dispatch] = useReducer(
    nextPageTokenReducer,
    initialNextPageTokens
  );
  const { hasAdminRole, hasStudentRole } = useUserGroups();

  const fetchLessonPlans = useCallback(async () => {
    setLessonPlanningLoading(true);
    const lessonPlans = await getLessonPlansByCourseId(
      courseId as string,
      nextPageTokens.LESSONS
    );
    if (lessonPlans?.listLessonPlans?.items) {
      setLessons((currentLessons) =>
        currentLessons.concat(
          lessonPlans.listLessonPlans?.items as LessonPlan[]
        )
      );
    }

    if (lessonPlans?.listLessonPlans?.nextToken) {
      dispatch({
        type: FetchType.LESSONS,
        payload: lessonPlans.listLessonPlans.nextToken,
      });
    }

    setLessonPlanningLoading(false);
  }, [nextPageTokens.LESSONS, courseId]);

  const generateLessonPlanningByExams = useCallback(() => {
    const lessonPlannings: CreateLessonPlanInput[] = exams
      ?.map((exam) => {
        const examAttempt = examAttempts.find(
          (attempt) => attempt.examName === exam?.title && attempt.score
        );
        const pendingCorrection =
          examAttempt?.isCompleted && !examAttempt.correctedBy;
        const { badgeColor, badgeText } = getBadgeWithExamAttempt(
          exam,
          examAttempt as ExamAttempt
        );

        return {
          id: exam?.id,
          title: exam?.title,
          type:
            exam?.type === ExamType.HOMEWORK
              ? LessonPlanningType.HOMEWORK
              : LessonPlanningType.EXAM,
          date: exam?.createdAt,
          renderElement: hasStudentRole && (
            <Box marginX={10}>
              <Badge colorScheme={badgeColor}>{badgeText}</Badge>
            </Box>
          ),
          examAttemptId: examAttempt?.id,
          pendingCorrection,
          isCompleted: examAttempt?.isCompleted,
        };
      })
      .filter((x) => x) as LessonPlanningItem[];

    setLessons((currentLessons) =>
      currentLessons.concat(lessonPlannings as LessonPlanningItem[])
    );
  }, [exams, examAttempts, hasStudentRole]);

  const fetchExamAttempts = useCallback(async () => {
    const examNames = exams.map((exam) => exam.title as string);
    const examAttempts = await ExamService.getExamAttemptsByExamNameAndUserId(
      examNames,
      user?.cognitoId as string,
      nextPageTokens.EXAM_ATTEMPTS
    );

    if ((examAttempts?.listExamAttempts?.items?.length ?? 0) > 0) {
      setExamAttempts((currentExamAttempts) =>
        currentExamAttempts.concat(
          examAttempts?.listExamAttempts?.items as ExamAttempt[]
        )
      );
    }

    if (
      examAttempts?.listExamAttempts?.nextToken &&
      examAttempts.listExamAttempts.items.length !== 0
    ) {
      dispatch({
        type: FetchType.EXAM_ATTEMPTS,
        payload: examAttempts.listExamAttempts.nextToken,
      });
    } else {
      setExamAttemptsLoading(false);
    }
  }, [nextPageTokens.EXAM_ATTEMPTS, user?.cognitoId, exams]);

  useEffect(() => {
    if (!examAttemptsLoading) {
      generateLessonPlanningByExams();
    }
  }, [examAttemptsLoading, generateLessonPlanningByExams]);

  const fetchExams = useCallback(async () => {
    const exams = await ExamService.fetchExamsByCourseId(
      courseId,
      user?.englishLevel as EnglishLevel,
      nextPageTokens.EXAMS
    );

    if ((exams?.listExams?.items?.length ?? 0) > 0) {
      setExams((currentExams) =>
        currentExams.concat(exams?.listExams?.items as Exam[])
      );
    }

    if (exams?.listExams?.nextToken && exams.listExams.items.length !== 0) {
      dispatch({ type: FetchType.EXAMS, payload: exams.listExams.nextToken });
    } else {
      setExamLoading(false);
    }
  }, [nextPageTokens.EXAMS, courseId, user?.englishLevel]);

  useEffect(() => {
    if (!examLoading) {
      if (exams.length > 0) {
        fetchExamAttempts();
      } else {
        setExamAttemptsLoading(false);
      }
    }
  }, [examLoading, fetchExamAttempts, exams.length]);

  const fetchMedias = useCallback(async () => {
    const medias = await MediaService.fetchMediaByCourseId(
      courseId,
      user?.englishLevel as EnglishLevel,
      false,
      nextPageTokens.MEDIA
    );

    const newLessonPlans: CreateLessonPlanInput[] = medias?.listMedia?.items
      ?.map((media) => {
        return {
          id: media?.id,
          title: media?.title,
          content: media?.description,
          uploadedBy: media?.uploadedBy,
          type: LessonPlanningType.MEDIA,
          date: media?.createdAt,
          media: media?.link,
        };
      })
      .filter((x) => x) as CreateLessonPlanInput[];

    setLessons((lessonPlans) =>
      lessonPlans.concat(newLessonPlans as LessonPlanningItem[])
    );

    if (medias?.listMedia?.nextToken) {
      dispatch({ type: FetchType.MEDIA, payload: medias.listMedia.nextToken });
    }

    setMediaLoading(false);
  }, [nextPageTokens.MEDIA, courseId, user?.englishLevel]);

  useEffect(() => {
    const isAllowedCourse = user?.groups?.some((group) => group === courseId);

    if (!isAllowedCourse && !hasAdminRole) {
      window.location.href = "/";
      return;
    }
  }, [user?.groups, courseId, hasAdminRole]);

  useEffect(() => {
    fetchMedias();
  }, [fetchMedias]);

  useEffect(() => {
    fetchLessonPlans();
  }, [fetchLessonPlans]);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  // Sort elements by date (asc)
  const sortLessons = (lessons: LessonPlan[]) => {
    return lessons.sort((a, b) => {
      const dateA: Date = new Date(a.date);
      const dateB: Date = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const onDelete = async (lessonPlan: LessonPlan) => {
    const deletedLessonPlan = await deleteLessonPlan(lessonPlan.id);
    if (deletedLessonPlan) {
      const newLessons = lessons.filter(
        (lesson) => lesson.id !== lessonPlan.id
      );
      setLessons(newLessons);
    }
  };

  const onUpdate = (lessonPlan: LessonPlan) => {
    setLessonToUpdate(lessonPlan);
    setIsModalOpen(true);
  };

  const onUpdateSuccess = (lessonPlan: LessonPlanningItem) => {
    const newLessons = findAndUpdateContent(lessonPlan, lessons);
    setLessons(newLessons);
  };

  const isLoading =
    mediaLoading || examLoading || lessonPlanningLoading || examAttemptsLoading;

  return (
    <>
      <LessonPlanningCourseInformation
        onAddLessonClick={() => setIsModalOpen(true)}
      />
      <Placeholder
        show={isLoading}
        number={10}
        placeholderElement={<ContentLinePlaceholder />}
      />
      <NoContentPlaceholder show={!isLoading && lessons.length === 0} />
      {!isLoading && lessons.length !== 0 && (
        <LessonsPlanningList
          onCreate={(lessonPlan) => {
            const sortedLessons = sortLessons([...lessons, lessonPlan]);
            setLessons(sortedLessons);
          }}
          onDelete={onDelete}
          onUpdate={onUpdate}
          lessons={sortLessons(lessons)}
          isModalOpen={isModalOpen}
          onCloseModal={() => {
            setIsModalOpen(false);
            setLessonToUpdate(null);
          }}
          lessonToUpdate={lessonToUpdate}
          onUpdateSuccess={onUpdateSuccess}
        />
      )}
    </>
  );
};
