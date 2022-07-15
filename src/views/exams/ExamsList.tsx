import { useEffect, useState } from 'react'
import { ContentLine } from '../../components/ContentLine/ContentLine'
import { ExamForm } from '../../interfaces/Exams'
import ExamService from '../../services/ExamService'
import { IoNewspaper } from 'react-icons/io5'
import { CommonContentLineTitle } from '../media/CommonContentLineTitle'
import { useNavigate } from 'react-router-dom'
import { Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { translate } from '../../utils/LanguageUtils'
import { useUserGroups } from '../../hooks/useUserGroups'

export const ExamsList = () => {
  const [exams, setExams] = useState<ExamForm[]>([])
  const { hasEditPermission } = useUserGroups()
  const navigate = useNavigate()

  const fetchExams = async () => {
    const exams = await ExamService.getExams()
    setExams(exams?.listExams?.items as any[] || [])
  }

  useEffect(() => {
    fetchExams()
  }, [])

  const examsFilter = () => {
    if (hasEditPermission) {
      return exams
    }

    return exams.filter(exam => !dayjs().isAfter(dayjs(exam.deadline)))
  }

  return (
    <>
      {examsFilter().map(exam => (
        <ContentLine
          key={exam.id}
          leftIcon={<IoNewspaper />}
          onView={() => navigate(hasEditPermission ? `/exams/${exam.id}` : `/exams/${exam.id}/intro`)}
        >
          <CommonContentLineTitle title={exam.title} badges={[dayjs(exam.deadline).format('DD/MM hh:mm')]}>
            <Text color='brand.500' textStyle='paragraph'>
              {translate('EXAM_DEADLINE')} {dayjs(exam.deadline).format('DD/MM hh:mm')}hs
            </Text>
          </CommonContentLineTitle>
        </ContentLine>
      ))}
    </>

  )
}
