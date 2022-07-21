import { Flex, Select } from '@chakra-ui/react'
import { AiFillFilter } from 'react-icons/ai'
import { ExamAttemptFilter as IExamAttemptFilter } from '../../../../interfaces/Exams'
import { translate } from '../../../../utils/LanguageUtils'

interface Props {
  onChangeStatusFilter: (newValue: IExamAttemptFilter) => void;
  onChangeCourseFilter: (newValue: string) => void;
  value: IExamAttemptFilter;
}

export const ExamAttemptFilter = ({ onChangeStatusFilter, value }: Props) => {
  return (
    <Flex alignItems='center' gap={3} maxWidth={['100%', '25%']}>
      <AiFillFilter size={30} />
      <Select value={value} onChange={(e) => onChangeStatusFilter(e.target.value as IExamAttemptFilter)}>
        <option value={IExamAttemptFilter.ALL}>{translate('ALL')}</option>
        <option value={IExamAttemptFilter.COMPLETED}>{translate('FINISHED_EXAMS')}</option>
        <option value={IExamAttemptFilter.NOT_COMPLETED}>{translate('NOT_FINISHED_EXAMS')}</option>
      </Select>
      {/* TODO: Add course or level to Exam attempt to allow filtering */}
      {/* <MdLibraryBooks size={30} /> */}
      {/* <CourseSelect onChange={onChangeCourseFilter} /> */}
    </Flex>
  )
}
