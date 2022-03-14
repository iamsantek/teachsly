export interface Course {
  id: string;
  name: string;
  scheduleDates: number[];
  scheduleStartTime: string;
  scheduleEndTime: string;
  virtualClassLink: string;
  externalId: string;
  scheduleYear: number;
}
