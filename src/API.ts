/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCourseInput = {
  id?: string | null;
  name: string;
  scheduleDates: Array<string | null>;
  scheduleStartTime: string;
  scheduleEndTime: string;
  virtualClassLink?: string | null;
};

export type ModelCourseConditionInput = {
  name?: ModelStringInput | null;
  scheduleDates?: ModelStringInput | null;
  scheduleStartTime?: ModelStringInput | null;
  scheduleEndTime?: ModelStringInput | null;
  virtualClassLink?: ModelStringInput | null;
  and?: Array<ModelCourseConditionInput | null> | null;
  or?: Array<ModelCourseConditionInput | null> | null;
  not?: ModelCourseConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
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
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Course = {
  __typename: "Course";
  id: string;
  name: string;
  scheduleDates: Array<string | null>;
  scheduleStartTime: string;
  scheduleEndTime: string;
  virtualClassLink?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UpdateCourseInput = {
  id: string;
  name?: string | null;
  scheduleDates?: Array<string | null> | null;
  scheduleStartTime?: string | null;
  scheduleEndTime?: string | null;
  virtualClassLink?: string | null;
};

export type DeleteCourseInput = {
  id: string;
};

export type CreateMediaInput = {
  id?: string | null;
  title: string;
  type: MediaType;
  description?: string | null;
  link: string;
  content?: string | null;
  groups?: Array<string | null> | null;
};

export enum MediaType {
  LINK = "LINK",
  PDF = "PDF",
  VIDEO = "VIDEO",
}

export type ModelMediaConditionInput = {
  title?: ModelStringInput | null;
  type?: ModelMediaTypeInput | null;
  description?: ModelStringInput | null;
  link?: ModelStringInput | null;
  content?: ModelStringInput | null;
  groups?: ModelStringInput | null;
  and?: Array<ModelMediaConditionInput | null> | null;
  or?: Array<ModelMediaConditionInput | null> | null;
  not?: ModelMediaConditionInput | null;
};

export type ModelMediaTypeInput = {
  eq?: MediaType | null;
  ne?: MediaType | null;
};

export type Media = {
  __typename: "Media";
  id: string;
  title: string;
  type: MediaType;
  description?: string | null;
  link: string;
  content?: string | null;
  groups?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  owner?: string | null;
};

export type UpdateMediaInput = {
  id: string;
  title?: string | null;
  type?: MediaType | null;
  description?: string | null;
  link?: string | null;
  content?: string | null;
  groups?: Array<string | null> | null;
};

export type DeleteMediaInput = {
  id: string;
};

export type CreateDynamoDBUserInput = {
  id?: string | null;
  name: string;
  email: string;
  phone?: number | null;
  cognitoId: string;
  groups: Array<string | null>;
};

export type ModelDynamoDBUserConditionInput = {
  name?: ModelStringInput | null;
  email?: ModelStringInput | null;
  phone?: ModelIntInput | null;
  cognitoId?: ModelIDInput | null;
  groups?: ModelStringInput | null;
  and?: Array<ModelDynamoDBUserConditionInput | null> | null;
  or?: Array<ModelDynamoDBUserConditionInput | null> | null;
  not?: ModelDynamoDBUserConditionInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type DynamoDBUser = {
  __typename: "DynamoDBUser";
  id: string;
  name: string;
  email: string;
  phone?: number | null;
  cognitoId: string;
  groups: Array<string | null>;
  createdAt: string;
  updatedAt: string;
};

export type UpdateDynamoDBUserInput = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: number | null;
  cognitoId?: string | null;
  groups?: Array<string | null> | null;
};

export type DeleteDynamoDBUserInput = {
  id: string;
};

export type ModelCourseFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  scheduleDates?: ModelStringInput | null;
  scheduleStartTime?: ModelStringInput | null;
  scheduleEndTime?: ModelStringInput | null;
  virtualClassLink?: ModelStringInput | null;
  and?: Array<ModelCourseFilterInput | null> | null;
  or?: Array<ModelCourseFilterInput | null> | null;
  not?: ModelCourseFilterInput | null;
};

export type ModelCourseConnection = {
  __typename: "ModelCourseConnection";
  items: Array<Course | null>;
  nextToken?: string | null;
};

export type ModelMediaFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  type?: ModelMediaTypeInput | null;
  description?: ModelStringInput | null;
  link?: ModelStringInput | null;
  content?: ModelStringInput | null;
  groups?: ModelStringInput | null;
  and?: Array<ModelMediaFilterInput | null> | null;
  or?: Array<ModelMediaFilterInput | null> | null;
  not?: ModelMediaFilterInput | null;
};

