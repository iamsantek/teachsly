import { Flex, Select } from '@chakra-ui/react'
import { AiFillFilter } from 'react-icons/ai'
import { MdLibraryBooks } from 'react-icons/md'
import { translate } from '../../utils/LanguageUtils'
import { ExamFilter as IExamFilter } from '../../interfaces/Exams'
import { useUserGroups } from '../../hooks/useUserGroups'
import { renderCourseList } from '../../utils/CourseUtils'

interface Props {
    onChangeStatusFilter: (newValue: IExamFilter) => void;
    currentStatusFilter: IExamFilter;
    onChangeCourseFilter: (courseName: string) => void;
    currentCourseFilter: string;

}

export const ExamFilter = ({ onChangeStatusFilter, onChangeCourseFilter, currentCourseFilter, currentStatusFilter }: Props) => {
  const { groups } = useUserGroups()
  const groupList = renderCourseList(groups)

  return (
        <Flex alignItems='center' gap={5}>
            <AiFillFilter size={70} />
            <Select value={currentStatusFilter} onChange={(e) => onChangeStatusFilter(e.target.value as IExamFilter)}>
                <option value={IExamFilter.ALL}>{translate('ALL')}</option>
                <option value={IExamFilter.CORRECTED}>{translate('CORRECTED')}</option>
                <option value={IExamFilter.OUTDATED}>{translate('OUTDATED')}</option>
                <option value={IExamFilter.PENDING_CORRECTION}>{translate('NOT_CORRECTED')}</option>
                <option value={IExamFilter.PENDING}>{translate('PENDING')}</option>
            </Select>
            <MdLibraryBooks size={70} />
            <Select value={currentCourseFilter} onChange={(e) => onChangeCourseFilter(e.target.value)}>
                <option value={IExamFilter.ALL}>{translate('ALL')}</option>
                {groupList.map(group => (
                    <option key={group.value} value={group.value}>{group.label}</option>
                ))}
            </Select>
        </Flex>
  )
}
