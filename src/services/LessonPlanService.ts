import { CreateLessonPlanInput, CreateLessonPlanMutation, DeleteLessonPlanMutation, LessonPlanningType, ListLessonPlansQuery, UpdateLessonPlanInput, UpdateLessonPlanMutation } from "../API"
import { listLessonPlans } from "../graphql/queries"
import { createLessonPlan as createLessonPlanQuery, deleteLessonPlan as deleteLessonPlanQuery, updateLessonPlan as updateLessonPlanQuery } from "../graphql/mutations"
import { LessonPlanning } from "../views/lessonsPlanning/LessonPlanningModal"
import GraphQLService from "./GraphQLService"
import { v4 as uuid } from 'uuid'

const getLessonPlans = (nextToken?: string | undefined) => {
    return GraphQLService.fetchQuery<ListLessonPlansQuery>({
        query: listLessonPlans,
        nextToken
    })
}

const getLessonPlansByCourseId = (courseId: string) => {
    return GraphQLService.fetchQuery<ListLessonPlansQuery>({
        query: listLessonPlans,
        filter: {
            groups: {
                contains: courseId
            }
        }
    })
}

const createLessonPlan = async (lessonPlan: LessonPlanning) => {
    const { title, groups, content, uploadedBy, date, type, media } = lessonPlan

    const createLessonPlanInput: CreateLessonPlanInput = {
        title,
        content: content as string,
        uploadedBy,
        groups: groups as string[],
        externalId: uuid(),
        date,
        type: type as LessonPlanningType ?? LessonPlanningType.LESSON,
        media
    }

    return GraphQLService.fetchQuery<CreateLessonPlanMutation>({
        query: createLessonPlanQuery,
        input: createLessonPlanInput
    })
}

const updateLessonPlan = async (lessonPlan: UpdateLessonPlanInput) => {
    return GraphQLService.fetchQuery<UpdateLessonPlanMutation>({
        query: updateLessonPlanQuery,
        input: lessonPlan
    })
}

const deleteLessonPlan = async (lessonPlanId: string) => {
    return GraphQLService.fetchQuery<DeleteLessonPlanMutation>({
        query: deleteLessonPlanQuery,
        input: {
            id: lessonPlanId
        }
    })
}

export {
    getLessonPlans,
    createLessonPlan,
    getLessonPlansByCourseId,
    deleteLessonPlan,
    updateLessonPlan
}