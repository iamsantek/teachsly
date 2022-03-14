import { Course } from '../platform-models/Course'
import { MultiSelectOption } from './MultiSelectOption'

export interface CourseSchedule {
  scheduleStartTime: string;
  scheduleEndTime: string;
  scheduleDates: string[];
}

export interface CourseWithMultiSelect extends Omit<Course, 'scheduleDates' | 'scheduleYear'> {
  scheduleDates: MultiSelectOption[];
  scheduleYear: MultiSelectOption;
}
