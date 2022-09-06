import { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { ContentLine } from '../../components/ContentLine/ContentLine'
import ExamService from '../../services/ExamService'
import { IoNewspaper } from 'react-icons/io5'
import { CommonContentLineTitle } from '../media/CommonContentLineTitle'
import { useLocation, useNavigate } from 'react-router-dom'
import { Badge, Stack, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { translate } from '../../utils/LanguageUtils'
import { useUserGroups } from '../../hooks/useUserGroups'
import { Exam, ExamAttempt, ExamType } from '../../API'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { applyCourseFilter, applyExamStatusFilter, getExamLink, getExamStatus } from '../../utils/ExamUtils'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'
import { ExamFilter } from './ExamsFilter'
import { ExamFilter as IExamFilter } from '../../interfaces/Exams'
import { NoContentPlaceholder } from '../../components/Placeholders/NoContentPlaceholder'

const initialNextPageTokens: { [key in ExamType]: string | undefined } = {
  [ExamType.EXAM]: undefined,
  [ExamType.HOMEWORK]: undefined
}

const nextPageTokenReducer = (state: { [key in ExamType]: string | undefined }, action: { type: ExamType, payload: string | undefined | null }) => {
  return {
    ...state,
    [action.type]: action.payload
  }
}

export const ExamsList = () => {
  const [exams, setExams] = useState<Exam[]>([])
  const [renderedExams, setRenderedExams] = useState<Exam[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([])
  const { hasEditPermission } = useUserGroups()
  const [currentStatusFilter, setCurrentStatusFilter] = useState<IExamFilter>(IExamFilter.ALL)
  const [currentCourseFilter, setCurrentCourseFilter] = useState<string>(IExamFilter.ALL)
  const [nextPageTokens, dispatch] = useReducer(nextPageTokenReducer, initialNextPageTokens)
  const navigate = useNavigate()
  const location = useLocation()
  const { context: { user } } = useContext(UserDashboardContext)
  const isExamView = location.pathname.includes('exams')
  const examType = isExamView ? ExamType.EXAM : ExamType.HOMEWORK

  useEffect(() => {
    console.log('Cambio', examType)
    setIsLoading(true)
    setExamAttempts([])
    setExams([])
    setRenderedExams([])
  }, [examType])

  const fetchExams = useCallback(async () => {
    const exams = isExamView ? await ExamService.getExams(nextPageTokens.EXAM) : await ExamService.getHomework(nextPageTokens.HOMEWORK)
    const examAttempts = await ExamService.getExamAttemptsByCognitoId(user?.cognitoId as string, examType)
    const examsWithAppliedFilter = applyExamStatusFilter(exams?.listExams?.items as Exam[] || [], examAttempts?.listExamAttempts?.items as ExamAttempt[] ?? [], currentStatusFilter)

    setExams(currentExams => currentExams.concat(exams?.listExams?.items as any[] || []))
    setExamAttempts(currentExamAttempts => currentExamAttempts.concat(examAttempts?.listExamAttempts?.items as ExamAttempt[] || []))

    if (examAttempts?.listExamAttempts?.nextToken) {
      dispatch({ type: isExamView ? ExamType.EXAM : ExamType.HOMEWORK, payload: examAttempts?.listExamAttempts?.nextToken })
    }

    setRenderedExams(examsWithAppliedFilter)
    setIsLoading(false)
  }, [user, examType, isExamView, currentStatusFilter, nextPageTokens])

  useEffect(() => {
    fetchExams()
  }, [fetchExams, nextPageTokens])

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
    const badgeText = dayjs().isBefore(exam.startDate) ? `${translate('COMING_SOON')} ${dayjs(exam.deadline).format('DD/MM HH:mm')}hs` : translate(examAttempt?.correctedBy ? 'CORRECTED' : examAttempt?.isCompleted ? 'COMPLETED' : 'NOT_COMPLETED')
    const badgeColor = dayjs().isBefore(exam.startDate) ? 'green' : examAttempt?.correctedBy ? 'green' : examAttempt?.isCompleted ? 'blue' : 'red'

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
            <CommonContentLineTitle id={exam.id} title={exam.title}>
              {!isCompleted && (
                <Text color='brand.500' textStyle='paragraph'>
                  {translate('EXAM_DEADLINE')} {dayjs(exam.deadline).format('DD/MM HH:mm')}hs
                </Text>
              )}
              {!hasEditPermission && (
              <Badge colorScheme={badgeColor} marginX={5}>
                {badgeText}
              </Badge>
              )}
            </CommonContentLineTitle>
          </ContentLine>
        )
      })}
    </Stack>

  )
}