export type ModelMediaConnection = {
  __typename: "ModelMediaConnection";
  items: Array<Media | null>;
  nextToken?: string | null;
};

export type ModelDynamoDBUserFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  email?: ModelStringInput | null;
  phone?: ModelIntInput | null;
  cognitoId?: ModelIDInput | null;
  groups?: ModelStringInput | null;
  and?: Array<ModelDynamoDBUserFilterInput | null> | null;
  or?: Array<ModelDynamoDBUserFilterInput | null> | null;
  not?: ModelDynamoDBUserFilterInput | null;
};

export type ModelDynamoDBUserConnection = {
  __typename: "ModelDynamoDBUserConnection";
  items: Array<DynamoDBUser | null>;
  nextToken?: string | null;
};

export type CreateCourseMutationVariables = {
  input: CreateCourseInput;
  condition?: ModelCourseConditionInput | null;
};

export type CreateCourseMutation = {
  createCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    scheduleDates: Array<string | null>;
    scheduleStartTime: string;
    scheduleEndTime: string;
    virtualClassLink?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateCourseMutationVariables = {
  input: UpdateCourseInput;
  condition?: ModelCourseConditionInput | null;
};

export type UpdateCourseMutation = {
  updateCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    scheduleDates: Array<string | null>;
    scheduleStartTime: string;
    scheduleEndTime: string;
    virtualClassLink?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteCourseMutationVariables = {
  input: DeleteCourseInput;
  condition?: ModelCourseConditionInput | null;
};

export type DeleteCourseMutation = {
  deleteCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    scheduleDates: Array<string | null>;
    scheduleStartTime: string;
    scheduleEndTime: string;
    virtualClassLink?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type CreateMediaMutationVariables = {
  input: CreateMediaInput;
  condition?: ModelMediaConditionInput | null;
};

export type CreateMediaMutation = {
  createMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    type: MediaType;
    description?: string | null;
    link: string;
    content?: string | null;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type UpdateMediaMutationVariables = {
  input: UpdateMediaInput;
  condition?: ModelMediaConditionInput | null;
};

export type UpdateMediaMutation = {
  updateMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    type: MediaType;
    description?: string | null;
    link: string;
    content?: string | null;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type DeleteMediaMutationVariables = {
  input: DeleteMediaInput;
  condition?: ModelMediaConditionInput | null;
};

export type DeleteMediaMutation = {
  deleteMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    type: MediaType;
    description?: string | null;
    link: string;
    content?: string | null;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type CreateDynamoDBUserMutationVariables = {
  input: CreateDynamoDBUserInput;
  condition?: ModelDynamoDBUserConditionInput | null;
};

export type CreateDynamoDBUserMutation = {
  createDynamoDBUser?: {
    __typename: "DynamoDBUser";
    id: string;
    name: string;
    email: string;
    phone?: number | null;
    cognitoId: string;
    groups: Array<string | null>;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type UpdateDynamoDBUserMutationVariables = {
  input: UpdateDynamoDBUserInput;
  condition?: ModelDynamoDBUserConditionInput | null;
};

export type UpdateDynamoDBUserMutation = {
  updateDynamoDBUser?: {
    __typename: "DynamoDBUser";
    id: string;
    name: string;
    email: string;
    phone?: number | null;
    cognitoId: string;
    groups: Array<string | null>;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type DeleteDynamoDBUserMutationVariables = {
  input: DeleteDynamoDBUserInput;
  condition?: ModelDynamoDBUserConditionInput | null;
};

export type DeleteDynamoDBUserMutation = {
  deleteDynamoDBUser?: {
    __typename: "DynamoDBUser";
    id: string;
    name: string;
    email: string;
    phone?: number | null;
    cognitoId: string;
    groups: Array<string | null>;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type GetCourseQueryVariables = {
  id: string;
};

export type GetCourseQuery = {
  getCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    scheduleDates: Array<string | null>;
    scheduleStartTime: string;
    scheduleEndTime: string;
    virtualClassLink?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListCoursesQueryVariables = {
  filter?: ModelCourseFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListCoursesQuery = {
  listCourses?: {
    __typename: "ModelCourseConnection";
    items: Array<{
      __typename: "Course";
      id: string;
      name: string;
      scheduleDates: Array<string | null>;
      scheduleStartTime: string;
      scheduleEndTime: string;
      virtualClassLink?: string | null;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetMediaQueryVariables = {
  id: string;
};

export type GetMediaQuery = {
  getMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    type: MediaType;
    description?: string | null;
    link: string;
    content?: string | null;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type ListMediaQueryVariables = {
  filter?: ModelMediaFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListMediaQuery = {
  listMedia?: {
    __typename: "ModelMediaConnection";
    items: Array<{
      __typename: "Media";
      id: string;
      title: string;
      type: MediaType;
      description?: string | null;
      link: string;
      content?: string | null;
      groups?: Array<string | null> | null;
      createdAt: string;
      updatedAt: string;
      owner?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type GetDynamoDBUserQueryVariables = {
  id: string;
};

export type GetDynamoDBUserQuery = {
  getDynamoDBUser?: {
    __typename: "DynamoDBUser";
    id: string;
    name: string;
    email: string;
    phone?: number | null;
    cognitoId: string;
    groups: Array<string | null>;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type ListDynamoDBUsersQueryVariables = {
  filter?: ModelDynamoDBUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListDynamoDBUsersQuery = {
  listDynamoDBUsers?: {
    __typename: "ModelDynamoDBUserConnection";
    items: Array<{
      __typename: "DynamoDBUser";
      id: string;
      name: string;
      email: string;
      phone?: number | null;
      cognitoId: string;
      groups: Array<string | null>;
      createdAt: string;
      updatedAt: string;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateCourseSubscription = {
  onCreateCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    scheduleDates: Array<string | null>;
    scheduleStartTime: string;
    scheduleEndTime: string;
    virtualClassLink?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateCourseSubscription = {
  onUpdateCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    scheduleDates: Array<string | null>;
    scheduleStartTime: string;
    scheduleEndTime: string;
    virtualClassLink?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteCourseSubscription = {
  onDeleteCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    scheduleDates: Array<string | null>;
    scheduleStartTime: string;
    scheduleEndTime: string;
    virtualClassLink?: string | null;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnCreateMediaSubscriptionVariables = {
  owner?: string | null;
};

export type OnCreateMediaSubscription = {
  onCreateMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    type: MediaType;
    description?: string | null;
    link: string;
    content?: string | null;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnUpdateMediaSubscriptionVariables = {
  owner?: string | null;
};

export type OnUpdateMediaSubscription = {
  onUpdateMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    type: MediaType;
    description?: string | null;
    link: string;
    content?: string | null;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnDeleteMediaSubscriptionVariables = {
  owner?: string | null;
};

export type OnDeleteMediaSubscription = {
  onDeleteMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    type: MediaType;
    description?: string | null;
    link: string;
    content?: string | null;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    owner?: string | null;
  } | null;
};

export type OnCreateDynamoDBUserSubscription = {
  onCreateDynamoDBUser?: {
    __typename: "DynamoDBUser";
    id: string;
    name: string;
    email: string;
    phone?: number | null;
    cognitoId: string;
    groups: Array<string | null>;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnUpdateDynamoDBUserSubscription = {
  onUpdateDynamoDBUser?: {
    __typename: "DynamoDBUser";
    id: string;
    name: string;
    email: string;
    phone?: number | null;
    cognitoId: string;
    groups: Array<string | null>;
    createdAt: string;
    updatedAt: string;
  } | null;
};

export type OnDeleteDynamoDBUserSubscription = {
  onDeleteDynamoDBUser?: {
    __typename: "DynamoDBUser";
    id: string;
    name: string;
    email: string;
    phone?: number | null;
    cognitoId: string;
    groups: Array<string | null>;
    createdAt: string;
    updatedAt: string;
  } | null;
};
