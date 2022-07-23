import { Button } from '@chakra-ui/react'
import { AiOutlinePlus } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { SectionHeader } from '../../components/Headers/SectionHeader'
import { translate } from '../../utils/LanguageUtils'
import { ExamsList } from './ExamsList'
import { useUserGroups } from '../../hooks/useUserGroups'
import { BsCardChecklist } from 'react-icons/bs'

export const ExamsHomeScreen = () => {
  const navigate = useNavigate()
  const { hasEditPermission } = useUserGroups()

  return (
    <>
      <SectionHeader>
        {hasEditPermission &&
          <>
            <Button
              colorScheme='brand'
              leftIcon={<AiOutlinePlus />}
              onClick={() => navigate('/exams/new')}>
              {translate('NEW_EXAM')}
            </Button>
            <Button
              colorScheme='brand'
              leftIcon={<BsCardChecklist />}
              onClick={() => navigate('/exams/attempts')}>
              {translate('EXAM_ATTEMPTS')}
            </Button>
          </>

        }
      </SectionHeader>
      <ExamsList />
    </>
  )
}
