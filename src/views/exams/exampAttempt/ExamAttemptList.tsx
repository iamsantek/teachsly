import { useCallback, useEffect, useState } from 'react'
import { ExamAttempt } from '../../../API'
import { ContentLine } from '../../../components/ContentLine/ContentLine'
import ExamService from '../../../services/ExamService'
import { CommonContentLineTitle } from '../../media/CommonContentLineTitle'
import { BsCardChecklist } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { Badge, Box, Stack } from '@chakra-ui/react'
import { translate } from '../../../utils/LanguageUtils'
import dayjs from 'dayjs'
import { ExamAttemptFilter as IExamAttemptFilter } from '../../../interfaces/Exams'
import { ExamAttemptFilter } from './filters/ExamAttemptFilter'
import { ToastNotification } from '../../../observables/ToastNotification'
import { ConfirmationDialog } from '../../../components/AlertDialog/ConfirmationDialog'

export const ExamAttemptList = () => {
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([])
  const [examAttemptsRendered, setExamAttemptsRendered] = useState<ExamAttempt[]>([])
  const [activeFilter, setActiveFilter] = useState<IExamAttemptFilter>(IExamAttemptFilter.ALL)
  const [nextPageToken, setNextPageToken] = useState<string | undefined>()
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [deleteExamAttemptId, setDeleteExamAttemptId] = useState<string | undefined>()
  const navigator = useNavigate()

  const fetchExamAttempts = useCallback(async () => {
    const examsAttemptsResponse = await ExamService.fetchExamAttempts(nextPageToken)

    setExamAttempts(examsAttemptsResponse?.listExamAttempts?.items as ExamAttempt[] ?? [])
    setExamAttemptsRendered(examsAttemptsResponse?.listExamAttempts?.items as ExamAttempt[] ?? [])
    setNextPageToken(examsAttemptsResponse?.listExamAttempts?.nextToken as string)
  }, [nextPageToken])

  useEffect(() => {
    fetchExamAttempts()
  }, [fetchExamAttempts])

  const onChangeStatusFilter = useCallback((filter: IExamAttemptFilter) => {
    setActiveFilter(filter)
    setExamAttemptsRendered(examAttempts.filter(examAttempt => {
      switch (filter) {
        case IExamAttemptFilter.ALL:
          return true
        case IExamAttemptFilter.COMPLETED:
          return examAttempt.isCompleted
        case IExamAttemptFilter.NOT_COMPLETED:
          return !examAttempt.isCompleted
        default:
          return true
      }
    }))
  }, [examAttempts])

  const onDeleteExamAttempt = useCallback(async () => {
    const deleteExamAttempt = await ExamService.deleteExamAttempt(deleteExamAttemptId as string)

    ToastNotification({
      description: deleteExamAttempt ? 'EXAM_ATTEMPT_DELETED_OK' : 'EXAM_ATTEMPT_DELETED_ERROR',
      status: deleteExamAttempt ? 'SUCCESS' : 'ERROR'
    })

    if (deleteExamAttempt) {
      setDeleteExamAttemptId(undefined)
      setShowDeleteConfirmation(false)
      setExamAttempts(examAttempts.filter(examAttempt => examAttempt.id !== deleteExamAttemptId))
      setExamAttemptsRendered(examAttemptsRendered.filter(examAttempt => examAttempt.id !== deleteExamAttemptId))
    }
  }
  , [examAttempts, examAttemptsRendered, deleteExamAttemptId])

  const onDeleteClick = (examAttemptId: string) => {
    setDeleteExamAttemptId(examAttemptId)
    setShowDeleteConfirmation(true)
  }

  return (
    <>
    <ConfirmationDialog
      isOpen={showDeleteConfirmation}
      onClose={() => setShowDeleteConfirmation(false)}
      onAction={() => onDeleteExamAttempt()}
      title='DELETE_EXAM_ATTEMPT_CONFIRMATION_TITLE'
      description='DELETE_EXAM_ATTEMPT_CONFIRMATION_DESCRIPTION'
      confirmButtonText='DELETE'
    />

    <Stack spacing={5}>
      <ExamAttemptFilter value={activeFilter} onChangeStatusFilter={onChangeStatusFilter} onChangeCourseFilter={console.log} />
      <Box>
      {examAttemptsRendered.map(examAttempt => {
        return (
        <ContentLine
          key={examAttempt.id}
          leftIcon={<BsCardChecklist />}
          onView={() => navigator(`/exams/attempt/${examAttempt.id}`)}
          onDelete={!examAttempt.isCompleted ? () => onDeleteClick(examAttempt.id) : undefined}
        >
          <CommonContentLineTitle title={`${examAttempt.userName} - ${examAttempt.examName}`}>
            {!examAttempt.isCompleted && <Badge colorScheme='red'>{translate('NOT_FINISHED')} {dayjs(examAttempt.createdAt).format('DD/MM/YYYY HH:MM')}hs</Badge>}
          </CommonContentLineTitle>
        </ContentLine>
        )
      })}
      </Box>
    </Stack>
    </>

  )
}
