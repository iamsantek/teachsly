import { Flex, Select, Input } from '@chakra-ui/react'
import { AiFillFilter } from 'react-icons/ai'
import { BiSearchAlt2 } from 'react-icons/bi'
import { MdLibraryBooks } from 'react-icons/md'
import { ExamAttempt } from '../../../../API'
import { ExamAttemptFilter as IExamAttemptFilter } from '../../../../interfaces/Exams'
import { groupExamAttemptsByName } from '../../../../utils/ExamUtils'
import { translate } from '../../../../utils/LanguageUtils'

interface Props {
  onChangeStatusFilter: (newValue: IExamAttemptFilter) => void;
  onChangeExamNameFilter: (examName: string) => void;
  onChangeStudentNameFilter: (studentName: string) => void;
  activeStatusFilter: IExamAttemptFilter;
  examAttempts: ExamAttempt[];
  activeNameFilter: string;
  studentNameFilter: string;
}

export const ExamAttemptFilter = ({ studentNameFilter, activeStatusFilter, activeNameFilter, examAttempts, onChangeStatusFilter, onChangeExamNameFilter, onChangeStudentNameFilter }: Props) => {
  const examAttemptGroups = groupExamAttemptsByName(examAttempts)
  return (
    <Flex alignItems='center' gap={5}>
      <AiFillFilter size={70} />
      <Select value={activeStatusFilter} onChange={(e) => onChangeStatusFilter(e.target.value as IExamAttemptFilter)}>
        <option value={IExamAttemptFilter.ALL}>{translate('ALL')}</option>
        <option value={IExamAttemptFilter.COMPLETED}>{translate('FINISHED_EXAMS')}</option>
        <option value={IExamAttemptFilter.NOT_COMPLETED}>{translate('NOT_FINISHED_EXAMS')}</option>
        <option value={IExamAttemptFilter.NOT_CORRECTED}>{translate('EXAMS_NOT_CORRECTED')}</option>
      </Select>
      {/* TODO: Add course or level to Exam attempt to allow filtering */}
      <MdLibraryBooks size={70} />
      <Select value={activeNameFilter} onChange={(e) => onChangeExamNameFilter(e.target.value)}>
        <option value={IExamAttemptFilter.ALL}>{translate('ALL')}</option>
        {Object.entries(examAttemptGroups).map(([key]) => (
          <option key={key} value={key}>{key}</option>
        ))}
      </Select>
      <BiSearchAlt2 size={70} />
      <Input
      placeholder={translate('SEARCH_BY_STUDENT_NAME')}
      value={studentNameFilter}
      onChange={(e) => onChangeStudentNameFilter(e.target.value)}
      />
    </Flex>
  )
}
