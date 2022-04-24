import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum MediaType {
  LINK = "LINK",
  FILE = "FILE"
}

export enum DisabledAccountReasons {
  DISABLED_BY_ADMIN = "DISABLED_BY_ADMIN",
  PAYMENT_NOT_COMPLETED = "PAYMENT_NOT_COMPLETED"
}



type CourseMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MediaFolderMetaData = {
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
  readonly scheduleDates: (number | null)[];
  readonly scheduleStartTime: string;
  readonly scheduleEndTime: string;
  readonly virtualClassLink?: string;
  readonly isActive?: boolean;
  readonly externalId: string;
  readonly scheduleYear: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Course, CourseMetaData>);
  static copyOf(source: Course, mutator: (draft: MutableModel<Course, CourseMetaData>) => MutableModel<Course, CourseMetaData> | void): Course;
}

export declare class MediaFolder {
  readonly id: string;
  readonly name: string;
  readonly groups: string[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MediaFolder, MediaFolderMetaData>);
  static copyOf(source: MediaFolder, mutator: (draft: MutableModel<MediaFolder, MediaFolderMetaData>) => MutableModel<MediaFolder, MediaFolderMetaData> | void): MediaFolder;
}

export declare class Media {
  readonly id: string;
  readonly title: string;
  readonly type: MediaType | keyof typeof MediaType;
  readonly description?: string;
  readonly link: string;
  readonly content?: string;
  readonly groups: string[];
  readonly uploadedBy: string;
  readonly mimeType?: string;
  readonly folderId?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Media, MediaMetaData>);
  static copyOf(source: Media, mutator: (draft: MutableModel<Media, MediaMetaData>) => MutableModel<Media, MediaMetaData> | void): Media;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly cognitoId: string;
  readonly groups: string[];
  readonly isDisabledUser?: boolean;
  readonly disabledReason?: DisabledAccountReasons | keyof typeof DisabledAccountReasons;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}