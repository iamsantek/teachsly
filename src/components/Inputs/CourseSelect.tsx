import { Select } from '@chakra-ui/react'
import { useContext } from 'react'
import { UserDashboardContext } from '../../contexts/UserDashboardContext'
import DateTimeUtils, { TimeFormats } from '../../utils/DateTimeUtils'
import { translate } from '../../utils/LanguageUtils'

interface Props {
  onChange: (newValue: string) => void;
}

export const CourseSelect = ({ onChange }: Props) => {
  const { context: { courses } } = useContext(UserDashboardContext)
  return (
    <Select
      onChange={(e) => onChange(e.target.value as string)}
    >
      {courses.map(course => {
        const dates = DateTimeUtils.shortDays(course.scheduleDates as number[])
        const startTime = DateTimeUtils.formateHour(course.scheduleStartTime, TimeFormats.TwentyFourHours)
        const endTime = DateTimeUtils.formateHour(course.scheduleEndTime, TimeFormats.TwentyFourHours)

        return (
          <option key={course.id} value={course.externalId}>{course.name} ({dates} {startTime} - {endTime}) {course.virtualClassLink ? ` - ${translate('VIRTUAL_COURSE')}` : ''}</option>
        )
      })}
    </Select>
  )
}
