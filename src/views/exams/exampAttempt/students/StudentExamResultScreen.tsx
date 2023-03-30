import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ExamAttempt } from "../../../../API";
import { ContentLinePlaceholder } from "../../../../components/Placeholders/ContentLinePlaceholder";
import { NoContentPlaceholder } from "../../../../components/Placeholders/NoContentPlaceholder";
import { Placeholder } from "../../../../components/Placeholders/Placeholder";
import { ExamAnswers } from "../../../../interfaces/Exams";
import ExamService from "../../../../services/ExamService";
import { ExamCompleteResult } from "../results/ExamCompleteResult";

export const StudentExamResultScreen = () => {
  const [examAttempt, setExamAttempt] = useState<ExamAttempt>();
  const [isLoading, setIsLoading] = useState(true);
  const { attemptId } = useParams();

  const fetchExamAttempt = useCallback(async () => {
    const examAttempt = await ExamService.fetchExamAttemptsByAId(
      attemptId as string
    );

    setExamAttempt(examAttempt?.getExamAttempt as ExamAttempt);
    setIsLoading(false);
  }, [attemptId]);

  useEffect(() => {
    fetchExamAttempt();
  }, [fetchExamAttempt]);

  if (isLoading) {
    return (
      <Placeholder
        show={isLoading}
        number={10}
        placeholderElement={<ContentLinePlaceholder />}
      />
    );
  }

  if (!attemptId || !examAttempt) {
    return <NoContentPlaceholder show />;
  }

  const studentAnswers: ExamAnswers = JSON.parse(
    (examAttempt?.results as string) ?? ""
  );

  return (
    <ExamCompleteResult
      studentAnswers={studentAnswers}
      examAttempt={examAttempt}
    />
  );
};
