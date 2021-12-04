import {
  ModelInit,
  MutableModel,
  PersistentModelConstructor,
} from "@aws-amplify/datastore";

type CourseMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

type TodoMetaData = {
  readOnlyFields: "createdAt" | "updatedAt";
};

export declare class Course {
  readonly id: string;
  readonly name: string;
  readonly teacher: string;
  readonly scheduleDate: string;
  readonly scheduleStartTime: string;
  readonly scheduleEndTime: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Course, CourseMetaData>);
  static copyOf(
    source: Course,
    mutator: (
      draft: MutableModel<Course, CourseMetaData>
    ) => MutableModel<Course, CourseMetaData> | void
  ): Course;
}

export declare class Todo {
  readonly id: string;
  readonly name: string;
  readonly done: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(
    source: Todo,
    mutator: (
      draft: MutableModel<Todo, TodoMetaData>
    ) => MutableModel<Todo, TodoMetaData> | void
  ): Todo;
}
