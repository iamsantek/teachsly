/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCourse = /* GraphQL */ `query GetCourse($id: ID!) {
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
    englishLevel
    type
    isVirtual
    zoomMeetingId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetCourseQueryVariables, APITypes.GetCourseQuery>;
export const listCourses = /* GraphQL */ `query ListCourses(
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
      englishLevel
      type
      isVirtual
      zoomMeetingId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCoursesQueryVariables,
  APITypes.ListCoursesQuery
>;
export const getMediaFolder = /* GraphQL */ `query GetMediaFolder($id: ID!) {
  getMediaFolder(id: $id) {
    id
    name
    groups
    parentId
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetMediaFolderQueryVariables,
  APITypes.GetMediaFolderQuery
>;
export const listMediaFolders = /* GraphQL */ `query ListMediaFolders(
  $filter: ModelMediaFolderFilterInput
  $limit: Int
  $nextToken: String
) {
  listMediaFolders(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      groups
      parentId
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMediaFoldersQueryVariables,
  APITypes.ListMediaFoldersQuery
>;
export const getMedia = /* GraphQL */ `query GetMedia($id: ID!) {
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
    __typename
  }
}
` as GeneratedQuery<APITypes.GetMediaQueryVariables, APITypes.GetMediaQuery>;
export const listMedia = /* GraphQL */ `query ListMedia(
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
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListMediaQueryVariables, APITypes.ListMediaQuery>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    name
    email
    phone
    cognitoId
    groups
    isDisabledUser
    disabledReason
    englishLevel
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
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
      englishLevel
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getExam = /* GraphQL */ `query GetExam($id: ID!) {
  getExam(id: $id) {
    id
    groups
    title
    questionPools
    timer {
      type
      timeInSeconds
      timeGranularity
      __typename
    }
    deadline
    startDate
    type
    settings {
      allowRetake
      __typename
    }
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<APITypes.GetExamQueryVariables, APITypes.GetExamQuery>;
export const listExams = /* GraphQL */ `query ListExams(
  $filter: ModelExamFilterInput
  $limit: Int
  $nextToken: String
) {
  listExams(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      groups
      title
      questionPools
      deadline
      startDate
      type
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListExamsQueryVariables, APITypes.ListExamsQuery>;
export const getExamAttempt = /* GraphQL */ `query GetExamAttempt($id: ID!) {
  getExamAttempt(id: $id) {
    id
    examId
    examName
    userId
    userName
    score
    isCompleted
    correctAnswers
    totalQuestions
    correctedBy
    externalId
    results
    keys
    teacherComments
    type
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetExamAttemptQueryVariables,
  APITypes.GetExamAttemptQuery
>;
export const listExamAttempts = /* GraphQL */ `query ListExamAttempts(
  $filter: ModelExamAttemptFilterInput
  $limit: Int
  $nextToken: String
) {
  listExamAttempts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      examId
      examName
      userId
      userName
      score
      isCompleted
      correctAnswers
      totalQuestions
      correctedBy
      externalId
      results
      keys
      teacherComments
      type
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListExamAttemptsQueryVariables,
  APITypes.ListExamAttemptsQuery
>;
export const getLessonPlan = /* GraphQL */ `query GetLessonPlan($id: ID!) {
  getLessonPlan(id: $id) {
    id
    groups
    title
    date
    uploadedBy
    content
    media
    type
    externalId
    extraInformation
    link
    createdAt
    updatedAt
    owner
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetLessonPlanQueryVariables,
  APITypes.GetLessonPlanQuery
>;
export const listLessonPlans = /* GraphQL */ `query ListLessonPlans(
  $filter: ModelLessonPlanFilterInput
  $limit: Int
  $nextToken: String
) {
  listLessonPlans(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      groups
      title
      date
      uploadedBy
      content
      media
      type
      externalId
      extraInformation
      link
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListLessonPlansQueryVariables,
  APITypes.ListLessonPlansQuery
>;
export const getPayments = /* GraphQL */ `query GetPayments($id: ID!) {
  getPayments(id: $id) {
    id
    userId
    date
    status
    type
    typeId
    amount
    mpPaymentId
    itemName
    currency
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPaymentsQueryVariables,
  APITypes.GetPaymentsQuery
>;
export const listPayments = /* GraphQL */ `query ListPayments(
  $filter: ModelPaymentsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPayments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      date
      status
      type
      typeId
      amount
      mpPaymentId
      itemName
      currency
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPaymentsQueryVariables,
  APITypes.ListPaymentsQuery
>;
export const getBooklets = /* GraphQL */ `query GetBooklets($id: ID!) {
  getBooklets(id: $id) {
    id
    name
    nameEng
    description
    descriptionEng
    level
    priceArs
    priceUsd
    isActive
    cognitoGroups
    stripePriceId
    stripeSandBoxPriceId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetBookletsQueryVariables,
  APITypes.GetBookletsQuery
>;
export const listBooklets = /* GraphQL */ `query ListBooklets(
  $filter: ModelBookletsFilterInput
  $limit: Int
  $nextToken: String
) {
  listBooklets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      nameEng
      description
      descriptionEng
      level
      priceArs
      priceUsd
      isActive
      cognitoGroups
      stripePriceId
      stripeSandBoxPriceId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBookletsQueryVariables,
  APITypes.ListBookletsQuery
>;
export const getPlacementResults = /* GraphQL */ `query GetPlacementResults($id: ID!) {
  getPlacementResults(id: $id) {
    id
    fullName
    email
    level
    phone
    country
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPlacementResultsQueryVariables,
  APITypes.GetPlacementResultsQuery
>;
export const listPlacementResults = /* GraphQL */ `query ListPlacementResults(
  $filter: ModelPlacementResultsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPlacementResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      fullName
      email
      level
      phone
      country
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPlacementResultsQueryVariables,
  APITypes.ListPlacementResultsQuery
>;
export const getClassAttendance = /* GraphQL */ `query GetClassAttendance($id: ID!) {
  getClassAttendance(id: $id) {
    id
    date
    externalCourseId
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetClassAttendanceQueryVariables,
  APITypes.GetClassAttendanceQuery
>;
export const listClassAttendances = /* GraphQL */ `query ListClassAttendances(
  $filter: ModelClassAttendanceFilterInput
  $limit: Int
  $nextToken: String
) {
  listClassAttendances(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      date
      externalCourseId
      userId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListClassAttendancesQueryVariables,
  APITypes.ListClassAttendancesQuery
>;
export const courseByExternalId = /* GraphQL */ `query CourseByExternalId(
  $externalId: String!
  $sortDirection: ModelSortDirection
  $filter: ModelCourseFilterInput
  $limit: Int
  $nextToken: String
) {
  courseByExternalId(
    externalId: $externalId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
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
      englishLevel
      type
      isVirtual
      zoomMeetingId
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.CourseByExternalIdQueryVariables,
  APITypes.CourseByExternalIdQuery
>;
export const examAttemptByExternalId = /* GraphQL */ `query ExamAttemptByExternalId(
  $externalId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelExamAttemptFilterInput
  $limit: Int
  $nextToken: String
) {
  examAttemptByExternalId(
    externalId: $externalId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      examId
      examName
      userId
      userName
      score
      isCompleted
      correctAnswers
      totalQuestions
      correctedBy
      externalId
      results
      keys
      teacherComments
      type
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ExamAttemptByExternalIdQueryVariables,
  APITypes.ExamAttemptByExternalIdQuery
>;
export const lessonPlanByExternalId = /* GraphQL */ `query LessonPlanByExternalId(
  $externalId: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelLessonPlanFilterInput
  $limit: Int
  $nextToken: String
) {
  lessonPlanByExternalId(
    externalId: $externalId
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      groups
      title
      date
      uploadedBy
      content
      media
      type
      externalId
      extraInformation
      link
      createdAt
      updatedAt
      owner
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.LessonPlanByExternalIdQueryVariables,
  APITypes.LessonPlanByExternalIdQuery
>;
