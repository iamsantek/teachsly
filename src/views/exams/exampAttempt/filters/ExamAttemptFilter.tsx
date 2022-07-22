import { Flex, Select } from '@chakra-ui/react'
import { AiFillFilter } from 'react-icons/ai'
import { MdLibraryBooks } from 'react-icons/md'
import { ExamAttempt } from '../../../../API'
import { ExamAttemptFilter as IExamAttemptFilter } from '../../../../interfaces/Exams'
import { groupExamAttemptsByName } from '../../../../utils/ExamUtils'
import { translate } from '../../../../utils/LanguageUtils'

interface Props {
  onChangeStatusFilter: (newValue: IExamAttemptFilter) => void;
  onChangeExamNameFilter: (examName: string) => void;
  activeStatusFilter: IExamAttemptFilter;
  examAttempts: ExamAttempt[];
  activeNameFilter: string;
}

export const ExamAttemptFilter = ({ activeStatusFilter, activeNameFilter, onChangeStatusFilter, onChangeExamNameFilter, examAttempts }: Props) => {
  const examAttemptGroups = groupExamAttemptsByName(examAttempts)
  return (
    <Flex alignItems='center' gap={3} maxWidth={['100%', '50%']}>
      <AiFillFilter size={30} />
      <Select value={activeStatusFilter} onChange={(e) => onChangeStatusFilter(e.target.value as IExamAttemptFilter)}>
        <option value={IExamAttemptFilter.ALL}>{translate('ALL')}</option>
        <option value={IExamAttemptFilter.COMPLETED}>{translate('FINISHED_EXAMS')}</option>
        <option value={IExamAttemptFilter.NOT_COMPLETED}>{translate('NOT_FINISHED_EXAMS')}</option>
      </Select>
      {/* TODO: Add course or level to Exam attempt to allow filtering */}
      <MdLibraryBooks size={30} />
      <Select value={activeNameFilter} onChange={(e) => onChangeExamNameFilter(e.target.value)}>
        <option value={IExamAttemptFilter.ALL}>{translate('ALL')}</option>
        {Object.entries(examAttemptGroups).map(([key]) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </Select>
      {/* <CourseSelect onChange={onChangeCourseFilter} /> */}
    </Flex>
  )
}
