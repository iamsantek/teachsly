export class Course {
  id?: string;
  name: string;
  scheduleDates: string[];
  scheduleStartTime: string;
  scheduleEndTime: string;
  isVirtual: boolean;

  constructor(course: Course) {
    this.name = course.name;
    this.scheduleDates = course.scheduleDates;
    this.scheduleStartTime = course.scheduleStartTime;
    this.scheduleEndTime = course.scheduleEndTime;
    this.isVirtual = course.isVirtual;
  }
}
