/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCourse = /* GraphQL */ `
  mutation CreateCourse(
    $input: CreateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    createCourse(input: $input, condition: $condition) {
      id
      name
      scheduleDates
      scheduleStartTime
      scheduleEndTime
      isVirtual
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateCourse = /* GraphQL */ `
  mutation UpdateCourse(
    $input: UpdateCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    updateCourse(input: $input, condition: $condition) {
      id
      name
      scheduleDates
      scheduleStartTime
      scheduleEndTime
      isVirtual
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteCourse = /* GraphQL */ `
  mutation DeleteCourse(
    $input: DeleteCourseInput!
    $condition: ModelCourseConditionInput
  ) {
    deleteCourse(input: $input, condition: $condition) {
      id
      name
      scheduleDates
      scheduleStartTime
      scheduleEndTime
      isVirtual
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createMedia = /* GraphQL */ `
  mutation CreateMedia(
    $input: CreateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    createMedia(input: $input, condition: $condition) {
      id
      title
      type
      description
      link
      groups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateMedia = /* GraphQL */ `
  mutation UpdateMedia(
    $input: UpdateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    updateMedia(input: $input, condition: $condition) {
      id
      title
      type
      description
      link
      groups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteMedia = /* GraphQL */ `
  mutation DeleteMedia(
    $input: DeleteMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    deleteMedia(input: $input, condition: $condition) {
      id
      title
      type
      description
      link
      groups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createDynamoDBUser = /* GraphQL */ `
  mutation CreateDynamoDBUser(
    $input: CreateDynamoDBUserInput!
    $condition: ModelDynamoDBUserConditionInput
  ) {
    createDynamoDBUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      cognitoId
      groups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateDynamoDBUser = /* GraphQL */ `
  mutation UpdateDynamoDBUser(
    $input: UpdateDynamoDBUserInput!
    $condition: ModelDynamoDBUserConditionInput
  ) {
    updateDynamoDBUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      cognitoId
      groups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteDynamoDBUser = /* GraphQL */ `
  mutation DeleteDynamoDBUser(
    $input: DeleteDynamoDBUserInput!
    $condition: ModelDynamoDBUserConditionInput
  ) {
    deleteDynamoDBUser(input: $input, condition: $condition) {
      id
      name
      email
      phone
      cognitoId
      groups
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
