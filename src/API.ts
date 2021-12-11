/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateTodoInput = {
  id?: string | null;
  name: string;
  done: boolean;
  _version?: number | null;
};

export type ModelTodoConditionInput = {
  name?: ModelStringInput | null;
  done?: ModelBooleanInput | null;
  and?: Array<ModelTodoConditionInput | null> | null;
  or?: Array<ModelTodoConditionInput | null> | null;
  not?: ModelTodoConditionInput | null;
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

export type ModelBooleanInput = {
  ne?: boolean | null;
  eq?: boolean | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type Todo = {
  __typename: "Todo";
  id: string;
  name: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateTodoInput = {
  id: string;
  name?: string | null;
  done?: boolean | null;
  _version?: number | null;
};

export type DeleteTodoInput = {
  id: string;
  _version?: number | null;
};

export type CreateCourseInput = {
  id?: string | null;
  name: string;
  teacher: string;
  scheduleDate: string;
  scheduleStartTime: string;
  scheduleEndTime: string;
  _version?: number | null;
};

export type ModelCourseConditionInput = {
  name?: ModelStringInput | null;
  teacher?: ModelStringInput | null;
  scheduleDate?: ModelStringInput | null;
  scheduleStartTime?: ModelStringInput | null;
  scheduleEndTime?: ModelStringInput | null;
  and?: Array<ModelCourseConditionInput | null> | null;
  or?: Array<ModelCourseConditionInput | null> | null;
  not?: ModelCourseConditionInput | null;
};

export type Course = {
  __typename: "Course";
  id: string;
  name: string;
  teacher: string;
  scheduleDate: string;
  scheduleStartTime: string;
  scheduleEndTime: string;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateCourseInput = {
  id: string;
  name?: string | null;
  teacher?: string | null;
  scheduleDate?: string | null;
  scheduleStartTime?: string | null;
  scheduleEndTime?: string | null;
  _version?: number | null;
};

export type DeleteCourseInput = {
  id: string;
  _version?: number | null;
};

export type CreateMediaInput = {
  id?: string | null;
  title: string;
  description?: string | null;
  link: string;
  groups?: Array<string | null> | null;
  _version?: number | null;
};

export type ModelMediaConditionInput = {
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  link?: ModelStringInput | null;
  groups?: ModelStringInput | null;
  and?: Array<ModelMediaConditionInput | null> | null;
  or?: Array<ModelMediaConditionInput | null> | null;
  not?: ModelMediaConditionInput | null;
};

export type Media = {
  __typename: "Media";
  id: string;
  title: string;
  description?: string | null;
  link: string;
  groups?: Array<string | null> | null;
  createdAt: string;
  updatedAt: string;
  _version: number;
  _deleted?: boolean | null;
  _lastChangedAt: number;
};

export type UpdateMediaInput = {
  id: string;
  title?: string | null;
  description?: string | null;
  link?: string | null;
  groups?: Array<string | null> | null;
  _version?: number | null;
};

export type DeleteMediaInput = {
  id: string;
  _version?: number | null;
};

export type ModelTodoFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  done?: ModelBooleanInput | null;
  and?: Array<ModelTodoFilterInput | null> | null;
  or?: Array<ModelTodoFilterInput | null> | null;
  not?: ModelTodoFilterInput | null;
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

export type ModelTodoConnection = {
  __typename: "ModelTodoConnection";
  items: Array<Todo>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelCourseFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  teacher?: ModelStringInput | null;
  scheduleDate?: ModelStringInput | null;
  scheduleStartTime?: ModelStringInput | null;
  scheduleEndTime?: ModelStringInput | null;
  and?: Array<ModelCourseFilterInput | null> | null;
  or?: Array<ModelCourseFilterInput | null> | null;
  not?: ModelCourseFilterInput | null;
};

export type ModelCourseConnection = {
  __typename: "ModelCourseConnection";
  items: Array<Course>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type ModelMediaFilterInput = {
  id?: ModelIDInput | null;
  title?: ModelStringInput | null;
  description?: ModelStringInput | null;
  link?: ModelStringInput | null;
  groups?: ModelStringInput | null;
  and?: Array<ModelMediaFilterInput | null> | null;
  or?: Array<ModelMediaFilterInput | null> | null;
  not?: ModelMediaFilterInput | null;
};

export type ModelMediaConnection = {
  __typename: "ModelMediaConnection";
  items: Array<Media>;
  nextToken?: string | null;
  startedAt?: number | null;
};

export type CreateTodoMutationVariables = {
  input: CreateTodoInput;
  condition?: ModelTodoConditionInput | null;
};

export type CreateTodoMutation = {
  createTodo?: {
    __typename: "Todo";
    id: string;
    name: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type UpdateTodoMutationVariables = {
  input: UpdateTodoInput;
  condition?: ModelTodoConditionInput | null;
};

export type UpdateTodoMutation = {
  updateTodo?: {
    __typename: "Todo";
    id: string;
    name: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type DeleteTodoMutationVariables = {
  input: DeleteTodoInput;
  condition?: ModelTodoConditionInput | null;
};

export type DeleteTodoMutation = {
  deleteTodo?: {
    __typename: "Todo";
    id: string;
    name: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
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
    teacher: string;
    scheduleDate: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
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
    teacher: string;
    scheduleDate: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
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
    teacher: string;
    scheduleDate: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
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
    description?: string | null;
    link: string;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
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
    description?: string | null;
    link: string;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
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
    description?: string | null;
    link: string;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type GetTodoQueryVariables = {
  id: string;
};

export type GetTodoQuery = {
  getTodo?: {
    __typename: "Todo";
    id: string;
    name: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type ListTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListTodosQuery = {
  listTodos?: {
    __typename: "ModelTodoConnection";
    items: Array<{
      __typename: "Todo";
      id: string;
      name: string;
      done: boolean;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    }>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncTodosQueryVariables = {
  filter?: ModelTodoFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncTodosQuery = {
  syncTodos?: {
    __typename: "ModelTodoConnection";
    items: Array<{
      __typename: "Todo";
      id: string;
      name: string;
      done: boolean;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    }>;
    nextToken?: string | null;
    startedAt?: number | null;
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
    teacher: string;
    scheduleDate: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
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
      teacher: string;
      scheduleDate: string;
      scheduleStartTime: string;
      scheduleEndTime: string;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    }>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncCoursesQueryVariables = {
  filter?: ModelCourseFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncCoursesQuery = {
  syncCourses?: {
    __typename: "ModelCourseConnection";
    items: Array<{
      __typename: "Course";
      id: string;
      name: string;
      teacher: string;
      scheduleDate: string;
      scheduleStartTime: string;
      scheduleEndTime: string;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    }>;
    nextToken?: string | null;
    startedAt?: number | null;
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
    description?: string | null;
    link: string;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
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
      description?: string | null;
      link: string;
      groups?: Array<string | null> | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    }>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type SyncMediaQueryVariables = {
  filter?: ModelMediaFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncMediaQuery = {
  syncMedia?: {
    __typename: "ModelMediaConnection";
    items: Array<{
      __typename: "Media";
      id: string;
      title: string;
      description?: string | null;
      link: string;
      groups?: Array<string | null> | null;
      createdAt: string;
      updatedAt: string;
      _version: number;
      _deleted?: boolean | null;
      _lastChangedAt: number;
    }>;
    nextToken?: string | null;
    startedAt?: number | null;
  } | null;
};

export type OnCreateTodoSubscription = {
  onCreateTodo?: {
    __typename: "Todo";
    id: string;
    name: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateTodoSubscription = {
  onUpdateTodo?: {
    __typename: "Todo";
    id: string;
    name: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteTodoSubscription = {
  onDeleteTodo?: {
    __typename: "Todo";
    id: string;
    name: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateCourseSubscription = {
  onCreateCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    teacher: string;
    scheduleDate: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateCourseSubscription = {
  onUpdateCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    teacher: string;
    scheduleDate: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteCourseSubscription = {
  onDeleteCourse?: {
    __typename: "Course";
    id: string;
    name: string;
    teacher: string;
    scheduleDate: string;
    scheduleStartTime: string;
    scheduleEndTime: string;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnCreateMediaSubscription = {
  onCreateMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    description?: string | null;
    link: string;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnUpdateMediaSubscription = {
  onUpdateMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    description?: string | null;
    link: string;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};

export type OnDeleteMediaSubscription = {
  onDeleteMedia?: {
    __typename: "Media";
    id: string;
    title: string;
    description?: string | null;
    link: string;
    groups?: Array<string | null> | null;
    createdAt: string;
    updatedAt: string;
    _version: number;
    _deleted?: boolean | null;
    _lastChangedAt: number;
  } | null;
};
