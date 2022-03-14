import { CourseWithMultiSelect } from '../interfaces/Course'
import { Course } from '../platform-models/Course'

const currentYear = new Date().getFullYear().toString()
export const defaultCourse: Course | CourseWithMultiSelect = {
  id: '',
  name: '',
  scheduleDates: [],
  scheduleEndTime: '',
  scheduleStartTime: '',
  virtualClassLink: '',
  externalId: '',
  scheduleYear: { label: currentYear, value: currentYear }
}
