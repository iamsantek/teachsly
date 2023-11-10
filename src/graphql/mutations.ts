/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCourse = /* GraphQL */ `mutation CreateCourse(
  $input: CreateCourseInput!
  $condition: ModelCourseConditionInput
) {
  createCourse(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCourseMutationVariables,
  APITypes.CreateCourseMutation
>;
export const updateCourse = /* GraphQL */ `mutation UpdateCourse(
  $input: UpdateCourseInput!
  $condition: ModelCourseConditionInput
) {
  updateCourse(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCourseMutationVariables,
  APITypes.UpdateCourseMutation
>;
export const deleteCourse = /* GraphQL */ `mutation DeleteCourse(
  $input: DeleteCourseInput!
  $condition: ModelCourseConditionInput
) {
  deleteCourse(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCourseMutationVariables,
  APITypes.DeleteCourseMutation
>;
export const createMediaFolder = /* GraphQL */ `mutation CreateMediaFolder(
  $input: CreateMediaFolderInput!
  $condition: ModelMediaFolderConditionInput
) {
  createMediaFolder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMediaFolderMutationVariables,
  APITypes.CreateMediaFolderMutation
>;
export const updateMediaFolder = /* GraphQL */ `mutation UpdateMediaFolder(
  $input: UpdateMediaFolderInput!
  $condition: ModelMediaFolderConditionInput
) {
  updateMediaFolder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMediaFolderMutationVariables,
  APITypes.UpdateMediaFolderMutation
>;
export const deleteMediaFolder = /* GraphQL */ `mutation DeleteMediaFolder(
  $input: DeleteMediaFolderInput!
  $condition: ModelMediaFolderConditionInput
) {
  deleteMediaFolder(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMediaFolderMutationVariables,
  APITypes.DeleteMediaFolderMutation
>;
export const createMedia = /* GraphQL */ `mutation CreateMedia(
  $input: CreateMediaInput!
  $condition: ModelMediaConditionInput
) {
  createMedia(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMediaMutationVariables,
  APITypes.CreateMediaMutation
>;
export const updateMedia = /* GraphQL */ `mutation UpdateMedia(
  $input: UpdateMediaInput!
  $condition: ModelMediaConditionInput
) {
  updateMedia(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMediaMutationVariables,
  APITypes.UpdateMediaMutation
>;
export const deleteMedia = /* GraphQL */ `mutation DeleteMedia(
  $input: DeleteMediaInput!
  $condition: ModelMediaConditionInput
) {
  deleteMedia(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMediaMutationVariables,
  APITypes.DeleteMediaMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createExam = /* GraphQL */ `mutation CreateExam(
  $input: CreateExamInput!
  $condition: ModelExamConditionInput
) {
  createExam(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateExamMutationVariables,
  APITypes.CreateExamMutation
>;
export const updateExam = /* GraphQL */ `mutation UpdateExam(
  $input: UpdateExamInput!
  $condition: ModelExamConditionInput
) {
  updateExam(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateExamMutationVariables,
  APITypes.UpdateExamMutation
>;
export const deleteExam = /* GraphQL */ `mutation DeleteExam(
  $input: DeleteExamInput!
  $condition: ModelExamConditionInput
) {
  deleteExam(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteExamMutationVariables,
  APITypes.DeleteExamMutation
>;
export const createExamAttempt = /* GraphQL */ `mutation CreateExamAttempt(
  $input: CreateExamAttemptInput!
  $condition: ModelExamAttemptConditionInput
) {
  createExamAttempt(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateExamAttemptMutationVariables,
  APITypes.CreateExamAttemptMutation
>;
export const updateExamAttempt = /* GraphQL */ `mutation UpdateExamAttempt(
  $input: UpdateExamAttemptInput!
  $condition: ModelExamAttemptConditionInput
) {
  updateExamAttempt(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateExamAttemptMutationVariables,
  APITypes.UpdateExamAttemptMutation
>;
export const deleteExamAttempt = /* GraphQL */ `mutation DeleteExamAttempt(
  $input: DeleteExamAttemptInput!
  $condition: ModelExamAttemptConditionInput
) {
  deleteExamAttempt(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteExamAttemptMutationVariables,
  APITypes.DeleteExamAttemptMutation
>;
export const createLessonPlan = /* GraphQL */ `mutation CreateLessonPlan(
  $input: CreateLessonPlanInput!
  $condition: ModelLessonPlanConditionInput
) {
  createLessonPlan(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateLessonPlanMutationVariables,
  APITypes.CreateLessonPlanMutation
>;
export const updateLessonPlan = /* GraphQL */ `mutation UpdateLessonPlan(
  $input: UpdateLessonPlanInput!
  $condition: ModelLessonPlanConditionInput
) {
  updateLessonPlan(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateLessonPlanMutationVariables,
  APITypes.UpdateLessonPlanMutation
>;
export const deleteLessonPlan = /* GraphQL */ `mutation DeleteLessonPlan(
  $input: DeleteLessonPlanInput!
  $condition: ModelLessonPlanConditionInput
) {
  deleteLessonPlan(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteLessonPlanMutationVariables,
  APITypes.DeleteLessonPlanMutation
>;
export const createPayments = /* GraphQL */ `mutation CreatePayments(
  $input: CreatePaymentsInput!
  $condition: ModelPaymentsConditionInput
) {
  createPayments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePaymentsMutationVariables,
  APITypes.CreatePaymentsMutation
>;
export const updatePayments = /* GraphQL */ `mutation UpdatePayments(
  $input: UpdatePaymentsInput!
  $condition: ModelPaymentsConditionInput
) {
  updatePayments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePaymentsMutationVariables,
  APITypes.UpdatePaymentsMutation
>;
export const deletePayments = /* GraphQL */ `mutation DeletePayments(
  $input: DeletePaymentsInput!
  $condition: ModelPaymentsConditionInput
) {
  deletePayments(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePaymentsMutationVariables,
  APITypes.DeletePaymentsMutation
>;
export const createBooklets = /* GraphQL */ `mutation CreateBooklets(
  $input: CreateBookletsInput!
  $condition: ModelBookletsConditionInput
) {
  createBooklets(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBookletsMutationVariables,
  APITypes.CreateBookletsMutation
>;
export const updateBooklets = /* GraphQL */ `mutation UpdateBooklets(
  $input: UpdateBookletsInput!
  $condition: ModelBookletsConditionInput
) {
  updateBooklets(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBookletsMutationVariables,
  APITypes.UpdateBookletsMutation
>;
export const deleteBooklets = /* GraphQL */ `mutation DeleteBooklets(
  $input: DeleteBookletsInput!
  $condition: ModelBookletsConditionInput
) {
  deleteBooklets(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteBookletsMutationVariables,
  APITypes.DeleteBookletsMutation
>;
export const createPlacementResults = /* GraphQL */ `mutation CreatePlacementResults(
  $input: CreatePlacementResultsInput!
  $condition: ModelPlacementResultsConditionInput
) {
  createPlacementResults(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreatePlacementResultsMutationVariables,
  APITypes.CreatePlacementResultsMutation
>;
export const updatePlacementResults = /* GraphQL */ `mutation UpdatePlacementResults(
  $input: UpdatePlacementResultsInput!
  $condition: ModelPlacementResultsConditionInput
) {
  updatePlacementResults(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdatePlacementResultsMutationVariables,
  APITypes.UpdatePlacementResultsMutation
>;
export const deletePlacementResults = /* GraphQL */ `mutation DeletePlacementResults(
  $input: DeletePlacementResultsInput!
  $condition: ModelPlacementResultsConditionInput
) {
  deletePlacementResults(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeletePlacementResultsMutationVariables,
  APITypes.DeletePlacementResultsMutation
>;
export const createClassAttendance = /* GraphQL */ `mutation CreateClassAttendance(
  $input: CreateClassAttendanceInput!
  $condition: ModelClassAttendanceConditionInput
) {
  createClassAttendance(input: $input, condition: $condition) {
    id
    date
    externalCourseId
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateClassAttendanceMutationVariables,
  APITypes.CreateClassAttendanceMutation
>;
export const updateClassAttendance = /* GraphQL */ `mutation UpdateClassAttendance(
  $input: UpdateClassAttendanceInput!
  $condition: ModelClassAttendanceConditionInput
) {
  updateClassAttendance(input: $input, condition: $condition) {
    id
    date
    externalCourseId
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateClassAttendanceMutationVariables,
  APITypes.UpdateClassAttendanceMutation
>;
export const deleteClassAttendance = /* GraphQL */ `mutation DeleteClassAttendance(
  $input: DeleteClassAttendanceInput!
  $condition: ModelClassAttendanceConditionInput
) {
  deleteClassAttendance(input: $input, condition: $condition) {
    id
    date
    externalCourseId
    userId
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteClassAttendanceMutationVariables,
  APITypes.DeleteClassAttendanceMutation
>;
