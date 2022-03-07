import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum MediaType {
  LINK = "LINK",
  PDF = "PDF",
  VIDEO = "VIDEO"
}



type CourseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MediaMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Course {
  readonly id: string;
  readonly name: string;
  readonly scheduleDates: (string | null)[];
  readonly scheduleStartTime: string;
  readonly scheduleEndTime: string;
  readonly virtualClassLink?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Course, CourseMetaData>);
  static copyOf(source: Course, mutator: (draft: MutableModel<Course, CourseMetaData>) => MutableModel<Course, CourseMetaData> | void): Course;
}

export declare class Media {
  readonly id: string;
  readonly title: string;
  readonly type: MediaType | keyof typeof MediaType;
  readonly description?: string;
  readonly link: string;
  readonly content?: string;
  readonly groups?: (string | null)[];
  readonly uploadedBy?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Media, MediaMetaData>);
  static copyOf(source: Media, mutator: (draft: MutableModel<Media, MediaMetaData>) => MutableModel<Media, MediaMetaData> | void): Media;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly cognitoId: string;
  readonly groups: (string | null)[];
  readonly isDisabledUser?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}