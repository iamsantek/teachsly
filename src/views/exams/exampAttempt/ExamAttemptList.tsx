import { useCallback, useEffect, useState } from 'react'
import { ExamAttempt } from '../../../API'
import { ContentLine } from '../../../components/ContentLine/ContentLine'
import ExamService from '../../../services/ExamService'
import { CommonContentLineTitle } from '../../media/CommonContentLineTitle'
import { BsCardChecklist } from 'react-icons/bs'
import { translate } from '@aws-amplify/ui'
import { useNavigate } from 'react-router-dom'

export const ExamAttemptList = () => {
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([])
  const [nextPageToken, setNextPageToken] = useState<string | undefined>()
  const navigator = useNavigate()

  const fetchExamAttempts = useCallback(async () => {
    const examsAttemptsResponse = await ExamService.fetchExamAttempts(nextPageToken)

    setExamAttempts(examsAttemptsResponse?.listExamAttempts?.items as ExamAttempt[] ?? [])
    setNextPageToken(examsAttemptsResponse?.listExamAttempts?.nextToken as string)
  }, [nextPageToken])

  useEffect(() => {
    fetchExamAttempts()
  }, [fetchExamAttempts])

  return (
    <>
      {examAttempts.map(examAttempt => (
        <ContentLine
          key={examAttempt.id}
          leftIcon={<BsCardChecklist />}
          onView={() => navigator(`/exams/attempt/${examAttempt.id}`)}
        >
          <CommonContentLineTitle title={`${examAttempt.userName} - ${examAttempt.examName}`} badges={examAttempt.isCompleted ? [translate('NOT_FINISHED')] : undefined} />
        </ContentLine>
      ))}
    </>
  )
}
