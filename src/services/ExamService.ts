import {
  CreateExamAttemptInput,
  CreateExamAttemptMutation,
  CreateExamMutation,
  DeleteExamAttemptMutation,
  EnglishLevel,
  ExamType,
  GetExamAttemptQuery,
  GetExamQuery,
  ListExamAttemptsQuery,
  ListExamsQuery,
  UpdateExamAttemptInput,
  UpdateExamAttemptMutation,
  UpdateExamMutation,
} from "../API";
import {
  createExam,
  createExamAttempt,
  deleteExamAttempt,
  updateExam,
  updateExamAttempt,
} from "../graphql/mutations";
import {
  getExam,
  getExamAttempt,
  listExamAttempts,
  listExams,
} from "../graphql/queries";
import { ExamForm } from "../interfaces/Exams";
import {
  filterExamsByType,
  filterExamsByTypeAndCognitoId,
  formatExamForm,
} from "../utils/ExamUtils";
import GraphQLService from "./GraphQLService";

class ExamService {
  public async createExam(exam: ExamForm) {
    const formattedExam = formatExamForm(exam);

    return GraphQLService.fetchQuery<CreateExamMutation>({
      query: createExam,
      input: formattedExam,
    });
  }

  public async updateExam(exam: ExamForm) {
    const formattedExam = formatExamForm(exam);

    return GraphQLService.fetchQuery<UpdateExamMutation>({
      query: updateExam,
      input: formattedExam,
    });
  }

  public async getExams(nextPageToken?: string) {
    return GraphQLService.fetchQuery<ListExamsQuery>({
      query: listExams,
      nextToken: nextPageToken,
      filter: { type: { ne: ExamType.HOMEWORK } },
    });
  }

  public async getHomework(nextPageToken?: string) {
    return GraphQLService.fetchQuery<ListExamsQuery>({
      query: listExams,
      nextToken: nextPageToken,
      filter: { type: { eq: ExamType.HOMEWORK } },
    });
  }

  public async getExamById(id: string) {
    return GraphQLService.fetchQuery<GetExamQuery>({
      query: getExam,
      id,
    });
  }

  public async createExamAttempt(examAttempt: CreateExamAttemptInput) {
    return GraphQLService.fetchQuery<CreateExamAttemptMutation>({
      query: createExamAttempt,
      input: examAttempt,
    });
  }

  public async getExamAttemptByExternalId(examId: string, userId: string) {
    return GraphQLService.fetchQuery<ListExamAttemptsQuery>({
      query: listExamAttempts,
      filter: {
        and: [{ userId: { eq: userId } }, { examId: { eq: examId } }],
      },
    });
  }

  public async getExamAttemptsByCognitoId(
    cognitoId: string,
    type: ExamType,
    nextPageToken: string | null | undefined
  ) {
    const filter = filterExamsByTypeAndCognitoId(type, cognitoId);

    return GraphQLService.fetchQuery<ListExamAttemptsQuery>({
      query: listExamAttempts,
      nextToken: nextPageToken,
      filter,
    });
  }

  public async fetchExamAttempts(type: ExamType, nextToken?: string | null) {
    const filter = filterExamsByType(type);

    return GraphQLService.fetchQuery<ListExamAttemptsQuery>({
      query: listExamAttempts,
      nextToken,
      filter,
    });
  }

  public async fetchExamAttemptsByAId(id: string) {
    return GraphQLService.fetchQuery<GetExamAttemptQuery>({
      query: getExamAttempt,
      id,
    });
  }

  public async deleteExamAttempt(id: string) {
    return GraphQLService.fetchQuery<DeleteExamAttemptMutation>({
      query: deleteExamAttempt,
      input: {
        id,
      },
    });
  }

  public updateExamAttempt(examAttempt: UpdateExamAttemptInput) {
    return GraphQLService.fetchQuery<UpdateExamAttemptMutation>({
      query: updateExamAttempt,
      input: examAttempt,
    });
  }

  public fetchExamsByCourseId = async (
    courseId: string | undefined,
    englishLevel: EnglishLevel,
    nextToken?: string | undefined | null
  ) => {
    if (!courseId) {
      return;
    }

    return GraphQLService.fetchQuery<ListExamsQuery>({
      query: listExams,
      nextToken,
      filter: {
        or: [
          { groups: { contains: courseId } },
          englishLevel && { groups: { contains: englishLevel } },
        ].filter((x) => x),
      },
    });
  };

  public getExamAttemptsByExamNameAndUserId = (
    examNames: string[],
    userId: string,
    nextToken: string | null | undefined
  ) => {
    const filter = examNames.map((exam) => {
      return { examName: { eq: exam } };
    });

    return GraphQLService.fetchQuery<ListExamAttemptsQuery>({
      query: listExamAttempts,
      nextToken,
      filter: {
        and: [{ or: filter }, { userId: { eq: userId } }],
      },
    });
  };
}

export default new ExamService();
