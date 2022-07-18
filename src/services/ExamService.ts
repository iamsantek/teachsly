import { CreateExamAttemptInput, CreateExamAttemptMutation, CreateExamMutation, GetExamQuery, ListExamAttemptsQuery, ListExamsQuery, UpdateExamMutation } from '../API'
import { createExam, createExamAttempt, updateExam } from '../graphql/mutations'
import { getExam, listExamAttempts, listExams } from '../graphql/queries'
import { ExamForm } from '../interfaces/Exams'
import { formatExamForm } from '../utils/ExamUtils'
import GraphQLService from './GraphQLService'

class ExamService {
  public async createExam (exam: ExamForm) {
    const formattedExam = formatExamForm(exam)

    return GraphQLService.fetchQuery<CreateExamMutation>({
      query: createExam,
      input: formattedExam
    })
  }

  public async updateExam (exam: ExamForm) {
    const formattedExam = formatExamForm(exam)

    return GraphQLService.fetchQuery<UpdateExamMutation>({
      query: updateExam,
      input: formattedExam
    })
  }

  public async getExams () {
    return GraphQLService.fetchQuery<ListExamsQuery>({
      query: listExams
    })
  }

  public async getExamById (id: string) {
    return GraphQLService.fetchQuery<GetExamQuery>({
      query: getExam,
      id
    })
  }

  public async createExamAttempt (examAttempt: CreateExamAttemptInput) {
    return GraphQLService.fetchQuery<CreateExamAttemptMutation>({
      query: createExamAttempt,
      input: examAttempt
    })
  }

  public async getExamAttemptByExternalId (examId: string, userId: string) {
    return GraphQLService.fetchQuery<ListExamAttemptsQuery>({
      query: listExamAttempts,
      filter:
      {
        and: [
          { userId: { eq: userId } },
          { examId: { eq: examId } }
        ]
      }
    })
  }
}

export default new ExamService()
