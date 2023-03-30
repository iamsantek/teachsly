import {
  CreateLessonPlanInput,
  CreateLessonPlanMutation,
  DeleteLessonPlanMutation,
  LessonPlanningType,
  ListLessonPlansQuery,
  UpdateLessonPlanInput,
  UpdateLessonPlanMutation,
} from "../API";
import { listLessonPlans } from "../graphql/queries";
import {
  createLessonPlan as createLessonPlanQuery,
  deleteLessonPlan as deleteLessonPlanQuery,
  updateLessonPlan as updateLessonPlanQuery,
} from "../graphql/mutations";
import GraphQLService from "./GraphQLService";
import { v4 as uuid } from "uuid";

const getLessonPlans = (nextToken?: string | undefined) => {
  return GraphQLService.fetchQuery<ListLessonPlansQuery>({
    query: listLessonPlans,
    nextToken,
  });
};

const getLessonPlansByCourseId = (
  courseId: string,
  nextToken?: string | undefined
) => {
  return GraphQLService.fetchQuery<ListLessonPlansQuery>({
    query: listLessonPlans,
    nextToken,
    filter: {
      groups: {
        contains: courseId,
      },
    },
  });
};

const createLessonPlan = async (lessonPlan: CreateLessonPlanInput) => {
  const { title, groups, content, uploadedBy, date, type, media, link } =
    lessonPlan;

  const createLessonPlanInput: CreateLessonPlanInput = {
    title,
    content: content as string,
    uploadedBy,
    groups: groups as string[],
    externalId: uuid(),
    date,
    type: type ?? LessonPlanningType.LESSON,
    media,
    link,
  };

  return GraphQLService.fetchQuery<CreateLessonPlanMutation>({
    query: createLessonPlanQuery,
    input: createLessonPlanInput,
  });
};

const updateLessonPlan = async (lessonPlan: UpdateLessonPlanInput) => {
  return GraphQLService.fetchQuery<UpdateLessonPlanMutation>({
    query: updateLessonPlanQuery,
    input: lessonPlan,
  });
};

const deleteLessonPlan = async (lessonPlanId: string) => {
  return GraphQLService.fetchQuery<DeleteLessonPlanMutation>({
    query: deleteLessonPlanQuery,
    input: {
      id: lessonPlanId,
    },
  });
};

const getLessonPlansByExternalId = (externalId: string) => {
  return GraphQLService.fetchQuery<ListLessonPlansQuery>({
    query: listLessonPlans,
    filter: {
      externalId: {
        eq: externalId,
      },
    },
  });
};

export {
  getLessonPlans,
  createLessonPlan,
  getLessonPlansByCourseId,
  deleteLessonPlan,
  updateLessonPlan,
  getLessonPlansByExternalId,
};
