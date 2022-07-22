import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExamAttempt } from '../../../../API'
import { ContentLinePlaceholder } from '../../../../components/Placeholders/ContentLinePlaceholder'
import { NoContentPlaceholder } from '../../../../components/Placeholders/NoContentPlaceholder'
import { Placeholder } from '../../../../components/Placeholders/Placeholder'
import { ExamAnswers, QuestionPool } from '../../../../interfaces/Exams'
import ExamService from '../../../../services/ExamService'
import { ExamCompleteResult } from '../results/ExamCompleteResult'

export const StudentExamResultScreen = () => {
  const [examAttempt, setExamAttempt] = useState<ExamAttempt>()
  const [isLoading, setIsLoading] = useState(true)
  const { attemptId } = useParams()

  const fetchExamAttempt = useCallback(async () => {
    const examAttempt = await ExamService.fetchExamAttemptsByAId(attemptId as string)

    setExamAttempt(examAttempt?.getExamAttempt as ExamAttempt)
    setIsLoading(false)
  }, [attemptId])

  useEffect(() => {
    fetchExamAttempt()
  }, [fetchExamAttempt])

  if (isLoading) {
    return (
      <Placeholder
        show={isLoading}
        number={10}
        placeholderElement={<ContentLinePlaceholder />}
      />
    )
  }

  if (!attemptId || !examAttempt) {
    return <NoContentPlaceholder show />
  }

  let questionPools: QuestionPool[] = []
  let studentAnswers: ExamAnswers | undefined

  try {
    questionPools = JSON.parse(examAttempt?.keys as string)
    studentAnswers = JSON.parse(examAttempt?.results as string)
  } catch {
    questionPools = []
  }

  return (
    <ExamCompleteResult
      questionPools={questionPools}
      studentAnswers={studentAnswers}
      examAttempt={examAttempt}
    />
  )
}
