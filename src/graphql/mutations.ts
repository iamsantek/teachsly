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
      virtualClassLink
      isActive
      externalId
      scheduleYear
      englishLevel
      createdAt
      updatedAt
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
      virtualClassLink
      isActive
      externalId
      scheduleYear
      englishLevel
      createdAt
      updatedAt
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
      virtualClassLink
      isActive
      externalId
      scheduleYear
      englishLevel
      createdAt
      updatedAt
    }
  }
`;
export const createMediaFolder = /* GraphQL */ `
  mutation CreateMediaFolder(
    $input: CreateMediaFolderInput!
    $condition: ModelMediaFolderConditionInput
  ) {
    createMediaFolder(input: $input, condition: $condition) {
      id
      name
      groups
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateMediaFolder = /* GraphQL */ `
  mutation UpdateMediaFolder(
    $input: UpdateMediaFolderInput!
    $condition: ModelMediaFolderConditionInput
  ) {
    updateMediaFolder(input: $input, condition: $condition) {
      id
      name
      groups
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteMediaFolder = /* GraphQL */ `
  mutation DeleteMediaFolder(
    $input: DeleteMediaFolderInput!
    $condition: ModelMediaFolderConditionInput
  ) {
    deleteMediaFolder(input: $input, condition: $condition) {
      id
      name
      groups
      createdAt
      updatedAt
      owner
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
export const createUser = /* GraphQL */ `
  mutation CreateUser(
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
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
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
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
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
    }
  }
`;
export const createExam = /* GraphQL */ `
  mutation CreateExam(
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
      }
      deadline
      startDate
      type
      settings {
        allowRetake
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateExam = /* GraphQL */ `
  mutation UpdateExam(
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
      }
      deadline
      startDate
      type
      settings {
        allowRetake
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteExam = /* GraphQL */ `
  mutation DeleteExam(
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
      }
      deadline
      startDate
      type
      settings {
        allowRetake
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createExamAttempt = /* GraphQL */ `
  mutation CreateExamAttempt(
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
    }
  }
`;
export const updateExamAttempt = /* GraphQL */ `
  mutation UpdateExamAttempt(
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
    }
  }
`;
export const deleteExamAttempt = /* GraphQL */ `
  mutation DeleteExamAttempt(
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
    }
  }
`;
export const createLessonPlan = /* GraphQL */ `
  mutation CreateLessonPlan(
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateLessonPlan = /* GraphQL */ `
  mutation UpdateLessonPlan(
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteLessonPlan = /* GraphQL */ `
  mutation DeleteLessonPlan(
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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createPayments = /* GraphQL */ `
  mutation CreatePayments(
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
      createdAt
      updatedAt
    }
  }
`;
export const updatePayments = /* GraphQL */ `
  mutation UpdatePayments(
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
      createdAt
      updatedAt
    }
  }
`;
export const deletePayments = /* GraphQL */ `
  mutation DeletePayments(
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
      createdAt
      updatedAt
    }
  }
`;
export const createBooklets = /* GraphQL */ `
  mutation CreateBooklets(
    $input: CreateBookletsInput!
    $condition: ModelBookletsConditionInput
  ) {
    createBooklets(input: $input, condition: $condition) {
      id
      name
      description
      level
      priceArs
      priceUsd
      isActive
      mpCheckoutUrl
      mpPreferenceId
      pdfFile
      createdAt
      updatedAt
    }
  }
`;
export const updateBooklets = /* GraphQL */ `
  mutation UpdateBooklets(
    $input: UpdateBookletsInput!
    $condition: ModelBookletsConditionInput
  ) {
    updateBooklets(input: $input, condition: $condition) {
      id
      name
      description
      level
      priceArs
      priceUsd
      isActive
      mpCheckoutUrl
      mpPreferenceId
      pdfFile
      createdAt
      updatedAt
    }
  }
`;
export const deleteBooklets = /* GraphQL */ `
  mutation DeleteBooklets(
    $input: DeleteBookletsInput!
    $condition: ModelBookletsConditionInput
  ) {
    deleteBooklets(input: $input, condition: $condition) {
      id
      name
      description
      level
      priceArs
      priceUsd
      isActive
      mpCheckoutUrl
      mpPreferenceId
      pdfFile
      createdAt
      updatedAt
    }
  }
`;
