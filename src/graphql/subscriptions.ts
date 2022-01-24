/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse {
    onCreateCourse {
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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse {
    onUpdateCourse {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse {
    onDeleteCourse {
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
export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia($owner: String) {
    onCreateMedia(owner: $owner) {
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
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia($owner: String) {
    onUpdateMedia(owner: $owner) {
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
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia($owner: String) {
    onDeleteMedia(owner: $owner) {
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
export const onCreateDynamoDBUser = /* GraphQL */ `
  subscription OnCreateDynamoDBUser {
    onCreateDynamoDBUser {
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
export const onUpdateDynamoDBUser = /* GraphQL */ `
  subscription OnUpdateDynamoDBUser {
    onUpdateDynamoDBUser {
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
export const onDeleteDynamoDBUser = /* GraphQL */ `
  subscription OnDeleteDynamoDBUser {
    onDeleteDynamoDBUser {
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
