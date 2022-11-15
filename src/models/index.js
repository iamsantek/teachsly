// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ExamType = {
  "EXAM": "EXAM",
  "HOMEWORK": "HOMEWORK"
};

const EnglishLevel = {
  "STARTER": "STARTER",
  "ELEMENTARY": "ELEMENTARY",
  "PRE_INTERMEDIATE": "PRE_INTERMEDIATE",
  "INTERMEDIATE": "INTERMEDIATE",
  "UPPER_INTERMEDIATE": "UPPER_INTERMEDIATE",
  "ADVANCED": "ADVANCED"
};

const MediaType = {
  "LINK": "LINK",
  "FILE": "FILE"
};

const DisabledAccountReasons = {
  "DISABLED_BY_ADMIN": "DISABLED_BY_ADMIN",
  "PAYMENT_NOT_COMPLETED": "PAYMENT_NOT_COMPLETED"
};

const TimeGranularity = {
  "SECONDS": "SECONDS",
  "MINUTES": "MINUTES",
  "HOURS": "HOURS"
};

const LessonPlanningType = {
  "EXAM": "EXAM",
  "HOMEWORK": "HOMEWORK",
  "OTHER": "OTHER",
  "LESSON": "LESSON",
  "MEDIA": "MEDIA"
};

const PaymentStatus = {
  "PENDING": "PENDING",
  "APPROVED": "APPROVED",
  "IN_PROCESS": "IN_PROCESS",
  "REJECTED": "REJECTED",
  "REFUNDED": "REFUNDED",
  "CANCELLED": "CANCELLED",
  "IN_MEDIATION": "IN_MEDIATION",
  "CHARGED_BACK": "CHARGED_BACK"
};

const PaymentType = {
  "BOOKLET": "BOOKLET"
};

const { Course, MediaFolder, Media, User, Exam, ExamAttempt, LessonPlan, Payments, Booklets, Options, Timer, ExamSettings } = initSchema(schema);

export {
  Course,
  MediaFolder,
  Media,
  User,
  Exam,
  ExamAttempt,
  LessonPlan,
  Payments,
  Booklets,
  ExamType,
  EnglishLevel,
  MediaType,
  DisabledAccountReasons,
  TimeGranularity,
  LessonPlanningType,
  PaymentStatus,
  PaymentType,
  Options,
  Timer,
  ExamSettings
};