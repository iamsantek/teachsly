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
};

export type ModelCourseConditionInput = {
  name?: ModelStringInput | null,
  scheduleDates?: ModelIntInput | null,
  scheduleStartTime?: ModelStringInput | null,
  scheduleEndTime?: ModelStringInput | null,
  virtualClassLink?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
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
};

export type DeleteCourseInput = {
  id: string,
};

export type CreateMediaInput = {
  id?: string | null,
  title: string,
  type: MediaType,
  description?: string | null,
  link: string,
  content?: string | null,
  groups?: Array< string | null > | null,
  uploadedBy: string,
};

export enum MediaType {
  LINK = "LINK",
  PDF = "PDF",
  VIDEO = "VIDEO",
}


export type ModelMediaConditionInput = {
  title?: ModelStringInput | null,
  type?: ModelMediaTypeInput | null,
  description?: ModelStringInput | null,
  link?: ModelStringInput | null,
  content?: ModelStringInput | null,
  groups?: ModelStringInput | null,
  uploadedBy?: ModelStringInput | null,
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
  groups?: Array< string | null > | null,
  uploadedBy: string,
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
  groups?: Array< string | null > | null,
  uploadedBy?: string | null,
};

export type DeleteMediaInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  name: string,
  email: string,
  phone?: string | null,
  cognitoId: string,
  groups: Array< string | null >,
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
  phone?: string | null,
  cognitoId: string,
  groups: Array< string | null >,
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
  groups?: Array< string | null > | null,
  isDisabledUser?: boolean | null,
  disabledReason?: DisabledAccountReasons | null,
};

export type DeleteUserInput = {
  id: string,
};

export type SearchableCourseFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  scheduleDates?: SearchableIntFilterInput | null,
  scheduleStartTime?: SearchableStringFilterInput | null,
  scheduleEndTime?: SearchableStringFilterInput | null,
  virtualClassLink?: SearchableStringFilterInput | null,
  isActive?: SearchableBooleanFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  and?: Array< SearchableCourseFilterInput | null > | null,
  or?: Array< SearchableCourseFilterInput | null > | null,
  not?: SearchableCourseFilterInput | null,
};

export type SearchableIDFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableStringFilterInput = {
  ne?: string | null,
  gt?: string | null,
  lt?: string | null,
  gte?: string | null,
  lte?: string | null,
  eq?: string | null,
  match?: string | null,
  matchPhrase?: string | null,
  matchPhrasePrefix?: string | null,
  multiMatch?: string | null,
  exists?: boolean | null,
  wildcard?: string | null,
  regexp?: string | null,
  range?: Array< string | null > | null,
};

export type SearchableIntFilterInput = {
  ne?: number | null,
  gt?: number | null,
  lt?: number | null,
  gte?: number | null,
  lte?: number | null,
  eq?: number | null,
  range?: Array< number | null > | null,
};

