import { LessonPlan } from "../API";

export interface LessonPlanningItem extends LessonPlan {
  renderElement?: JSX.Element;
  examAttemptId?: string;
  pendingCorrection?: boolean;
  isCompleted?: boolean;
}
