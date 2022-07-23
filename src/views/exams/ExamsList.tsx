import { useCallback, useContext, useEffect, useState } from 'react'
import { ContentLine } from '../../components/ContentLine/ContentLine'
import ExamService from '../../services/ExamService'
import { IoNewspaper } from 'react-icons/io5'
import { CommonContentLineTitle } from '../media/CommonContentLineTitle'
import { useNavigate } from 'react-router-dom'
import { Badge, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { translate } from '../../utils/LanguageUtils'
import { useUserGroups } from '../../hooks/useUserGroups'
import { Exam, ExamAttempt } from '../../API'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { applyCourseFilter, applyExamStatusFilter, getExamLink, getExamStatus } from '../../utils/ExamUtils'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { ExamFilter } from './ExamsFilter'
import { ExamFilter as IExamFilter } from '../../interfaces/Exams'
import { NoContentPlaceholder } from '../../components/Placeholders/NoContentPlaceholder'

export const ExamsList = () => {
  const [exams, setExams] = useState<Exam[]>([])
  const [renderedExams, setRenderedExams] = useState<Exam[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([])
  const { hasEditPermission } = useUserGroups()
  const [currentStatusFilter, setCurrentStatusFilter] = useState<IExamFilter>(IExamFilter.ALL)
  const [currentCourseFilter, setCurrentCourseFilter] = useState<string>(IExamFilter.ALL)
  const navigate = useNavigate()
  const { context: { user } } = useContext(UserDashboardContext)

  const fetchExams = useCallback(async () => {
    const exams = await ExamService.getExams()
    const examAttempts = await ExamService.getExamAttemptsByCognitoId(user?.cognitoId as string)
    setExams(exams?.listExams?.items as any[] || [])
    setExamAttempts(examAttempts?.listExamAttempts?.items as ExamAttempt[] || [])
    setRenderedExams(exams?.listExams?.items as Exam[] || [])
    setIsLoading(false)
  }, [user])

  useEffect(() => {
    fetchExams()
  }, [fetchExams])

  if (isLoading) {
    return (
      <Placeholder
        show={isLoading}
        number={10}
        placeholderElement={<ContentLinePlaceholder />}
      />
    )
  }

  const getBadge = (exam: Exam) => {
    const { examAttempt, isCompleted, isCorrected } = getExamStatus(exam, examAttempts)
    const badgeText = translate(examAttempt?.correctedBy ? 'CORRECTED' : examAttempt?.isCompleted ? 'COMPLETED' : 'NOT_COMPLETED')
    const badgeColor = examAttempt?.correctedBy ? 'green' : examAttempt?.isCompleted ? 'blue' : 'red'

    return { badgeText, badgeColor, isCompleted, isCorrected }
  }

  const onChangeStatusFilter = (newStatus: IExamFilter) => {
    setCurrentStatusFilter(newStatus)
    const updatedValues = applyExamStatusFilter(exams, examAttempts, newStatus)
    setRenderedExams(applyCourseFilter(updatedValues, currentCourseFilter))
  }

  const onChangeCourseFilter = (courseExternalId: string) => {
    setCurrentCourseFilter(courseExternalId)
    const updatedValues = applyCourseFilter(exams, courseExternalId)
    setRenderedExams(applyExamStatusFilter(updatedValues, examAttempts, currentStatusFilter))
  }

  return (
    <Stack spacing={5}>
      <ExamFilter
        onChangeStatusFilter={onChangeStatusFilter}
        currentStatusFilter={currentStatusFilter}
        onChangeCourseFilter={onChangeCourseFilter}
        currentCourseFilter={currentCourseFilter}
      />
      <NoContentPlaceholder show={renderedExams.length === 0} />
      {renderedExams.map(exam => {
        const { badgeColor, badgeText, isCompleted } = getBadge(exam)
        const link = getExamLink(exam, examAttempts, hasEditPermission)

        return (
          <ContentLine
            key={exam.id}
            leftIcon={<IoNewspaper />}
            onView={() => navigate(link)}
          >
            <CommonContentLineTitle title={exam.title}>
              {!isCompleted && (
                <Text color='brand.500' textStyle='paragraph'>
                  {translate('EXAM_DEADLINE')} {dayjs(exam.deadline).format('DD/MM HH:mm')}hs
                </Text>
              )}
              <Badge colorScheme={badgeColor} marginX={5}>
                {badgeText}
              </Badge>
            </CommonContentLineTitle>
          </ContentLine>
        )
      })}
    </Stack>

  )
}