export type SearchableBooleanFilterInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type SearchableCourseSortInput = {
  field?: SearchableCourseSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableCourseSortableFields {
  id = "id",
  name = "name",
  scheduleDates = "scheduleDates",
  scheduleStartTime = "scheduleStartTime",
  scheduleEndTime = "scheduleEndTime",
  virtualClassLink = "virtualClassLink",
  isActive = "isActive",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export enum SearchableSortDirection {
  asc = "asc",
  desc = "desc",
}


export type SearchableCourseAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableCourseAggregateField,
};

export enum SearchableAggregateType {
  terms = "terms",
  avg = "avg",
  min = "min",
  max = "max",
  sum = "sum",
}


export enum SearchableCourseAggregateField {
  id = "id",
  name = "name",
  scheduleDates = "scheduleDates",
  scheduleStartTime = "scheduleStartTime",
  scheduleEndTime = "scheduleEndTime",
  virtualClassLink = "virtualClassLink",
  isActive = "isActive",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableCourseConnection = {
  __typename: "SearchableCourseConnection",
  items:  Array<Course | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableAggregateResult = {
  __typename: "SearchableAggregateResult",
  name: string,
  result?: SearchableAggregateGenericResult | null,
};

export type SearchableAggregateGenericResult = SearchableAggregateScalarResult | SearchableAggregateBucketResult


export type SearchableAggregateScalarResult = {
  __typename: "SearchableAggregateScalarResult",
  value: number,
};

export type SearchableAggregateBucketResult = {
  __typename: "SearchableAggregateBucketResult",
  buckets?:  Array<SearchableAggregateBucketResultItem | null > | null,
};

export type SearchableAggregateBucketResultItem = {
  __typename: "SearchableAggregateBucketResultItem",
  key: string,
  doc_count: number,
};

export type SearchableMediaFilterInput = {
  id?: SearchableIDFilterInput | null,
  title?: SearchableStringFilterInput | null,
  description?: SearchableStringFilterInput | null,
  link?: SearchableStringFilterInput | null,
  content?: SearchableStringFilterInput | null,
  groups?: SearchableStringFilterInput | null,
  uploadedBy?: SearchableStringFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  type?: SearchableStringFilterInput | null,
  and?: Array< SearchableMediaFilterInput | null > | null,
  or?: Array< SearchableMediaFilterInput | null > | null,
  not?: SearchableMediaFilterInput | null,
};

export type SearchableMediaSortInput = {
  field?: SearchableMediaSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableMediaSortableFields {
  id = "id",
  title = "title",
  description = "description",
  link = "link",
  content = "content",
  groups = "groups",
  uploadedBy = "uploadedBy",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableMediaAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableMediaAggregateField,
};

export enum SearchableMediaAggregateField {
  id = "id",
  title = "title",
  type = "type",
  description = "description",
  link = "link",
  content = "content",
  groups = "groups",
  uploadedBy = "uploadedBy",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableMediaConnection = {
  __typename: "SearchableMediaConnection",
  items:  Array<Media | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type SearchableUserFilterInput = {
  id?: SearchableIDFilterInput | null,
  name?: SearchableStringFilterInput | null,
  email?: SearchableStringFilterInput | null,
  phone?: SearchableStringFilterInput | null,
  cognitoId?: SearchableIDFilterInput | null,
  groups?: SearchableStringFilterInput | null,
  isDisabledUser?: SearchableBooleanFilterInput | null,
  createdAt?: SearchableStringFilterInput | null,
  updatedAt?: SearchableStringFilterInput | null,
  disabledReason?: SearchableStringFilterInput | null,
  and?: Array< SearchableUserFilterInput | null > | null,
  or?: Array< SearchableUserFilterInput | null > | null,
  not?: SearchableUserFilterInput | null,
};

export type SearchableUserSortInput = {
  field?: SearchableUserSortableFields | null,
  direction?: SearchableSortDirection | null,
};

export enum SearchableUserSortableFields {
  id = "id",
  name = "name",
  email = "email",
  phone = "phone",
  cognitoId = "cognitoId",
  groups = "groups",
  isDisabledUser = "isDisabledUser",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUserAggregationInput = {
  name: string,
  type: SearchableAggregateType,
  field: SearchableUserAggregateField,
};

export enum SearchableUserAggregateField {
  id = "id",
  name = "name",
  email = "email",
  phone = "phone",
  cognitoId = "cognitoId",
  groups = "groups",
  isDisabledUser = "isDisabledUser",
  disabledReason = "disabledReason",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
}


export type SearchableUserConnection = {
  __typename: "SearchableUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
  total?: number | null,
  aggregateItems:  Array<SearchableAggregateResult | null >,
};

export type ModelCourseFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  scheduleDates?: ModelIntInput | null,
  scheduleStartTime?: ModelStringInput | null,
  scheduleEndTime?: ModelStringInput | null,
  virtualClassLink?: ModelStringInput | null,
  isActive?: ModelBooleanInput | null,
  and?: Array< ModelCourseFilterInput | null > | null,
  or?: Array< ModelCourseFilterInput | null > | null,
  not?: ModelCourseFilterInput | null,
};

export type ModelCourseConnection = {
  __typename: "ModelCourseConnection",
  items:  Array<Course | null >,
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
    createdAt: string,
    updatedAt: string,
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
    groups?: Array< string | null > | null,
    uploadedBy: string,
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
    groups?: Array< string | null > | null,
    uploadedBy: string,
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
    groups?: Array< string | null > | null,
    uploadedBy: string,
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
    phone?: string | null,
    cognitoId: string,
    groups: Array< string | null >,
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
    phone?: string | null,
    cognitoId: string,
    groups: Array< string | null >,
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
    phone?: string | null,
    cognitoId: string,
    groups: Array< string | null >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type SearchCoursesQueryVariables = {
  filter?: SearchableCourseFilterInput | null,
  sort?: Array< SearchableCourseSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableCourseAggregationInput | null > | null,
};

export type SearchCoursesQuery = {
  searchCourses?:  {
    __typename: "SearchableCourseConnection",
    items:  Array< {
      __typename: "Course",
      id: string,
      name: string,
      scheduleDates: Array< number | null >,
      scheduleStartTime: string,
      scheduleEndTime: string,
      virtualClassLink?: string | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type SearchMediaQueryVariables = {
  filter?: SearchableMediaFilterInput | null,
  sort?: Array< SearchableMediaSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableMediaAggregationInput | null > | null,
};

export type SearchMediaQuery = {
  searchMedia?:  {
    __typename: "SearchableMediaConnection",
    items:  Array< {
      __typename: "Media",
      id: string,
      title: string,
      type: MediaType,
      description?: string | null,
      link: string,
      content?: string | null,
      groups?: Array< string | null > | null,
      uploadedBy: string,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
  } | null,
};

export type SearchUsersQueryVariables = {
  filter?: SearchableUserFilterInput | null,
  sort?: Array< SearchableUserSortInput | null > | null,
  limit?: number | null,
  nextToken?: string | null,
  from?: number | null,
  aggregates?: Array< SearchableUserAggregationInput | null > | null,
};

export type SearchUsersQuery = {
  searchUsers?:  {
    __typename: "SearchableUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      name: string,
      email: string,
      phone?: string | null,
      cognitoId: string,
      groups: Array< string | null >,
      isDisabledUser?: boolean | null,
      disabledReason?: DisabledAccountReasons | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    total?: number | null,
    aggregateItems:  Array< {
      __typename: "SearchableAggregateResult",
      name: string,
      result: ( {
          __typename: "SearchableAggregateScalarResult",
          value: number,
        } | {
          __typename: "SearchableAggregateBucketResult",
          buckets?:  Array< {
            __typename: string,
            key: string,
            doc_count: number,
          } | null > | null,
        }
      ) | null,
    } | null >,
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
      createdAt: string,
      updatedAt: string,
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
    groups?: Array< string | null > | null,
    uploadedBy: string,
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
      groups?: Array< string | null > | null,
      uploadedBy: string,
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
    phone?: string | null,
    cognitoId: string,
    groups: Array< string | null >,
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
      phone?: string | null,
      cognitoId: string,
      groups: Array< string | null >,
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
    createdAt: string,
    updatedAt: string,
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
    groups?: Array< string | null > | null,
    uploadedBy: string,
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
    groups?: Array< string | null > | null,
    uploadedBy: string,
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
    groups?: Array< string | null > | null,
    uploadedBy: string,
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
    phone?: string | null,
    cognitoId: string,
    groups: Array< string | null >,
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
    phone?: string | null,
    cognitoId: string,
    groups: Array< string | null >,
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
    phone?: string | null,
    cognitoId: string,
    groups: Array< string | null >,
    isDisabledUser?: boolean | null,
    disabledReason?: DisabledAccountReasons | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
