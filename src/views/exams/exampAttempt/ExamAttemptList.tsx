import { useCallback, useEffect, useMemo, useState } from "react";
import { ExamAttempt, ExamType } from "../../../API";
import { ContentLine } from "../../../components/ContentLine/ContentLine";
import ExamService from "../../../services/ExamService";
import { CommonContentLineTitle } from "../../media/CommonContentLineTitle";
import { BsCardChecklist } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import { Badge, Box, Stack, useToast } from "@chakra-ui/react";
import { translate } from "../../../utils/LanguageUtils";
import dayjs from "dayjs";
import { ExamAttemptFilter as IExamAttemptFilter } from "../../../interfaces/Exams";
import { ExamAttemptFilter } from "./filters/ExamAttemptFilter";
import { ConfirmationDialog } from "../../../components/AlertDialog/ConfirmationDialog";
import { NoContentPlaceholder } from "../../../components/Placeholders/NoContentPlaceholder";
import {
  applyNameFilter,
  applyExamAttemptStatusFilter,
  applyStudentFilter,
} from "../../../utils/ExamUtils";
import { Placeholder } from "../../../components/Placeholders/Placeholder";
import { ContentLinePlaceholder } from "../../../components/Placeholders/ContentLinePlaceholder";
import { toastConfig } from "../../../utils/ToastUtils";

export const ExamAttemptList = () => {
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  const [examAttemptsDisplayed, setExamAttemptsDisplayed] = useState<
    ExamAttempt[]
  >([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteExamAttemptId, setDeleteExamAttemptId] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const toast = useToast();
  const type = useMemo(
    () =>
      location.pathname.includes("exams") ? ExamType.EXAM : ExamType.HOMEWORK,
    [location.pathname]
  );

  // Filters
  const [statusActiveFilter, setStatusActiveFilter] =
    useState<IExamAttemptFilter>(IExamAttemptFilter.ALL);
  const [activeNameFilter, setActiveNameFilter] = useState<string>("");
  const [activeStudentNameFilter, setActiveStudentNameFilter] =
    useState<string>("");

  const navigator = useNavigate();

  const fetchExamAttempts = useCallback(async () => {
    const examsAttemptsResponse = await ExamService.fetchExamAttempts(
      type,
      nextPageToken
    );

    const items =
      (examsAttemptsResponse?.listExamAttempts?.items as ExamAttempt[]) ?? [];
    setExamAttempts((examAttempts) => examAttempts.concat(items));
    setExamAttemptsDisplayed((examAttemptsDisplayed) =>
      examAttemptsDisplayed.concat(items)
    );

    if (examsAttemptsResponse?.listExamAttempts?.nextToken) {
      setNextPageToken(
        examsAttemptsResponse?.listExamAttempts?.nextToken as string
      );
    }

    setIsLoading(false);
  }, [type, nextPageToken]);

  useEffect(() => {
    fetchExamAttempts();
  }, [fetchExamAttempts]);

  const onChangeStatusFilter = useCallback(
    (filter: IExamAttemptFilter) => {
      setStatusActiveFilter(filter);
      const updatedExamAttempts = applyExamAttemptStatusFilter(
        examAttempts,
        filter
      );

      setExamAttemptsDisplayed(
        applyNameFilter(updatedExamAttempts, activeNameFilter)
      );
    },
    [examAttempts, activeNameFilter]
  );

  const onChangeStudentNameFilter = useCallback(
    (studentName: string) => {
      setActiveStudentNameFilter(studentName);
      const updatedExamAttempts = applyStudentFilter(examAttempts, studentName);

      setExamAttemptsDisplayed(updatedExamAttempts);
      setStatusActiveFilter(IExamAttemptFilter.ALL);
      setActiveNameFilter("");
    },
    [examAttempts]
  );

  const onChangeExamNameFilter = useCallback(
    (examName: string) => {
      setActiveNameFilter(examName);
      const updatedExamAttempts = applyNameFilter(examAttempts, examName);

      setExamAttemptsDisplayed(
        applyExamAttemptStatusFilter(updatedExamAttempts, statusActiveFilter)
      );
    },
    [examAttempts, statusActiveFilter]
  );

  const onDeleteExamAttempt = useCallback(async () => {
    const deleteExamAttempt = await ExamService.deleteExamAttempt(
      deleteExamAttemptId as string
    );

    toast(
      toastConfig({
        description: deleteExamAttempt
          ? "EXAM_ATTEMPT_DELETED_OK"
          : "EXAM_ATTEMPT_DELETED_ERROR",
        status: deleteExamAttempt ? "success" : "error",
      })
    );

    if (deleteExamAttempt) {
      setDeleteExamAttemptId(undefined);
      setShowDeleteConfirmation(false);
      setExamAttempts(
        examAttempts.filter(
          (examAttempt) => examAttempt.id !== deleteExamAttemptId
        )
      );
      setExamAttemptsDisplayed(
        examAttemptsDisplayed.filter(
          (examAttempt) => examAttempt.id !== deleteExamAttemptId
        )
      );
    }
  }, [examAttempts, examAttemptsDisplayed, deleteExamAttemptId]);

  const onDeleteClick = (examAttemptId: string) => {
    setDeleteExamAttemptId(examAttemptId);
    setShowDeleteConfirmation(true);
  };

  if (isLoading) {
    return (
      <Placeholder
        show={isLoading}
        number={10}
        placeholderElement={<ContentLinePlaceholder />}
      />
    );
  }

  return (
    <>
      <ConfirmationDialog
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onAction={() => onDeleteExamAttempt()}
        title="DELETE_EXAM_ATTEMPT_CONFIRMATION_TITLE"
        description="DELETE_EXAM_ATTEMPT_CONFIRMATION_DESCRIPTION"
        confirmButtonText="DELETE"
      />

      <Stack spacing={5}>
        <ExamAttemptFilter
          examAttempts={examAttempts}
          activeStatusFilter={statusActiveFilter}
          activeNameFilter={activeNameFilter}
          studentNameFilter={activeStudentNameFilter}
          onChangeStatusFilter={onChangeStatusFilter}
          onChangeExamNameFilter={onChangeExamNameFilter}
          onChangeStudentNameFilter={onChangeStudentNameFilter}
        />
        <Box>
          <NoContentPlaceholder
            show={examAttemptsDisplayed.length === 0 && !isLoading}
          />
          {examAttemptsDisplayed.map((examAttempt) => {
            return (
              <ContentLine
                key={examAttempt.id}
                leftIcon={<BsCardChecklist />}
                onView={
                  examAttempt.isCompleted
                    ? () => navigator(`/exams/attempt/${examAttempt.id}`)
                    : undefined
                }
                onDelete={
                  !examAttempt.isCompleted
                    ? () => onDeleteClick(examAttempt.id)
                    : undefined
                }
              >
                <CommonContentLineTitle
                  id={examAttempt.id}
                  title={`${examAttempt.userName} - ${examAttempt.examName}`}
                >
                  {!examAttempt.isCompleted && (
                    <Badge colorScheme="red">
                      {translate("NOT_FINISHED")}{" "}
                      {dayjs(examAttempt.createdAt).format("DD/MM/YYYY HH:MM")}
                      hs
                    </Badge>
                  )}
                  {examAttempt.isCompleted && examAttempt.correctedBy && (
                    <Badge colorScheme={"green"}>
                      {translate("CORRECTED")} ({examAttempt?.correctedBy})
                    </Badge>
                  )}
                </CommonContentLineTitle>
              </ContentLine>
            );
          })}
        </Box>
      </Stack>
    </>
  );
};
