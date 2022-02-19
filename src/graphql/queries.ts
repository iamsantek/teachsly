/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCourse = /* GraphQL */ `
  query GetCourse($id: ID!) {
    getCourse(id: $id) {
      id
      name
      scheduleDates
      scheduleStartTime
      scheduleEndTime
      virtualClassLink
      createdAt
      updatedAt
    }
  }
`;
export const listCourses = /* GraphQL */ `
  query ListCourses(
    $filter: ModelCourseFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCourses(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        scheduleDates
        scheduleStartTime
        scheduleEndTime
        virtualClassLink
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      title
      type
      description
      link
      content
      groups
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMedia = /* GraphQL */ `
  query ListMedia(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedia(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        type
        description
        link
        content
        groups
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getDynamoDBUser = /* GraphQL */ `
  query GetDynamoDBUser($id: ID!) {
    getDynamoDBUser(id: $id) {
      id
      name
      email
      phone
      cognitoId
      groups
      createdAt
      updatedAt
    }
  }
`;
export const listDynamoDBUsers = /* GraphQL */ `
  query ListDynamoDBUsers(
    $filter: ModelDynamoDBUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDynamoDBUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        cognitoId
        groups
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
