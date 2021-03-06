/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCourseInput = {
  id?: string | null,
  name: string,
  scheduleDates: Array< number | null >,
  scheduleStartTime: string,
  scheduleEndTime: string,
  virtualClassLink?: string | null,
  isActive?: boolean | null,
  externalId: string,
  scheduleYear: number,
};

export type ModelCourseConditionInput = {
  name?: ModelStringInput | null,
  scheduleDates?: ModelIntInput | null,
  scheduleStartTime?: ModelStringInput | null,
  scheduleEndTime?: ModelStringInput | null,
  virtualClassLink?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  externalId?: ModelStringInput | null,
  scheduleYear?: ModelIntInput | null,
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

export type Course = {
  __typename: "Course",
  id: string,
  name: string,
  scheduleDates: Array< number | null >,
  scheduleStartTime: string,
  scheduleEndTime: string,
  virtualClassLink?: string | null,
  isActive?: boolean | null,
  externalId: string,
  scheduleYear: number,
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
};

export type DeleteCourseInput = {
  id: string,
};

export type CreateMediaFolderInput = {
  id?: string | null,
  name: string,
  groups: Array< string >,
};

export type ModelMediaFolderConditionInput = {
  name?: ModelStringInput | null,
  groups?: ModelStringInput | null,
  and?: Array< ModelMediaFolderConditionInput | null > | null,
  or?: Array< ModelMediaFolderConditionInput | null > | null,
  not?: ModelMediaFolderConditionInput | null,
};

export type MediaFolder = {
  __typename: "MediaFolder",
  id: string,
  name: string,
  groups: Array< string >,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateMediaFolderInput = {
  id: string,
  name?: string | null,
  groups?: Array< string > | null,
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
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
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
};

export type DeleteUserInput = {
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
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
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
    scheduleDates: Array< number | null >,
    scheduleStartTime: string,
    scheduleEndTime: string,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear: number,
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
    scheduleDates: Array< number | null >,
    scheduleStartTime: string,
    scheduleEndTime: string,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear: number,
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
    scheduleDates: Array< number | null >,
    scheduleStartTime: string,
    scheduleEndTime: string,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear: number,
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
    scheduleDates: Array< number | null >,
    scheduleStartTime: string,
    scheduleEndTime: string,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear: number,
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
      scheduleDates: Array< number | null >,
      scheduleStartTime: string,
      scheduleEndTime: string,
      virtualClassLink?: string | null,
      isActive?: boolean | null,
      externalId: string,
      scheduleYear: number,
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
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCourseSubscription = {
  onCreateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates: Array< number | null >,
    scheduleStartTime: string,
    scheduleEndTime: string,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCourseSubscription = {
  onUpdateCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates: Array< number | null >,
    scheduleStartTime: string,
    scheduleEndTime: string,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCourseSubscription = {
  onDeleteCourse?:  {
    __typename: "Course",
    id: string,
    name: string,
    scheduleDates: Array< number | null >,
    scheduleStartTime: string,
    scheduleEndTime: string,
    virtualClassLink?: string | null,
    isActive?: boolean | null,
    externalId: string,
    scheduleYear: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMediaFolderSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateMediaFolderSubscription = {
  onCreateMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateMediaFolderSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateMediaFolderSubscription = {
  onUpdateMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteMediaFolderSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteMediaFolderSubscription = {
  onDeleteMediaFolder?:  {
    __typename: "MediaFolder",
    id: string,
    name: string,
    groups: Array< string >,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateMediaSubscriptionVariables = {
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
    createdAt: string,
    updatedAt: string,
  } | null,
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
    createdAt: string,
    updatedAt: string,
  } | null,
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
    createdAt: string,
    updatedAt: string,
  } | null,
};
