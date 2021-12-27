import { Course } from "../platform-models/Course";

export const defaultCourse: Course = new Course({
  name: "",
  scheduleDates: [],  
  scheduleEndTime: "",
  scheduleStartTime: "",
  isVirtual: false,
});
