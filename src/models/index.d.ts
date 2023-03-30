import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

export enum ExamType {
  EXAM = "EXAM",
  HOMEWORK = "HOMEWORK",
}

export enum EnglishLevel {
  STARTER = "STARTER",
  ELEMENTARY = "ELEMENTARY",
  PRE_INTERMEDIATE = "PRE_INTERMEDIATE",
  INTERMEDIATE = "INTERMEDIATE",
  UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE",
  ADVANCED = "ADVANCED",
}

export enum MediaType {
  LINK = "LINK",
  FILE = "FILE",
}

export enum DisabledAccountReasons {
  DISABLED_BY_ADMIN = "DISABLED_BY_ADMIN",
  PAYMENT_NOT_COMPLETED = "PAYMENT_NOT_COMPLETED",
}

export enum TimeGranularity {
  SECONDS = "SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS",
}

export enum LessonPlanningType {
  EXAM = "EXAM",
  HOMEWORK = "HOMEWORK",
  OTHER = "OTHER",
  LESSON = "LESSON",
  MEDIA = "MEDIA",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  IN_PROCESS = "IN_PROCESS",
  REJECTED = "REJECTED",
  REFUNDED = "REFUNDED",
  CANCELLED = "CANCELLED",
  IN_MEDIATION = "IN_MEDIATION",
  CHARGED_BACK = "CHARGED_BACK",
}

export enum PaymentType {
  BOOKLET = "BOOKLET",
}

export declare class Options {
  readonly id: string;
  readonly label: string;
  readonly isCorrectOption?: boolean | null;
  constructor(init: ModelInit<Options>);
}

export declare class Timer {
  readonly type: string;
  readonly timeInSeconds: number;
  readonly timeGranularity?:
    | TimeGranularity
    | keyof typeof TimeGranularity
    | null;
  constructor(init: ModelInit<Timer>);
}

export declare class ExamSettings {
  readonly allowRetake?: boolean | null;
  constructor(init: ModelInit<ExamSettings>);
}

type CourseMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type MediaFolderMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type MediaMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type UserMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type ExamMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type ExamAttemptMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type LessonPlanMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type PaymentsMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type BookletsMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

export declare class Course {
  readonly id: string;
  readonly name: string;
  readonly scheduleDates?: (number | null)[] | null;
  readonly scheduleStartTime?: string | null;
  readonly scheduleEndTime?: string | null;
  readonly virtualClassLink?: string | null;
  readonly isActive?: boolean | null;
  readonly externalId: string;
  readonly scheduleYear: number;
  readonly englishLevel?: EnglishLevel | keyof typeof EnglishLevel | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Course, CourseMetaData>);
  static copyOf(
    source: Course,
    mutator: (
      draft: MutableModel<Course, CourseMetaData>
    ) => MutableModel<Course, CourseMetaData> | void
  ): Course;
}

export declare class MediaFolder {
  readonly id: string;
  readonly name: string;
  readonly groups: string[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<MediaFolder, MediaFolderMetaData>);
  static copyOf(
    source: MediaFolder,
    mutator: (
      draft: MutableModel<MediaFolder, MediaFolderMetaData>
    ) => MutableModel<MediaFolder, MediaFolderMetaData> | void
  ): MediaFolder;
}

export declare class Media {
  readonly id: string;
  readonly title: string;
  readonly type: MediaType | keyof typeof MediaType;
  readonly description?: string | null;
  readonly link: string;
  readonly content?: string | null;
  readonly groups: string[];
  readonly uploadedBy: string;
  readonly mimeType?: string | null;
  readonly folderId?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Media, MediaMetaData>);
  static copyOf(
    source: Media,
    mutator: (
      draft: MutableModel<Media, MediaMetaData>
    ) => MutableModel<Media, MediaMetaData> | void
  ): Media;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly cognitoId: string;
  readonly groups: string[];
  readonly isDisabledUser?: boolean | null;
  readonly disabledReason?:
    | DisabledAccountReasons
    | keyof typeof DisabledAccountReasons
    | null;
  readonly englishLevel?: EnglishLevel | keyof typeof EnglishLevel | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(
    source: User,
    mutator: (
      draft: MutableModel<User, UserMetaData>
    ) => MutableModel<User, UserMetaData> | void
  ): User;
}

export declare class Exam {
  readonly id: string;
  readonly groups: string[];
  readonly title: string;
  readonly questionPools: string;
  readonly timer: Timer;
  readonly deadline: string;
  readonly startDate: string;
  readonly type?: ExamType | keyof typeof ExamType | null;
  readonly settings?: ExamSettings | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Exam, ExamMetaData>);
  static copyOf(
    source: Exam,
    mutator: (
      draft: MutableModel<Exam, ExamMetaData>
    ) => MutableModel<Exam, ExamMetaData> | void
  ): Exam;
}

export declare class ExamAttempt {
  readonly id: string;
  readonly examId: string;
  readonly examName: string;
  readonly userId: string;
  readonly userName?: string | null;
  readonly score?: string | null;
  readonly isCompleted?: boolean | null;
  readonly correctAnswers?: number | null;
  readonly totalQuestions?: number | null;
  readonly correctedBy?: string | null;
  readonly externalId: string;
  readonly results?: string | null;
  readonly keys?: string | null;
  readonly teacherComments?: string | null;
  readonly type?: ExamType | keyof typeof ExamType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ExamAttempt, ExamAttemptMetaData>);
  static copyOf(
    source: ExamAttempt,
    mutator: (
      draft: MutableModel<ExamAttempt, ExamAttemptMetaData>
    ) => MutableModel<ExamAttempt, ExamAttemptMetaData> | void
  ): ExamAttempt;
}

export declare class LessonPlan {
  readonly id: string;
  readonly groups: string[];
  readonly title: string;
  readonly date: string;
  readonly uploadedBy: string;
  readonly content?: string | null;
  readonly media?: string | null;
  readonly type?: LessonPlanningType | keyof typeof LessonPlanningType | null;
  readonly externalId: string;
  readonly extraInformation?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<LessonPlan, LessonPlanMetaData>);
  static copyOf(
    source: LessonPlan,
    mutator: (
      draft: MutableModel<LessonPlan, LessonPlanMetaData>
    ) => MutableModel<LessonPlan, LessonPlanMetaData> | void
  ): LessonPlan;
}

export declare class Payments {
  readonly id: string;
  readonly userId: string;
  readonly date: string;
  readonly status: PaymentStatus | keyof typeof PaymentStatus;
  readonly type: PaymentType | keyof typeof PaymentType;
  readonly typeId: string;
  readonly amount: number;
  readonly mpPaymentId: string;
  readonly itemName: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Payments, PaymentsMetaData>);
  static copyOf(
    source: Payments,
    mutator: (
      draft: MutableModel<Payments, PaymentsMetaData>
    ) => MutableModel<Payments, PaymentsMetaData> | void
  ): Payments;
}

export declare class Booklets {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly level: EnglishLevel | keyof typeof EnglishLevel;
  readonly priceArs: number;
  readonly priceUsd: number;
  readonly isActive?: boolean | null;
  readonly mpCheckoutUrl: string;
  readonly mpPreferenceId: string;
  readonly pdfFile: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Booklets, BookletsMetaData>);
  static copyOf(
    source: Booklets,
    mutator: (
      draft: MutableModel<Booklets, BookletsMetaData>
    ) => MutableModel<Booklets, BookletsMetaData> | void
  ): Booklets;
}
