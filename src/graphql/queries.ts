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
      isActive
      externalId
      scheduleYear
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
        isActive
        externalId
        scheduleYear
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMediaFolder = /* GraphQL */ `
  query GetMediaFolder($id: ID!) {
    getMediaFolder(id: $id) {
      id
      name
      groups
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listMediaFolders = /* GraphQL */ `
  query ListMediaFolders(
    $filter: ModelMediaFolderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMediaFolders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        groups
        createdAt
        updatedAt
        owner
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
      uploadedBy
      mimeType
      folderId
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
        uploadedBy
        mimeType
        folderId
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      email
      phone
      cognitoId
      groups
      isDisabledUser
      disabledReason
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        cognitoId
        groups
        isDisabledUser
        disabledReason
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
