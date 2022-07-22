import { useContext, useEffect, useState } from 'react'
import { ContentLine } from '../../components/ContentLine/ContentLine'
import ExamService from '../../services/ExamService'
import { IoNewspaper } from 'react-icons/io5'
import { CommonContentLineTitle } from '../media/CommonContentLineTitle'
import { useNavigate } from 'react-router-dom'
import { Badge, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { translate } from '../../utils/LanguageUtils'
import { useUserGroups } from '../../hooks/useUserGroups'
import { Exam, ExamAttempt } from '../../API'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import { getExamLink, getExamStatus } from '../../utils/ExamUtils'
import { ContentLinePlaceholder } from '../../components/Placeholders/ContentLinePlaceholder'
import { Placeholder } from '../../components/Placeholders/Placeholder'

export const ExamsList = () => {
  const [exams, setExams] = useState<Exam[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([])
  const { hasEditPermission, groups } = useUserGroups()
  const navigate = useNavigate()
  const { context: { user } } = useContext(UserDashboardContext)

  const fetchExams = async () => {
    const exams = await ExamService.getExams()
    const examAttempts = await ExamService.getExamAttemptsByCognitoId(user?.cognitoId as string)
    setExams(exams?.listExams?.items as any[] || [])
    setExamAttempts(examAttempts?.listExamAttempts?.items as ExamAttempt[] || [])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchExams()
  }, [])

  if (isLoading) {
    return (
      <Placeholder
      show={isLoading}
      number={10}
      placeholderElement={<ContentLinePlaceholder />}
    />
    )
  }

  const examsFilter = () => {
    if (hasEditPermission) {
      return exams
    }

    const userGroups = groups.map(group => group.externalId)
    const formattedExams = exams.filter(exam => !dayjs().isAfter(dayjs(exam.deadline)))
    return formattedExams.filter(exam => (exam.groups as string[]).filter(group => userGroups.includes(group)).length > 0)
  }

  const getBadge = (exam: Exam) => {
    const { examAttempt, isCompleted, isCorrected } = getExamStatus(exam, examAttempts)
    const badgeText = translate(examAttempt?.correctedBy ? 'CORRECTED' : examAttempt?.isCompleted ? 'COMPLETED' : 'NOT_COMPLETED')
    const badgeColor = examAttempt?.correctedBy ? 'green' : examAttempt?.isCompleted ? 'blue' : 'red'

    return { badgeText, badgeColor, isCompleted, isCorrected }
  }

  return (
    <>
      {examsFilter().map(exam => {
        const { badgeColor, badgeText, isCompleted } = getBadge(exam)
        const link = getExamLink(exam, examAttempts, hasEditPermission)
        console.log(link)

        return (
          <ContentLine
            key={exam.id}
            leftIcon={<IoNewspaper />}
            onView={() => navigate(link)}
          >
            <CommonContentLineTitle title={exam.title}>
              {!isCompleted && (
                <Text color='brand.500' textStyle='paragraph'>
                  {translate('EXAM_DEADLINE')} {dayjs(exam.deadline).format('DD/MM HH:mm Z')}hs
                </Text>
              )}
              <Badge colorScheme={badgeColor} marginX={5}>
                {badgeText}
              </Badge>
            </CommonContentLineTitle>
          </ContentLine>
        )
      })}
    </>

  )
}
