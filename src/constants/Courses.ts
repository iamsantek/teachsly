import { CourseWithMultiSelect } from '../interfaces/Course'
import { Course } from '../platform-models/Course'

export const defaultCourse: Course | CourseWithMultiSelect = {
  id: '',
  name: '',
  scheduleDates: [],
  scheduleEndTime: '',
  scheduleStartTime: '',
  virtualClassLink: ''
}
