import { LessonPlanningType } from "../API";

export const contentLineColor: { [key: string]: string } = {
    [LessonPlanningType.EXAM]: 'blue',
    [LessonPlanningType.HOMEWORK]: 'purple',
    [LessonPlanningType.MEDIA]: 'orange',
    [LessonPlanningType.OTHER]: 'yellow',
    [LessonPlanningType.LESSON]: 'purple',
    [LessonPlanningType.RECORDING]: 'red',
}