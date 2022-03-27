import { CourseWithMultiSelect } from '../interfaces/Course'
import { CreateCourseInput } from '../API'

const currentYear = new Date().getFullYear().toString()
export const defaultCourse: CreateCourseInput | CourseWithMultiSelect = {
  id: '',
  name: '',
  scheduleDates: [],
  scheduleEndTime: '',
  scheduleStartTime: '',
  virtualClassLink: '',
  externalId: '',
  scheduleYear: { label: currentYear, value: currentYear }
}
