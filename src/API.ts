/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCourseInput = {
  id?: string | null,
  name: string,
  scheduleDates?: Array< number | null > | null,
  scheduleStartTime?: string | null,
  scheduleEndTime?: string | null,
  virtualClassLink?: string | null,
  isActive?: boolean | null,
  externalId: string,
  scheduleYear?: number | null,
  englishLevel?: EnglishLevel | null,
  type?: CourseType | null,
  isVirtual?: boolean | null,
  zoomMeetingId?: string | null,
};

export enum EnglishLevel {
  STARTER = "STARTER",
  ELEMENTARY = "ELEMENTARY",
  PRE_INTERMEDIATE = "PRE_INTERMEDIATE",
  INTERMEDIATE = "INTERMEDIATE",
  UPPER_INTERMEDIATE = "UPPER_INTERMEDIATE",
  ADVANCED = "ADVANCED",
}


export enum CourseType {
  GROUP = "GROUP",
  PRIVATE = "PRIVATE",
}


export type ModelCourseConditionInput = {
  name?: ModelStringInput | null,
  scheduleDates?: ModelIntInput | null,
  scheduleStartTime?: ModelStringInput | null,
  scheduleEndTime?: ModelStringInput | null,
  virtualClassLink?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  externalId?: ModelStringInput | null,
  scheduleYear?: ModelIntInput | null,
  englishLevel?: ModelEnglishLevelInput | null,
  type?: ModelCourseTypeInput | null,
  isVirtual?: ModelBooleanInput | null,
  zoomMeetingId?: ModelStringInput | null,
  and?: Array< ModelCourseConditionInput | null > | null,
  or?: Array< ModelCourseConditionInput | null > | null,
  not?: ModelCourseConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelEnglishLevelInput = {
  eq?: EnglishLevel | null,
  ne?: EnglishLevel | null,
};

export type ModelCourseTypeInput = {
  eq?: CourseType | null,
  ne?: CourseType | null,
};

export type Course = {
  __typename: "Course",
  id: string,
  name: string,
  scheduleDates?: Array< number | null > | null,
  scheduleStartTime?: string | null,
  scheduleEndTime?: string | null,
  virtualClassLink?: string | null,
  isActive?: boolean | null,
  externalId: string,
  scheduleYear?: number | null,
  englishLevel?: EnglishLevel | null,
  type?: CourseType | null,
  isVirtual?: boolean | null,
  zoomMeetingId?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCourseInput = {
  id: string,
  name?: string | null,
  scheduleDates?: Array< number | null > | null,
  scheduleStartTime?: string | null,
  scheduleEndTime?: string | null,
  virtualClassLink?: string | null,
  isActive?: boolean | null,
  externalId?: string | null,
  scheduleYear?: number | null,
  englishLevel?: EnglishLevel | null,
  type?: CourseType | null,
  isVirtual?: boolean | null,
  zoomMeetingId?: string | null,
};

export type DeleteCourseInput = {
  id: string,
};

export type CreateMediaFolderInput = {
  id?: string | null,
  name: string,
  groups: Array< string >,
  parentId?: string | null,
};

export type ModelMediaFolderConditionInput = {
  name?: ModelStringInput | null,
  groups?: ModelStringInput | null,
  parentId?: ModelIDInput | null,
  and?: Array< ModelMediaFolderConditionInput | null > | null,
  or?: Array< ModelMediaFolderConditionInput | null > | null,
  not?: ModelMediaFolderConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type MediaFolder = {
  __typename: "MediaFolder",
  id: string,
  name: string,
  groups: Array< string >,
  parentId?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateMediaFolderInput = {
  id: string,
  name?: string | null,
  groups?: Array< string > | null,
  parentId?: string | null,
};

export type DeleteMediaFolderInput = {
  id: string,
};

export type CreateMediaInput = {
  id?: string | null,
  title: string,
  type: MediaType,
  description?: string | null,
  link: string,
  content?: string | null,
  groups: Array< string >,
  uploadedBy: string,
  mimeType?: string | null,
  folderId?: string | null,
};

export enum MediaType {
  LINK = "LINK",
  FILE = "FILE",
}


export type ModelMediaConditionInput = {
  title?: ModelStringInput | null,
  type?: ModelMediaTypeInput | null,
  description?: ModelStringInput | null,
  link?: ModelStringInput | null,
  content?: ModelStringInput | null,
  groups?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
  mimeType?: ModelStringInput | null,
  folderId?: ModelStringInput | null,
  and?: Array< ModelMediaConditionInput | null > | null,
  or?: Array< ModelMediaConditionInput | null > | null,
  not?: ModelMediaConditionInput | null,
};

export type ModelMediaTypeInput = {
  eq?: MediaType | null,
  ne?: MediaType | null,
};

export type Media = {
  __typename: "Media",
  id: string,
  title: string,
  type: MediaType,
  description?: string | null,
  link: string,
  content?: string | null,
  groups: Array< string >,
  uploadedBy: string,
  mimeType?: string | null,
  folderId?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateMediaInput = {
  id: string,
  title?: string | null,
  type?: MediaType | null,
  description?: string | null,
  link?: string | null,
  content?: string | null,
  groups?: Array< string > | null,
  uploadedBy?: string | null,
  mimeType?: string | null,
  folderId?: string | null,
};

export type DeleteMediaInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  email: string,
  phone: string,
  cognitoId: string,
  groups: Array< string >,
  isDisabledUser?: boolean | null,
  disabledReason?: DisabledAccountReasons | null,
  englishLevel?: EnglishLevel | null,
};

export enum DisabledAccountReasons {
  DISABLED_BY_ADMIN = "DISABLED_BY_ADMIN",
  PAYMENT_NOT_COMPLETED = "PAYMENT_NOT_COMPLETED",
}


export type ModelUserConditionInput = {
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  cognitoId?: ModelIDInput | null,
  groups?: ModelStringInput | null,
  isDisabledUser?: ModelBooleanInput | null,
  disabledReason?: ModelDisabledAccountReasonsInput | null,
  englishLevel?: ModelEnglishLevelInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelDisabledAccountReasonsInput = {
  eq?: DisabledAccountReasons | null,
  ne?: DisabledAccountReasons | null,
};

export type User = {
  __typename: "User",
  id: string,
  name: string,
  email: string,
  phone: string,
  cognitoId: string,
  groups: Array< string >,
  isDisabledUser?: boolean | null,
  disabledReason?: DisabledAccountReasons | null,
  englishLevel?: EnglishLevel | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateUserInput = {
  id: string,
  name?: string | null,
  email?: string | null,
  phone?: string | null,
  cognitoId?: string | null,
  groups?: Array< string > | null,
  isDisabledUser?: boolean | null,
  disabledReason?: DisabledAccountReasons | null,
  englishLevel?: EnglishLevel | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreateExamInput = {
  id?: string | null,
  groups: Array< string >,
  title: string,
  questionPools: string,
  timer: TimerInput,
  deadline?: string | null,
  startDate: string,
  type?: ExamType | null,
  settings?: ExamSettingsInput | null,
};

export type TimerInput = {
  type: string,
  timeInSeconds: number,
  timeGranularity?: TimeGranularity | null,
};

export enum TimeGranularity {
  SECONDS = "SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS",
}


export enum ExamType {
  EXAM = "EXAM",
  HOMEWORK = "HOMEWORK",
}


export type ExamSettingsInput = {
  allowRetake?: boolean | null,
};

export type ModelExamConditionInput = {
  groups?: ModelStringInput | null,
  title?: ModelStringInput | null,
  questionPools?: ModelStringInput | null,
  deadline?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  type?: ModelExamTypeInput | null,
  and?: Array< ModelExamConditionInput | null > | null,
  or?: Array< ModelExamConditionInput | null > | null,
  not?: ModelExamConditionInput | null,
};

export type ModelExamTypeInput = {
  eq?: ExamType | null,
  ne?: ExamType | null,
};

export type Exam = {
  __typename: "Exam",
  id: string,
  groups: Array< string >,
  title: string,
  questionPools: string,
  timer: Timer,
  deadline?: string | null,
  startDate: string,
  type?: ExamType | null,
  settings?: ExamSettings | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type Timer = {
  __typename: "Timer",
  type: string,
  timeInSeconds: number,
  timeGranularity?: TimeGranularity | null,
};

export type ExamSettings = {
  __typename: "ExamSettings",
  allowRetake?: boolean | null,
};

export type UpdateExamInput = {
  id: string,
  groups?: Array< string > | null,
  title?: string | null,
  questionPools?: string | null,
  timer?: TimerInput | null,
  deadline?: string | null,
  startDate?: string | null,
  type?: ExamType | null,
  settings?: ExamSettingsInput | null,
};

export type DeleteExamInput = {
  id: string,
};

export type CreateExamAttemptInput = {
  id?: string | null,
  examId: string,
  examName: string,
  userId: string,
  userName?: string | null,
  score?: string | null,
  isCompleted?: boolean | null,
  correctAnswers?: number | null,
  totalQuestions?: number | null,
  correctedBy?: string | null,
  externalId: string,
  results?: string | null,
  keys?: string | null,
  teacherComments?: string | null,
  type?: ExamType | null,
};

export type ModelExamAttemptConditionInput = {
  examId?: ModelIDInput | null,
  examName?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  userName?: ModelStringInput | null,
  score?: ModelStringInput | null,
  isCompleted?: ModelBooleanInput | null,
  correctAnswers?: ModelIntInput | null,
  totalQuestions?: ModelIntInput | null,
  correctedBy?: ModelStringInput | null,
  externalId?: ModelIDInput | null,
  results?: ModelStringInput | null,
  keys?: ModelStringInput | null,
  teacherComments?: ModelStringInput | null,
  type?: ModelExamTypeInput | null,
  and?: Array< ModelExamAttemptConditionInput | null > | null,
  or?: Array< ModelExamAttemptConditionInput | null > | null,
  not?: ModelExamAttemptConditionInput | null,
};

export type ExamAttempt = {
  __typename: "ExamAttempt",
  id: string,
  examId: string,
  examName: string,
  userId: string,
  userName?: string | null,
  score?: string | null,
  isCompleted?: boolean | null,
  correctAnswers?: number | null,
  totalQuestions?: number | null,
  correctedBy?: string | null,
  externalId: string,
  results?: string | null,
  keys?: string | null,
  teacherComments?: string | null,
  type?: ExamType | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateExamAttemptInput = {
  id: string,
  examId?: string | null,
  examName?: string | null,
  userId?: string | null,
  userName?: string | null,
  score?: string | null,
  isCompleted?: boolean | null,
  correctAnswers?: number | null,
  totalQuestions?: number | null,
  correctedBy?: string | null,
  externalId?: string | null,
  results?: string | null,
  keys?: string | null,
  teacherComments?: string | null,
  type?: ExamType | null,
};

export type DeleteExamAttemptInput = {
  id: string,
};

export type CreateLessonPlanInput = {
  id?: string | null,
  groups: Array< string >,
  title: string,
  date: string,
  uploadedBy: string,
  content?: string | null,
  media?: string | null,
  type?: LessonPlanningType | null,
  externalId: string,
  extraInformation?: string | null,
  link?: string | null,
};

export enum LessonPlanningType {
  EXAM = "EXAM",
  HOMEWORK = "HOMEWORK",
  OTHER = "OTHER",
  LESSON = "LESSON",
  MEDIA = "MEDIA",
  RECORDING = "RECORDING",
  LINK = "LINK",
}


export type ModelLessonPlanConditionInput = {
  groups?: ModelStringInput | null,
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
  content?: ModelStringInput | null,
  media?: ModelStringInput | null,
  type?: ModelLessonPlanningTypeInput | null,
  externalId?: ModelIDInput | null,
  extraInformation?: ModelStringInput | null,
  link?: ModelStringInput | null,
  and?: Array< ModelLessonPlanConditionInput | null > | null,
  or?: Array< ModelLessonPlanConditionInput | null > | null,
  not?: ModelLessonPlanConditionInput | null,
};

export type ModelLessonPlanningTypeInput = {
  eq?: LessonPlanningType | null,
  ne?: LessonPlanningType | null,
};

export type LessonPlan = {
  __typename: "LessonPlan",
  id: string,
  groups: Array< string >,
  title: string,
  date: string,
  uploadedBy: string,
  content?: string | null,
  media?: string | null,
  type?: LessonPlanningType | null,
  externalId: string,
  extraInformation?: string | null,
  link?: string | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateLessonPlanInput = {
  id: string,
  groups?: Array< string > | null,
  title?: string | null,
  date?: string | null,
  uploadedBy?: string | null,
  content?: string | null,
  media?: string | null,
  type?: LessonPlanningType | null,
  externalId?: string | null,
  extraInformation?: string | null,
  link?: string | null,
};

export type DeleteLessonPlanInput = {
  id: string,
};

export type CreatePaymentsInput = {
  id?: string | null,
  userId: string,
  date: string,
  status: PaymentStatus,
  type: PaymentType,
  typeId: string,
  amount: number,
  mpPaymentId: string,
  itemName: string,
  currency: PaymentCurrency,
};

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


export enum PaymentCurrency {
  ARS = "ARS",
  USD = "USD",
}


export type ModelPaymentsConditionInput = {
  userId?: ModelIDInput | null,
  date?: ModelStringInput | null,
  status?: ModelPaymentStatusInput | null,
  type?: ModelPaymentTypeInput | null,
  typeId?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  mpPaymentId?: ModelStringInput | null,
  itemName?: ModelStringInput | null,
  currency?: ModelPaymentCurrencyInput | null,
  and?: Array< ModelPaymentsConditionInput | null > | null,
  or?: Array< ModelPaymentsConditionInput | null > | null,
  not?: ModelPaymentsConditionInput | null,
};

export type ModelPaymentStatusInput = {
  eq?: PaymentStatus | null,
  ne?: PaymentStatus | null,
};

export type ModelPaymentTypeInput = {
  eq?: PaymentType | null,
  ne?: PaymentType | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelPaymentCurrencyInput = {
  eq?: PaymentCurrency | null,
  ne?: PaymentCurrency | null,
};

export type Payments = {
  __typename: "Payments",
  id: string,
  userId: string,
  date: string,
  status: PaymentStatus,
  type: PaymentType,
  typeId: string,
  amount: number,
  mpPaymentId: string,
  itemName: string,
  currency: PaymentCurrency,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePaymentsInput = {
  id: string,
  userId?: string | null,
  date?: string | null,
  status?: PaymentStatus | null,
  type?: PaymentType | null,
  typeId?: string | null,
  amount?: number | null,
  mpPaymentId?: string | null,
  itemName?: string | null,
  currency?: PaymentCurrency | null,
};

export type DeletePaymentsInput = {
  id: string,
};

export type CreateBookletsInput = {
  id?: string | null,
  name: string,
  nameEng: string,
  description?: string | null,
  descriptionEng?: string | null,
  level: EnglishLevel,
  priceArs: number,
  priceUsd: number,
  isActive?: boolean | null,
  cognitoGroups?: Array< string > | null,
  stripePriceId: string,
  stripeSandBoxPriceId: string,
};

export type ModelBookletsConditionInput = {
  name?: ModelStringInput | null,
  nameEng?: ModelStringInput | null,
  description?: ModelStringInput | null,
  descriptionEng?: ModelStringInput | null,
  level?: ModelEnglishLevelInput | null,
  priceArs?: ModelFloatInput | null,
  priceUsd?: ModelFloatInput | null,
  isActive?: ModelBooleanInput | null,
  cognitoGroups?: ModelStringInput | null,
  stripePriceId?: ModelStringInput | null,
  stripeSandBoxPriceId?: ModelStringInput | null,
  and?: Array< ModelBookletsConditionInput | null > | null,
  or?: Array< ModelBookletsConditionInput | null > | null,
  not?: ModelBookletsConditionInput | null,
};

export type Booklets = {
  __typename: "Booklets",
  id: string,
  name: string,
  nameEng: string,
  description?: string | null,
  descriptionEng?: string | null,
  level: EnglishLevel,
  priceArs: number,
  priceUsd: number,
  isActive?: boolean | null,
  cognitoGroups?: Array< string > | null,
  stripePriceId: string,
  stripeSandBoxPriceId: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateBookletsInput = {
  id: string,
  name?: string | null,
  nameEng?: string | null,
  description?: string | null,
  descriptionEng?: string | null,
  level?: EnglishLevel | null,
  priceArs?: number | null,
  priceUsd?: number | null,
  isActive?: boolean | null,
  cognitoGroups?: Array< string > | null,
  stripePriceId?: string | null,
  stripeSandBoxPriceId?: string | null,
};

export type DeleteBookletsInput = {
  id: string,
};

export type CreatePlacementResultsInput = {
  id?: string | null,
  fullName: string,
  email: string,
  level: string,
  phone: string,
  country: string,
};

export type ModelPlacementResultsConditionInput = {
  fullName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  level?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  country?: ModelStringInput | null,
  and?: Array< ModelPlacementResultsConditionInput | null > | null,
  or?: Array< ModelPlacementResultsConditionInput | null > | null,
  not?: ModelPlacementResultsConditionInput | null,
};

export type PlacementResults = {
  __typename: "PlacementResults",
  id: string,
  fullName: string,
  email: string,
  level: string,
  phone: string,
  country: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdatePlacementResultsInput = {
  id: string,
  fullName?: string | null,
  email?: string | null,
  level?: string | null,
  phone?: string | null,
  country?: string | null,
};

export type DeletePlacementResultsInput = {
  id: string,
};

export type CreateClassAttendanceInput = {
  id?: string | null,
  date: string,
  externalCourseId: string,
  userId: string,
};

export type ModelClassAttendanceConditionInput = {
  date?: ModelStringInput | null,
  externalCourseId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelClassAttendanceConditionInput | null > | null,
  or?: Array< ModelClassAttendanceConditionInput | null > | null,
  not?: ModelClassAttendanceConditionInput | null,
};

export type ClassAttendance = {
  __typename: "ClassAttendance",
  id: string,
  date: string,
  externalCourseId: string,
  userId: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateClassAttendanceInput = {
  id: string,
  date?: string | null,
  externalCourseId?: string | null,
  userId?: string | null,
};

export type DeleteClassAttendanceInput = {
  id: string,
};

export type ModelCourseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  scheduleDates?: ModelIntInput | null,
  scheduleStartTime?: ModelStringInput | null,
  scheduleEndTime?: ModelStringInput | null,
  virtualClassLink?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  externalId?: ModelStringInput | null,
  scheduleYear?: ModelIntInput | null,
  englishLevel?: ModelEnglishLevelInput | null,
  type?: ModelCourseTypeInput | null,
  isVirtual?: ModelBooleanInput | null,
  zoomMeetingId?: ModelStringInput | null,
  and?: Array< ModelCourseFilterInput | null > | null,
  or?: Array< ModelCourseFilterInput | null > | null,
  not?: ModelCourseFilterInput | null,
};

export type ModelCourseConnection = {
  __typename: "ModelCourseConnection",
  items:  Array<Course | null >,
  nextToken?: string | null,
};

export type ModelMediaFolderFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  groups?: ModelStringInput | null,
  parentId?: ModelIDInput | null,
  and?: Array< ModelMediaFolderFilterInput | null > | null,
  or?: Array< ModelMediaFolderFilterInput | null > | null,
  not?: ModelMediaFolderFilterInput | null,
};

export type ModelMediaFolderConnection = {
  __typename: "ModelMediaFolderConnection",
  items:  Array<MediaFolder | null >,
  nextToken?: string | null,
};

export type ModelMediaFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  type?: ModelMediaTypeInput | null,
  description?: ModelStringInput | null,
  link?: ModelStringInput | null,
  content?: ModelStringInput | null,
  groups?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
  mimeType?: ModelStringInput | null,
  folderId?: ModelStringInput | null,
  and?: Array< ModelMediaFilterInput | null > | null,
  or?: Array< ModelMediaFilterInput | null > | null,
  not?: ModelMediaFilterInput | null,
};

export type ModelMediaConnection = {
  __typename: "ModelMediaConnection",
  items:  Array<Media | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  cognitoId?: ModelIDInput | null,
  groups?: ModelStringInput | null,
  isDisabledUser?: ModelBooleanInput | null,
  disabledReason?: ModelDisabledAccountReasonsInput | null,
  englishLevel?: ModelEnglishLevelInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelExamFilterInput = {
  id?: ModelIDInput | null,
  groups?: ModelStringInput | null,
  title?: ModelStringInput | null,
  questionPools?: ModelStringInput | null,
  deadline?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  type?: ModelExamTypeInput | null,
  and?: Array< ModelExamFilterInput | null > | null,
  or?: Array< ModelExamFilterInput | null > | null,
  not?: ModelExamFilterInput | null,
};

export type ModelExamConnection = {
  __typename: "ModelExamConnection",
  items:  Array<Exam | null >,
  nextToken?: string | null,
};

export type ModelExamAttemptFilterInput = {
  id?: ModelIDInput | null,
  examId?: ModelIDInput | null,
  examName?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  userName?: ModelStringInput | null,
  score?: ModelStringInput | null,
  isCompleted?: ModelBooleanInput | null,
  correctAnswers?: ModelIntInput | null,
  totalQuestions?: ModelIntInput | null,
  correctedBy?: ModelStringInput | null,
  externalId?: ModelIDInput | null,
  results?: ModelStringInput | null,
  keys?: ModelStringInput | null,
  teacherComments?: ModelStringInput | null,
  type?: ModelExamTypeInput | null,
  and?: Array< ModelExamAttemptFilterInput | null > | null,
  or?: Array< ModelExamAttemptFilterInput | null > | null,
  not?: ModelExamAttemptFilterInput | null,
};

export type ModelExamAttemptConnection = {
  __typename: "ModelExamAttemptConnection",
  items:  Array<ExamAttempt | null >,
  nextToken?: string | null,
};

export type ModelLessonPlanFilterInput = {
  id?: ModelIDInput | null,
  groups?: ModelStringInput | null,
  title?: ModelStringInput | null,
  date?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
  content?: ModelStringInput | null,
  media?: ModelStringInput | null,
  type?: ModelLessonPlanningTypeInput | null,
  externalId?: ModelIDInput | null,
  extraInformation?: ModelStringInput | null,
  link?: ModelStringInput | null,
  and?: Array< ModelLessonPlanFilterInput | null > | null,
  or?: Array< ModelLessonPlanFilterInput | null > | null,
  not?: ModelLessonPlanFilterInput | null,
};

export type ModelLessonPlanConnection = {
  __typename: "ModelLessonPlanConnection",
  items:  Array<LessonPlan | null >,
  nextToken?: string | null,
};

export type ModelPaymentsFilterInput = {
  id?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  date?: ModelStringInput | null,
  status?: ModelPaymentStatusInput | null,
  type?: ModelPaymentTypeInput | null,
  typeId?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  mpPaymentId?: ModelStringInput | null,
  itemName?: ModelStringInput | null,
  currency?: ModelPaymentCurrencyInput | null,
  and?: Array< ModelPaymentsFilterInput | null > | null,
  or?: Array< ModelPaymentsFilterInput | null > | null,
  not?: ModelPaymentsFilterInput | null,
};

export type ModelPaymentsConnection = {
  __typename: "ModelPaymentsConnection",
  items:  Array<Payments | null >,
  nextToken?: string | null,
};

export type ModelBookletsFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  nameEng?: ModelStringInput | null,
  description?: ModelStringInput | null,
  descriptionEng?: ModelStringInput | null,
  level?: ModelEnglishLevelInput | null,
  priceArs?: ModelFloatInput | null,
  priceUsd?: ModelFloatInput | null,
  isActive?: ModelBooleanInput | null,
  cognitoGroups?: ModelStringInput | null,
  stripePriceId?: ModelStringInput | null,
  stripeSandBoxPriceId?: ModelStringInput | null,
  and?: Array< ModelBookletsFilterInput | null > | null,
  or?: Array< ModelBookletsFilterInput | null > | null,
  not?: ModelBookletsFilterInput | null,
};

export type ModelBookletsConnection = {
  __typename: "ModelBookletsConnection",
  items:  Array<Booklets | null >,
  nextToken?: string | null,
};

export type ModelPlacementResultsFilterInput = {
  id?: ModelIDInput | null,
  fullName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  level?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  country?: ModelStringInput | null,
  and?: Array< ModelPlacementResultsFilterInput | null > | null,
  or?: Array< ModelPlacementResultsFilterInput | null > | null,
  not?: ModelPlacementResultsFilterInput | null,
};

export type ModelPlacementResultsConnection = {
  __typename: "ModelPlacementResultsConnection",
  items:  Array<PlacementResults | null >,
  nextToken?: string | null,
};

export type ModelClassAttendanceFilterInput = {
  id?: ModelIDInput | null,
  date?: ModelStringInput | null,
  externalCourseId?: ModelIDInput | null,
  userId?: ModelIDInput | null,
  and?: Array< ModelClassAttendanceFilterInput | null > | null,
  or?: Array< ModelClassAttendanceFilterInput | null > | null,
  not?: ModelClassAttendanceFilterInput | null,
};

export type ModelClassAttendanceConnection = {
  __typename: "ModelClassAttendanceConnection",
  items:  Array<ClassAttendance | null >,
  nextToken?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionCourseFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  scheduleDates?: ModelSubscriptionIntInput | null,
  scheduleStartTime?: ModelSubscriptionStringInput | null,
  scheduleEndTime?: ModelSubscriptionStringInput | null,
  virtualClassLink?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  externalId?: ModelSubscriptionStringInput | null,
  scheduleYear?: ModelSubscriptionIntInput | null,
  englishLevel?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  isVirtual?: ModelSubscriptionBooleanInput | null,
  zoomMeetingId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCourseFilterInput | null > | null,
  or?: Array< ModelSubscriptionCourseFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionMediaFolderFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  parentId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionMediaFolderFilterInput | null > | null,
  or?: Array< ModelSubscriptionMediaFolderFilterInput | null > | null,
};

export type ModelSubscriptionMediaFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  link?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  uploadedBy?: ModelSubscriptionStringInput | null,
  mimeType?: ModelSubscriptionStringInput | null,
  folderId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionMediaFilterInput | null > | null,
  or?: Array< ModelSubscriptionMediaFilterInput | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  cognitoId?: ModelSubscriptionIDInput | null,
  groups?: ModelSubscriptionStringInput | null,
  isDisabledUser?: ModelSubscriptionBooleanInput | null,
  disabledReason?: ModelSubscriptionStringInput | null,
  englishLevel?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionExamFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  questionPools?: ModelSubscriptionStringInput | null,
  deadline?: ModelSubscriptionStringInput | null,
  startDate?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExamFilterInput | null > | null,
  or?: Array< ModelSubscriptionExamFilterInput | null > | null,
};

export type ModelSubscriptionExamAttemptFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  examId?: ModelSubscriptionIDInput | null,
  examName?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  userName?: ModelSubscriptionStringInput | null,
  score?: ModelSubscriptionStringInput | null,
  isCompleted?: ModelSubscriptionBooleanInput | null,
  correctAnswers?: ModelSubscriptionIntInput | null,
  totalQuestions?: ModelSubscriptionIntInput | null,
  correctedBy?: ModelSubscriptionStringInput | null,
  externalId?: ModelSubscriptionIDInput | null,
  results?: ModelSubscriptionStringInput | null,
  keys?: ModelSubscriptionStringInput | null,
  teacherComments?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionExamAttemptFilterInput | null > | null,
  or?: Array< ModelSubscriptionExamAttemptFilterInput | null > | null,
};

export type ModelSubscriptionLessonPlanFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  title?: ModelSubscriptionStringInput | null,
  date?: ModelSubscriptionStringInput | null,
  uploadedBy?: ModelSubscriptionStringInput | null,
  content?: ModelSubscriptionStringInput | null,
  media?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  externalId?: ModelSubscriptionIDInput | null,
  extraInformation?: ModelSubscriptionStringInput | null,
  link?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionLessonPlanFilterInput | null > | null,
  or?: Array< ModelSubscriptionLessonPlanFilterInput | null > | null,
};

export type ModelSubscriptionPaymentsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  date?: ModelSubscriptionStringInput | null,
  status?: ModelSubscriptionStringInput | null,
  type?: ModelSubscriptionStringInput | null,
  typeId?: ModelSubscriptionIDInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  mpPaymentId?: ModelSubscriptionStringInput | null,
  itemName?: ModelSubscriptionStringInput | null,
  currency?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPaymentsFilterInput | null > | null,
  or?: Array< ModelSubscriptionPaymentsFilterInput | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBookletsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  nameEng?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  descriptionEng?: ModelSubscriptionStringInput | null,
  level?: ModelSubscriptionStringInput | null,
  priceArs?: ModelSubscriptionFloatInput | null,
  priceUsd?: ModelSubscriptionFloatInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  cognitoGroups?: ModelSubscriptionStringInput | null,
  stripePriceId?: ModelSubscriptionStringInput | null,
  stripeSandBoxPriceId?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBookletsFilterInput | null > | null,
  or?: Array< ModelSubscriptionBookletsFilterInput | null > | null,
};

export type ModelSubscriptionPlacementResultsFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  fullName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  level?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  country?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPlacementResultsFilterInput | null > | null,
  or?: Array< ModelSubscriptionPlacementResultsFilterInput | null > | null,
};

export type ModelSubscriptionClassAttendanceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  date?: ModelSubscriptionStringInput | null,
  externalCourseId?: ModelSubscriptionIDInput | null,
  userId?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionClassAttendanceFilterInput | null > | null,
  or?: Array< ModelSubscriptionClassAttendanceFilterInput | null > | null,
};

export type CreateCourseMutationVariables = {
  input: CreateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type CreateCourseMutation = {
  createCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates?: Array< number | null > | null,
    scheduleStartTime?: string | null,
    scheduleEndTime?: string | null,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear?: number | null,
    englishLevel?: EnglishLevel | null,
    type?: CourseType | null,
    isVirtual?: boolean | null,
    zoomMeetingId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCourseMutationVariables = {
  input: UpdateCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type UpdateCourseMutation = {
  updateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates?: Array< number | null > | null,
    scheduleStartTime?: string | null,
    scheduleEndTime?: string | null,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear?: number | null,
    englishLevel?: EnglishLevel | null,
    type?: CourseType | null,
    isVirtual?: boolean | null,
    zoomMeetingId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCourseMutationVariables = {
  input: DeleteCourseInput,
  condition?: ModelCourseConditionInput | null,
};

export type DeleteCourseMutation = {
  deleteCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates?: Array< number | null > | null,
    scheduleStartTime?: string | null,
    scheduleEndTime?: string | null,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear?: number | null,
    englishLevel?: EnglishLevel | null,
    type?: CourseType | null,
    isVirtual?: boolean | null,
    zoomMeetingId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMediaFolderMutationVariables = {
  input: CreateMediaFolderInput,
  condition?: ModelMediaFolderConditionInput | null,
};

export type CreateMediaFolderMutation = {
  createMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    parentId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateMediaFolderMutationVariables = {
  input: UpdateMediaFolderInput,
  condition?: ModelMediaFolderConditionInput | null,
};

export type UpdateMediaFolderMutation = {
  updateMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    parentId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteMediaFolderMutationVariables = {
  input: DeleteMediaFolderInput,
  condition?: ModelMediaFolderConditionInput | null,
};

export type DeleteMediaFolderMutation = {
  deleteMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    parentId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateMediaMutationVariables = {
  input: CreateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type CreateMediaMutation = {
  createMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    type: MediaType,
    description?: string | null,
    link: string,
    content?: string | null,
    groups: Array< string >,
    uploadedBy: string,
    mimeType?: string | null,
    folderId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateMediaMutationVariables = {
  input: UpdateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type UpdateMediaMutation = {
  updateMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    type: MediaType,
    description?: string | null,
    link: string,
    content?: string | null,
    groups: Array< string >,
    uploadedBy: string,
    mimeType?: string | null,
    folderId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteMediaMutationVariables = {
  input: DeleteMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type DeleteMediaMutation = {
  deleteMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    type: MediaType,
    description?: string | null,
    link: string,
    content?: string | null,
    groups: Array< string >,
    uploadedBy: string,
    mimeType?: string | null,
    folderId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    phone: string,
    cognitoId: string,
    groups: Array< string >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    englishLevel?: EnglishLevel | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    phone: string,
    cognitoId: string,
    groups: Array< string >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    englishLevel?: EnglishLevel | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    phone: string,
    cognitoId: string,
    groups: Array< string >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    englishLevel?: EnglishLevel | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateExamMutationVariables = {
  input: CreateExamInput,
  condition?: ModelExamConditionInput | null,
};

export type CreateExamMutation = {
  createExam?:  {
    __typename: "Exam",
    id: string,
    groups: Array< string >,
    title: string,
    questionPools: string,
    timer:  {
      __typename: "Timer",
      type: string,
      timeInSeconds: number,
      timeGranularity?: TimeGranularity | null,
    },
    deadline?: string | null,
    startDate: string,
    type?: ExamType | null,
    settings?:  {
      __typename: "ExamSettings",
      allowRetake?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateExamMutationVariables = {
  input: UpdateExamInput,
  condition?: ModelExamConditionInput | null,
};

export type UpdateExamMutation = {
  updateExam?:  {
    __typename: "Exam",
    id: string,
    groups: Array< string >,
    title: string,
    questionPools: string,
    timer:  {
      __typename: "Timer",
      type: string,
      timeInSeconds: number,
      timeGranularity?: TimeGranularity | null,
    },
    deadline?: string | null,
    startDate: string,
    type?: ExamType | null,
    settings?:  {
      __typename: "ExamSettings",
      allowRetake?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteExamMutationVariables = {
  input: DeleteExamInput,
  condition?: ModelExamConditionInput | null,
};

export type DeleteExamMutation = {
  deleteExam?:  {
    __typename: "Exam",
    id: string,
    groups: Array< string >,
    title: string,
    questionPools: string,
    timer:  {
      __typename: "Timer",
      type: string,
      timeInSeconds: number,
      timeGranularity?: TimeGranularity | null,
    },
    deadline?: string | null,
    startDate: string,
    type?: ExamType | null,
    settings?:  {
      __typename: "ExamSettings",
      allowRetake?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateExamAttemptMutationVariables = {
  input: CreateExamAttemptInput,
  condition?: ModelExamAttemptConditionInput | null,
};

export type CreateExamAttemptMutation = {
  createExamAttempt?:  {
    __typename: "ExamAttempt",
    id: string,
    examId: string,
    examName: string,
    userId: string,
    userName?: string | null,
    score?: string | null,
    isCompleted?: boolean | null,
    correctAnswers?: number | null,
    totalQuestions?: number | null,
    correctedBy?: string | null,
    externalId: string,
    results?: string | null,
    keys?: string | null,
    teacherComments?: string | null,
    type?: ExamType | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateExamAttemptMutationVariables = {
  input: UpdateExamAttemptInput,
  condition?: ModelExamAttemptConditionInput | null,
};

export type UpdateExamAttemptMutation = {
  updateExamAttempt?:  {
    __typename: "ExamAttempt",
    id: string,
    examId: string,
    examName: string,
    userId: string,
    userName?: string | null,
    score?: string | null,
    isCompleted?: boolean | null,
    correctAnswers?: number | null,
    totalQuestions?: number | null,
    correctedBy?: string | null,
    externalId: string,
    results?: string | null,
    keys?: string | null,
    teacherComments?: string | null,
    type?: ExamType | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteExamAttemptMutationVariables = {
  input: DeleteExamAttemptInput,
  condition?: ModelExamAttemptConditionInput | null,
};

export type DeleteExamAttemptMutation = {
  deleteExamAttempt?:  {
    __typename: "ExamAttempt",
    id: string,
    examId: string,
    examName: string,
    userId: string,
    userName?: string | null,
    score?: string | null,
    isCompleted?: boolean | null,
    correctAnswers?: number | null,
    totalQuestions?: number | null,
    correctedBy?: string | null,
    externalId: string,
    results?: string | null,
    keys?: string | null,
    teacherComments?: string | null,
    type?: ExamType | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateLessonPlanMutationVariables = {
  input: CreateLessonPlanInput,
  condition?: ModelLessonPlanConditionInput | null,
};

export type CreateLessonPlanMutation = {
  createLessonPlan?:  {
    __typename: "LessonPlan",
    id: string,
    groups: Array< string >,
    title: string,
    date: string,
    uploadedBy: string,
    content?: string | null,
    media?: string | null,
    type?: LessonPlanningType | null,
    externalId: string,
    extraInformation?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateLessonPlanMutationVariables = {
  input: UpdateLessonPlanInput,
  condition?: ModelLessonPlanConditionInput | null,
};

export type UpdateLessonPlanMutation = {
  updateLessonPlan?:  {
    __typename: "LessonPlan",
    id: string,
    groups: Array< string >,
    title: string,
    date: string,
    uploadedBy: string,
    content?: string | null,
    media?: string | null,
    type?: LessonPlanningType | null,
    externalId: string,
    extraInformation?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteLessonPlanMutationVariables = {
  input: DeleteLessonPlanInput,
  condition?: ModelLessonPlanConditionInput | null,
};

export type DeleteLessonPlanMutation = {
  deleteLessonPlan?:  {
    __typename: "LessonPlan",
    id: string,
    groups: Array< string >,
    title: string,
    date: string,
    uploadedBy: string,
    content?: string | null,
    media?: string | null,
    type?: LessonPlanningType | null,
    externalId: string,
    extraInformation?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreatePaymentsMutationVariables = {
  input: CreatePaymentsInput,
  condition?: ModelPaymentsConditionInput | null,
};

export type CreatePaymentsMutation = {
  createPayments?:  {
    __typename: "Payments",
    id: string,
    userId: string,
    date: string,
    status: PaymentStatus,
    type: PaymentType,
    typeId: string,
    amount: number,
    mpPaymentId: string,
    itemName: string,
    currency: PaymentCurrency,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePaymentsMutationVariables = {
  input: UpdatePaymentsInput,
  condition?: ModelPaymentsConditionInput | null,
};

export type UpdatePaymentsMutation = {
  updatePayments?:  {
    __typename: "Payments",
    id: string,
    userId: string,
    date: string,
    status: PaymentStatus,
    type: PaymentType,
    typeId: string,
    amount: number,
    mpPaymentId: string,
    itemName: string,
    currency: PaymentCurrency,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePaymentsMutationVariables = {
  input: DeletePaymentsInput,
  condition?: ModelPaymentsConditionInput | null,
};

export type DeletePaymentsMutation = {
  deletePayments?:  {
    __typename: "Payments",
    id: string,
    userId: string,
    date: string,
    status: PaymentStatus,
    type: PaymentType,
    typeId: string,
    amount: number,
    mpPaymentId: string,
    itemName: string,
    currency: PaymentCurrency,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateBookletsMutationVariables = {
  input: CreateBookletsInput,
  condition?: ModelBookletsConditionInput | null,
};

export type CreateBookletsMutation = {
  createBooklets?:  {
    __typename: "Booklets",
    id: string,
    name: string,
    nameEng: string,
    description?: string | null,
    descriptionEng?: string | null,
    level: EnglishLevel,
    priceArs: number,
    priceUsd: number,
    isActive?: boolean | null,
    cognitoGroups?: Array< string > | null,
    stripePriceId: string,
    stripeSandBoxPriceId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateBookletsMutationVariables = {
  input: UpdateBookletsInput,
  condition?: ModelBookletsConditionInput | null,
};

export type UpdateBookletsMutation = {
  updateBooklets?:  {
    __typename: "Booklets",
    id: string,
    name: string,
    nameEng: string,
    description?: string | null,
    descriptionEng?: string | null,
    level: EnglishLevel,
    priceArs: number,
    priceUsd: number,
    isActive?: boolean | null,
    cognitoGroups?: Array< string > | null,
    stripePriceId: string,
    stripeSandBoxPriceId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteBookletsMutationVariables = {
  input: DeleteBookletsInput,
  condition?: ModelBookletsConditionInput | null,
};

export type DeleteBookletsMutation = {
  deleteBooklets?:  {
    __typename: "Booklets",
    id: string,
    name: string,
    nameEng: string,
    description?: string | null,
    descriptionEng?: string | null,
    level: EnglishLevel,
    priceArs: number,
    priceUsd: number,
    isActive?: boolean | null,
    cognitoGroups?: Array< string > | null,
    stripePriceId: string,
    stripeSandBoxPriceId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreatePlacementResultsMutationVariables = {
  input: CreatePlacementResultsInput,
  condition?: ModelPlacementResultsConditionInput | null,
};

export type CreatePlacementResultsMutation = {
  createPlacementResults?:  {
    __typename: "PlacementResults",
    id: string,
    fullName: string,
    email: string,
    level: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePlacementResultsMutationVariables = {
  input: UpdatePlacementResultsInput,
  condition?: ModelPlacementResultsConditionInput | null,
};

export type UpdatePlacementResultsMutation = {
  updatePlacementResults?:  {
    __typename: "PlacementResults",
    id: string,
    fullName: string,
    email: string,
    level: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePlacementResultsMutationVariables = {
  input: DeletePlacementResultsInput,
  condition?: ModelPlacementResultsConditionInput | null,
};

export type DeletePlacementResultsMutation = {
  deletePlacementResults?:  {
    __typename: "PlacementResults",
    id: string,
    fullName: string,
    email: string,
    level: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateClassAttendanceMutationVariables = {
  input: CreateClassAttendanceInput,
  condition?: ModelClassAttendanceConditionInput | null,
};

export type CreateClassAttendanceMutation = {
  createClassAttendance?:  {
    __typename: "ClassAttendance",
    id: string,
    date: string,
    externalCourseId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateClassAttendanceMutationVariables = {
  input: UpdateClassAttendanceInput,
  condition?: ModelClassAttendanceConditionInput | null,
};

export type UpdateClassAttendanceMutation = {
  updateClassAttendance?:  {
    __typename: "ClassAttendance",
    id: string,
    date: string,
    externalCourseId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteClassAttendanceMutationVariables = {
  input: DeleteClassAttendanceInput,
  condition?: ModelClassAttendanceConditionInput | null,
};

export type DeleteClassAttendanceMutation = {
  deleteClassAttendance?:  {
    __typename: "ClassAttendance",
    id: string,
    date: string,
    externalCourseId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCourseQueryVariables = {
  id: string,
};

export type GetCourseQuery = {
  getCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates?: Array< number | null > | null,
    scheduleStartTime?: string | null,
    scheduleEndTime?: string | null,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear?: number | null,
    englishLevel?: EnglishLevel | null,
    type?: CourseType | null,
    isVirtual?: boolean | null,
    zoomMeetingId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCoursesQueryVariables = {
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCoursesQuery = {
  listCourses?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      id: string,
      name: string,
      scheduleDates?: Array< number | null > | null,
      scheduleStartTime?: string | null,
      scheduleEndTime?: string | null,
      virtualClassLink?: string | null,
      isActive?: boolean | null,
      externalId: string,
      scheduleYear?: number | null,
      englishLevel?: EnglishLevel | null,
      type?: CourseType | null,
      isVirtual?: boolean | null,
      zoomMeetingId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMediaFolderQueryVariables = {
  id: string,
};

export type GetMediaFolderQuery = {
  getMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    parentId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListMediaFoldersQueryVariables = {
  filter?: ModelMediaFolderFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMediaFoldersQuery = {
  listMediaFolders?:  {
    __typename: "ModelMediaFolderConnection",
    items:  Array< {
      __typename: "MediaFolder",
      id: string,
      name: string,
      groups: Array< string >,
      parentId?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetMediaQueryVariables = {
  id: string,
};

export type GetMediaQuery = {
  getMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    type: MediaType,
    description?: string | null,
    link: string,
    content?: string | null,
    groups: Array< string >,
    uploadedBy: string,
    mimeType?: string | null,
    folderId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListMediaQueryVariables = {
  filter?: ModelMediaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMediaQuery = {
  listMedia?:  {
    __typename: "ModelMediaConnection",
    items:  Array< {
      __typename: "Media",
      id: string,
      title: string,
      type: MediaType,
      description?: string | null,
      link: string,
      content?: string | null,
      groups: Array< string >,
      uploadedBy: string,
      mimeType?: string | null,
      folderId?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    phone: string,
    cognitoId: string,
    groups: Array< string >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    englishLevel?: EnglishLevel | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      phone: string,
      cognitoId: string,
      groups: Array< string >,
      isDisabledUser?: boolean | null,
      disabledReason?: DisabledAccountReasons | null,
      englishLevel?: EnglishLevel | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetExamQueryVariables = {
  id: string,
};

export type GetExamQuery = {
  getExam?:  {
    __typename: "Exam",
    id: string,
    groups: Array< string >,
    title: string,
    questionPools: string,
    timer:  {
      __typename: "Timer",
      type: string,
      timeInSeconds: number,
      timeGranularity?: TimeGranularity | null,
    },
    deadline?: string | null,
    startDate: string,
    type?: ExamType | null,
    settings?:  {
      __typename: "ExamSettings",
      allowRetake?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListExamsQueryVariables = {
  filter?: ModelExamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExamsQuery = {
  listExams?:  {
    __typename: "ModelExamConnection",
    items:  Array< {
      __typename: "Exam",
      id: string,
      groups: Array< string >,
      title: string,
      questionPools: string,
      deadline?: string | null,
      startDate: string,
      type?: ExamType | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetExamAttemptQueryVariables = {
  id: string,
};

export type GetExamAttemptQuery = {
  getExamAttempt?:  {
    __typename: "ExamAttempt",
    id: string,
    examId: string,
    examName: string,
    userId: string,
    userName?: string | null,
    score?: string | null,
    isCompleted?: boolean | null,
    correctAnswers?: number | null,
    totalQuestions?: number | null,
    correctedBy?: string | null,
    externalId: string,
    results?: string | null,
    keys?: string | null,
    teacherComments?: string | null,
    type?: ExamType | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListExamAttemptsQueryVariables = {
  filter?: ModelExamAttemptFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListExamAttemptsQuery = {
  listExamAttempts?:  {
    __typename: "ModelExamAttemptConnection",
    items:  Array< {
      __typename: "ExamAttempt",
      id: string,
      examId: string,
      examName: string,
      userId: string,
      userName?: string | null,
      score?: string | null,
      isCompleted?: boolean | null,
      correctAnswers?: number | null,
      totalQuestions?: number | null,
      correctedBy?: string | null,
      externalId: string,
      results?: string | null,
      keys?: string | null,
      teacherComments?: string | null,
      type?: ExamType | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetLessonPlanQueryVariables = {
  id: string,
};

export type GetLessonPlanQuery = {
  getLessonPlan?:  {
    __typename: "LessonPlan",
    id: string,
    groups: Array< string >,
    title: string,
    date: string,
    uploadedBy: string,
    content?: string | null,
    media?: string | null,
    type?: LessonPlanningType | null,
    externalId: string,
    extraInformation?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListLessonPlansQueryVariables = {
  filter?: ModelLessonPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLessonPlansQuery = {
  listLessonPlans?:  {
    __typename: "ModelLessonPlanConnection",
    items:  Array< {
      __typename: "LessonPlan",
      id: string,
      groups: Array< string >,
      title: string,
      date: string,
      uploadedBy: string,
      content?: string | null,
      media?: string | null,
      type?: LessonPlanningType | null,
      externalId: string,
      extraInformation?: string | null,
      link?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPaymentsQueryVariables = {
  id: string,
};

export type GetPaymentsQuery = {
  getPayments?:  {
    __typename: "Payments",
    id: string,
    userId: string,
    date: string,
    status: PaymentStatus,
    type: PaymentType,
    typeId: string,
    amount: number,
    mpPaymentId: string,
    itemName: string,
    currency: PaymentCurrency,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPaymentsQueryVariables = {
  filter?: ModelPaymentsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPaymentsQuery = {
  listPayments?:  {
    __typename: "ModelPaymentsConnection",
    items:  Array< {
      __typename: "Payments",
      id: string,
      userId: string,
      date: string,
      status: PaymentStatus,
      type: PaymentType,
      typeId: string,
      amount: number,
      mpPaymentId: string,
      itemName: string,
      currency: PaymentCurrency,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetBookletsQueryVariables = {
  id: string,
};

export type GetBookletsQuery = {
  getBooklets?:  {
    __typename: "Booklets",
    id: string,
    name: string,
    nameEng: string,
    description?: string | null,
    descriptionEng?: string | null,
    level: EnglishLevel,
    priceArs: number,
    priceUsd: number,
    isActive?: boolean | null,
    cognitoGroups?: Array< string > | null,
    stripePriceId: string,
    stripeSandBoxPriceId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListBookletsQueryVariables = {
  filter?: ModelBookletsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListBookletsQuery = {
  listBooklets?:  {
    __typename: "ModelBookletsConnection",
    items:  Array< {
      __typename: "Booklets",
      id: string,
      name: string,
      nameEng: string,
      description?: string | null,
      descriptionEng?: string | null,
      level: EnglishLevel,
      priceArs: number,
      priceUsd: number,
      isActive?: boolean | null,
      cognitoGroups?: Array< string > | null,
      stripePriceId: string,
      stripeSandBoxPriceId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPlacementResultsQueryVariables = {
  id: string,
};

export type GetPlacementResultsQuery = {
  getPlacementResults?:  {
    __typename: "PlacementResults",
    id: string,
    fullName: string,
    email: string,
    level: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPlacementResultsQueryVariables = {
  filter?: ModelPlacementResultsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPlacementResultsQuery = {
  listPlacementResults?:  {
    __typename: "ModelPlacementResultsConnection",
    items:  Array< {
      __typename: "PlacementResults",
      id: string,
      fullName: string,
      email: string,
      level: string,
      phone: string,
      country: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetClassAttendanceQueryVariables = {
  id: string,
};

export type GetClassAttendanceQuery = {
  getClassAttendance?:  {
    __typename: "ClassAttendance",
    id: string,
    date: string,
    externalCourseId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListClassAttendancesQueryVariables = {
  filter?: ModelClassAttendanceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListClassAttendancesQuery = {
  listClassAttendances?:  {
    __typename: "ModelClassAttendanceConnection",
    items:  Array< {
      __typename: "ClassAttendance",
      id: string,
      date: string,
      externalCourseId: string,
      userId: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CourseByExternalIdQueryVariables = {
  externalId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCourseFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CourseByExternalIdQuery = {
  courseByExternalId?:  {
    __typename: "ModelCourseConnection",
    items:  Array< {
      __typename: "Course",
      id: string,
      name: string,
      scheduleDates?: Array< number | null > | null,
      scheduleStartTime?: string | null,
      scheduleEndTime?: string | null,
      virtualClassLink?: string | null,
      isActive?: boolean | null,
      externalId: string,
      scheduleYear?: number | null,
      englishLevel?: EnglishLevel | null,
      type?: CourseType | null,
      isVirtual?: boolean | null,
      zoomMeetingId?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ExamAttemptByExternalIdQueryVariables = {
  externalId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelExamAttemptFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ExamAttemptByExternalIdQuery = {
  examAttemptByExternalId?:  {
    __typename: "ModelExamAttemptConnection",
    items:  Array< {
      __typename: "ExamAttempt",
      id: string,
      examId: string,
      examName: string,
      userId: string,
      userName?: string | null,
      score?: string | null,
      isCompleted?: boolean | null,
      correctAnswers?: number | null,
      totalQuestions?: number | null,
      correctedBy?: string | null,
      externalId: string,
      results?: string | null,
      keys?: string | null,
      teacherComments?: string | null,
      type?: ExamType | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type LessonPlanByExternalIdQueryVariables = {
  externalId: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelLessonPlanFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type LessonPlanByExternalIdQuery = {
  lessonPlanByExternalId?:  {
    __typename: "ModelLessonPlanConnection",
    items:  Array< {
      __typename: "LessonPlan",
      id: string,
      groups: Array< string >,
      title: string,
      date: string,
      uploadedBy: string,
      content?: string | null,
      media?: string | null,
      type?: LessonPlanningType | null,
      externalId: string,
      extraInformation?: string | null,
      link?: string | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnCreateCourseSubscription = {
  onCreateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates?: Array< number | null > | null,
    scheduleStartTime?: string | null,
    scheduleEndTime?: string | null,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear?: number | null,
    englishLevel?: EnglishLevel | null,
    type?: CourseType | null,
    isVirtual?: boolean | null,
    zoomMeetingId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnUpdateCourseSubscription = {
  onUpdateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates?: Array< number | null > | null,
    scheduleStartTime?: string | null,
    scheduleEndTime?: string | null,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear?: number | null,
    englishLevel?: EnglishLevel | null,
    type?: CourseType | null,
    isVirtual?: boolean | null,
    zoomMeetingId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCourseSubscriptionVariables = {
  filter?: ModelSubscriptionCourseFilterInput | null,
};

export type OnDeleteCourseSubscription = {
  onDeleteCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates?: Array< number | null > | null,
    scheduleStartTime?: string | null,
    scheduleEndTime?: string | null,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear?: number | null,
    englishLevel?: EnglishLevel | null,
    type?: CourseType | null,
    isVirtual?: boolean | null,
    zoomMeetingId?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMediaFolderSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFolderFilterInput | null,
  owner?: string | null,
};

export type OnCreateMediaFolderSubscription = {
  onCreateMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    parentId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMediaFolderSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFolderFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMediaFolderSubscription = {
  onUpdateMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    parentId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMediaFolderSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFolderFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMediaFolderSubscription = {
  onDeleteMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    parentId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
  owner?: string | null,
};

export type OnCreateMediaSubscription = {
  onCreateMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    type: MediaType,
    description?: string | null,
    link: string,
    content?: string | null,
    groups: Array< string >,
    uploadedBy: string,
    mimeType?: string | null,
    folderId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMediaSubscription = {
  onUpdateMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    type: MediaType,
    description?: string | null,
    link: string,
    content?: string | null,
    groups: Array< string >,
    uploadedBy: string,
    mimeType?: string | null,
    folderId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMediaSubscriptionVariables = {
  filter?: ModelSubscriptionMediaFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMediaSubscription = {
  onDeleteMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    type: MediaType,
    description?: string | null,
    link: string,
    content?: string | null,
    groups: Array< string >,
    uploadedBy: string,
    mimeType?: string | null,
    folderId?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    phone: string,
    cognitoId: string,
    groups: Array< string >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    englishLevel?: EnglishLevel | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    phone: string,
    cognitoId: string,
    groups: Array< string >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    englishLevel?: EnglishLevel | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    name: string,
    email: string,
    phone: string,
    cognitoId: string,
    groups: Array< string >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    englishLevel?: EnglishLevel | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateExamSubscriptionVariables = {
  filter?: ModelSubscriptionExamFilterInput | null,
  owner?: string | null,
};

export type OnCreateExamSubscription = {
  onCreateExam?:  {
    __typename: "Exam",
    id: string,
    groups: Array< string >,
    title: string,
    questionPools: string,
    timer:  {
      __typename: "Timer",
      type: string,
      timeInSeconds: number,
      timeGranularity?: TimeGranularity | null,
    },
    deadline?: string | null,
    startDate: string,
    type?: ExamType | null,
    settings?:  {
      __typename: "ExamSettings",
      allowRetake?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateExamSubscriptionVariables = {
  filter?: ModelSubscriptionExamFilterInput | null,
  owner?: string | null,
};

export type OnUpdateExamSubscription = {
  onUpdateExam?:  {
    __typename: "Exam",
    id: string,
    groups: Array< string >,
    title: string,
    questionPools: string,
    timer:  {
      __typename: "Timer",
      type: string,
      timeInSeconds: number,
      timeGranularity?: TimeGranularity | null,
    },
    deadline?: string | null,
    startDate: string,
    type?: ExamType | null,
    settings?:  {
      __typename: "ExamSettings",
      allowRetake?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteExamSubscriptionVariables = {
  filter?: ModelSubscriptionExamFilterInput | null,
  owner?: string | null,
};

export type OnDeleteExamSubscription = {
  onDeleteExam?:  {
    __typename: "Exam",
    id: string,
    groups: Array< string >,
    title: string,
    questionPools: string,
    timer:  {
      __typename: "Timer",
      type: string,
      timeInSeconds: number,
      timeGranularity?: TimeGranularity | null,
    },
    deadline?: string | null,
    startDate: string,
    type?: ExamType | null,
    settings?:  {
      __typename: "ExamSettings",
      allowRetake?: boolean | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateExamAttemptSubscriptionVariables = {
  filter?: ModelSubscriptionExamAttemptFilterInput | null,
  owner?: string | null,
};

export type OnCreateExamAttemptSubscription = {
  onCreateExamAttempt?:  {
    __typename: "ExamAttempt",
    id: string,
    examId: string,
    examName: string,
    userId: string,
    userName?: string | null,
    score?: string | null,
    isCompleted?: boolean | null,
    correctAnswers?: number | null,
    totalQuestions?: number | null,
    correctedBy?: string | null,
    externalId: string,
    results?: string | null,
    keys?: string | null,
    teacherComments?: string | null,
    type?: ExamType | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateExamAttemptSubscriptionVariables = {
  filter?: ModelSubscriptionExamAttemptFilterInput | null,
  owner?: string | null,
};

export type OnUpdateExamAttemptSubscription = {
  onUpdateExamAttempt?:  {
    __typename: "ExamAttempt",
    id: string,
    examId: string,
    examName: string,
    userId: string,
    userName?: string | null,
    score?: string | null,
    isCompleted?: boolean | null,
    correctAnswers?: number | null,
    totalQuestions?: number | null,
    correctedBy?: string | null,
    externalId: string,
    results?: string | null,
    keys?: string | null,
    teacherComments?: string | null,
    type?: ExamType | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteExamAttemptSubscriptionVariables = {
  filter?: ModelSubscriptionExamAttemptFilterInput | null,
  owner?: string | null,
};

export type OnDeleteExamAttemptSubscription = {
  onDeleteExamAttempt?:  {
    __typename: "ExamAttempt",
    id: string,
    examId: string,
    examName: string,
    userId: string,
    userName?: string | null,
    score?: string | null,
    isCompleted?: boolean | null,
    correctAnswers?: number | null,
    totalQuestions?: number | null,
    correctedBy?: string | null,
    externalId: string,
    results?: string | null,
    keys?: string | null,
    teacherComments?: string | null,
    type?: ExamType | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateLessonPlanSubscriptionVariables = {
  filter?: ModelSubscriptionLessonPlanFilterInput | null,
  owner?: string | null,
};

export type OnCreateLessonPlanSubscription = {
  onCreateLessonPlan?:  {
    __typename: "LessonPlan",
    id: string,
    groups: Array< string >,
    title: string,
    date: string,
    uploadedBy: string,
    content?: string | null,
    media?: string | null,
    type?: LessonPlanningType | null,
    externalId: string,
    extraInformation?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateLessonPlanSubscriptionVariables = {
  filter?: ModelSubscriptionLessonPlanFilterInput | null,
  owner?: string | null,
};

export type OnUpdateLessonPlanSubscription = {
  onUpdateLessonPlan?:  {
    __typename: "LessonPlan",
    id: string,
    groups: Array< string >,
    title: string,
    date: string,
    uploadedBy: string,
    content?: string | null,
    media?: string | null,
    type?: LessonPlanningType | null,
    externalId: string,
    extraInformation?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteLessonPlanSubscriptionVariables = {
  filter?: ModelSubscriptionLessonPlanFilterInput | null,
  owner?: string | null,
};

export type OnDeleteLessonPlanSubscription = {
  onDeleteLessonPlan?:  {
    __typename: "LessonPlan",
    id: string,
    groups: Array< string >,
    title: string,
    date: string,
    uploadedBy: string,
    content?: string | null,
    media?: string | null,
    type?: LessonPlanningType | null,
    externalId: string,
    extraInformation?: string | null,
    link?: string | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePaymentsSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentsFilterInput | null,
};

export type OnCreatePaymentsSubscription = {
  onCreatePayments?:  {
    __typename: "Payments",
    id: string,
    userId: string,
    date: string,
    status: PaymentStatus,
    type: PaymentType,
    typeId: string,
    amount: number,
    mpPaymentId: string,
    itemName: string,
    currency: PaymentCurrency,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePaymentsSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentsFilterInput | null,
};

export type OnUpdatePaymentsSubscription = {
  onUpdatePayments?:  {
    __typename: "Payments",
    id: string,
    userId: string,
    date: string,
    status: PaymentStatus,
    type: PaymentType,
    typeId: string,
    amount: number,
    mpPaymentId: string,
    itemName: string,
    currency: PaymentCurrency,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePaymentsSubscriptionVariables = {
  filter?: ModelSubscriptionPaymentsFilterInput | null,
};

export type OnDeletePaymentsSubscription = {
  onDeletePayments?:  {
    __typename: "Payments",
    id: string,
    userId: string,
    date: string,
    status: PaymentStatus,
    type: PaymentType,
    typeId: string,
    amount: number,
    mpPaymentId: string,
    itemName: string,
    currency: PaymentCurrency,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateBookletsSubscriptionVariables = {
  filter?: ModelSubscriptionBookletsFilterInput | null,
};

export type OnCreateBookletsSubscription = {
  onCreateBooklets?:  {
    __typename: "Booklets",
    id: string,
    name: string,
    nameEng: string,
    description?: string | null,
    descriptionEng?: string | null,
    level: EnglishLevel,
    priceArs: number,
    priceUsd: number,
    isActive?: boolean | null,
    cognitoGroups?: Array< string > | null,
    stripePriceId: string,
    stripeSandBoxPriceId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateBookletsSubscriptionVariables = {
  filter?: ModelSubscriptionBookletsFilterInput | null,
};

export type OnUpdateBookletsSubscription = {
  onUpdateBooklets?:  {
    __typename: "Booklets",
    id: string,
    name: string,
    nameEng: string,
    description?: string | null,
    descriptionEng?: string | null,
    level: EnglishLevel,
    priceArs: number,
    priceUsd: number,
    isActive?: boolean | null,
    cognitoGroups?: Array< string > | null,
    stripePriceId: string,
    stripeSandBoxPriceId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteBookletsSubscriptionVariables = {
  filter?: ModelSubscriptionBookletsFilterInput | null,
};

export type OnDeleteBookletsSubscription = {
  onDeleteBooklets?:  {
    __typename: "Booklets",
    id: string,
    name: string,
    nameEng: string,
    description?: string | null,
    descriptionEng?: string | null,
    level: EnglishLevel,
    priceArs: number,
    priceUsd: number,
    isActive?: boolean | null,
    cognitoGroups?: Array< string > | null,
    stripePriceId: string,
    stripeSandBoxPriceId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreatePlacementResultsSubscriptionVariables = {
  filter?: ModelSubscriptionPlacementResultsFilterInput | null,
};

export type OnCreatePlacementResultsSubscription = {
  onCreatePlacementResults?:  {
    __typename: "PlacementResults",
    id: string,
    fullName: string,
    email: string,
    level: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePlacementResultsSubscriptionVariables = {
  filter?: ModelSubscriptionPlacementResultsFilterInput | null,
};

export type OnUpdatePlacementResultsSubscription = {
  onUpdatePlacementResults?:  {
    __typename: "PlacementResults",
    id: string,
    fullName: string,
    email: string,
    level: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePlacementResultsSubscriptionVariables = {
  filter?: ModelSubscriptionPlacementResultsFilterInput | null,
};

export type OnDeletePlacementResultsSubscription = {
  onDeletePlacementResults?:  {
    __typename: "PlacementResults",
    id: string,
    fullName: string,
    email: string,
    level: string,
    phone: string,
    country: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateClassAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionClassAttendanceFilterInput | null,
};

export type OnCreateClassAttendanceSubscription = {
  onCreateClassAttendance?:  {
    __typename: "ClassAttendance",
    id: string,
    date: string,
    externalCourseId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateClassAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionClassAttendanceFilterInput | null,
};

export type OnUpdateClassAttendanceSubscription = {
  onUpdateClassAttendance?:  {
    __typename: "ClassAttendance",
    id: string,
    date: string,
    externalCourseId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteClassAttendanceSubscriptionVariables = {
  filter?: ModelSubscriptionClassAttendanceFilterInput | null,
};

export type OnDeleteClassAttendanceSubscription = {
  onDeleteClassAttendance?:  {
    __typename: "ClassAttendance",
    id: string,
    date: string,
    externalCourseId: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
