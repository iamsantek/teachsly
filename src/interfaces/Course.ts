import { CreateCourseInput } from '../API';
import { MultiSelectOption } from './MultiSelectOption'

export interface CourseSchedule {
  scheduleStartTime: string;
  scheduleEndTime: string;
  scheduleDates: string[];
}

export interface CourseWithMultiSelect extends Omit<CreateCourseInput, 'scheduleDates' | 'scheduleYear' | 'type'> {
  scheduleDates: MultiSelectOption[];
  scheduleYear: MultiSelectOption;
  type: MultiSelectOption;
}
