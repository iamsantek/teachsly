import { CourseWithMultiSelect } from "../interfaces/Course";
import { CourseType, CreateCourseInput } from "../API";

const currentYear = new Date().getFullYear().toString();
export const defaultCourse: CreateCourseInput | CourseWithMultiSelect = {
  id: "",
  name: "",
  scheduleDates: [],
  scheduleEndTime: "",
  scheduleStartTime: "",
  virtualClassLink: "",
  externalId: "",
  scheduleYear: { label: currentYear, value: currentYear },
  type: { label: CourseType.GROUP, value: CourseType.GROUP },
  isVirtual: false,
  zoomMeetingId: "",
};
