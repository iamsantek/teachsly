/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCourse = /* GraphQL */ `
  subscription OnCreateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onCreateCourse(filter: $filter) {
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
    }
  }
`;
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse($filter: ModelSubscriptionCourseFilterInput) {
    onUpdateCourse(filter: $filter) {
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
    }
  }
`;
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse($filter: ModelSubscriptionCourseFilterInput) {
    onDeleteCourse(filter: $filter) {
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
    }
  }
`;
export const onCreateMediaFolder = /* GraphQL */ `
  subscription OnCreateMediaFolder(
    $filter: ModelSubscriptionMediaFolderFilterInput
    $owner: String
  ) {
    onCreateMediaFolder(filter: $filter, owner: $owner) {
      id
      name
      groups
      parentId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateMediaFolder = /* GraphQL */ `
  subscription OnUpdateMediaFolder(
    $filter: ModelSubscriptionMediaFolderFilterInput
    $owner: String
  ) {
    onUpdateMediaFolder(filter: $filter, owner: $owner) {
      id
      name
      groups
      parentId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteMediaFolder = /* GraphQL */ `
  subscription OnDeleteMediaFolder(
    $filter: ModelSubscriptionMediaFolderFilterInput
    $owner: String
  ) {
    onDeleteMediaFolder(filter: $filter, owner: $owner) {
      id
      name
      groups
      parentId
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateMedia = /* GraphQL */ `
  subscription OnCreateMedia(
    $filter: ModelSubscriptionMediaFilterInput
    $owner: String
  ) {
    onCreateMedia(filter: $filter, owner: $owner) {
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
export const onUpdateMedia = /* GraphQL */ `
  subscription OnUpdateMedia(
    $filter: ModelSubscriptionMediaFilterInput
    $owner: String
  ) {
    onUpdateMedia(filter: $filter, owner: $owner) {
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
export const onDeleteMedia = /* GraphQL */ `
  subscription OnDeleteMedia(
    $filter: ModelSubscriptionMediaFilterInput
    $owner: String
  ) {
    onDeleteMedia(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateExam = /* GraphQL */ `
  subscription OnCreateExam(
    $filter: ModelSubscriptionExamFilterInput
    $owner: String
  ) {
    onCreateExam(filter: $filter, owner: $owner) {
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
export const onUpdateExam = /* GraphQL */ `
  subscription OnUpdateExam(
    $filter: ModelSubscriptionExamFilterInput
    $owner: String
  ) {
    onUpdateExam(filter: $filter, owner: $owner) {
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
export const onDeleteExam = /* GraphQL */ `
  subscription OnDeleteExam(
    $filter: ModelSubscriptionExamFilterInput
    $owner: String
  ) {
    onDeleteExam(filter: $filter, owner: $owner) {
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
export const onCreateExamAttempt = /* GraphQL */ `
  subscription OnCreateExamAttempt(
    $filter: ModelSubscriptionExamAttemptFilterInput
    $owner: String
  ) {
    onCreateExamAttempt(filter: $filter, owner: $owner) {
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
export const onUpdateExamAttempt = /* GraphQL */ `
  subscription OnUpdateExamAttempt(
    $filter: ModelSubscriptionExamAttemptFilterInput
    $owner: String
  ) {
    onUpdateExamAttempt(filter: $filter, owner: $owner) {
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
export const onDeleteExamAttempt = /* GraphQL */ `
  subscription OnDeleteExamAttempt(
    $filter: ModelSubscriptionExamAttemptFilterInput
    $owner: String
  ) {
    onDeleteExamAttempt(filter: $filter, owner: $owner) {
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
export const onCreateLessonPlan = /* GraphQL */ `
  subscription OnCreateLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
    $owner: String
  ) {
    onCreateLessonPlan(filter: $filter, owner: $owner) {
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
    }
  }
`;
export const onUpdateLessonPlan = /* GraphQL */ `
  subscription OnUpdateLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
    $owner: String
  ) {
    onUpdateLessonPlan(filter: $filter, owner: $owner) {
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
    }
  }
`;
export const onDeleteLessonPlan = /* GraphQL */ `
  subscription OnDeleteLessonPlan(
    $filter: ModelSubscriptionLessonPlanFilterInput
    $owner: String
  ) {
    onDeleteLessonPlan(filter: $filter, owner: $owner) {
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
    }
  }
`;
export const onCreatePayments = /* GraphQL */ `
  subscription OnCreatePayments($filter: ModelSubscriptionPaymentsFilterInput) {
    onCreatePayments(filter: $filter) {
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
    }
  }
`;
export const onUpdatePayments = /* GraphQL */ `
  subscription OnUpdatePayments($filter: ModelSubscriptionPaymentsFilterInput) {
    onUpdatePayments(filter: $filter) {
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
    }
  }
`;
export const onDeletePayments = /* GraphQL */ `
  subscription OnDeletePayments($filter: ModelSubscriptionPaymentsFilterInput) {
    onDeletePayments(filter: $filter) {
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
    }
  }
`;
export const onCreateBooklets = /* GraphQL */ `
  subscription OnCreateBooklets($filter: ModelSubscriptionBookletsFilterInput) {
    onCreateBooklets(filter: $filter) {
      id
      name
      nameEng
      description
      descriptionEng
      level
      priceArs
      priceUsd
      isActive
      paypalCheckoutUrl
      paypalSandBoxCheckoutUrl
      cognitoGroups
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBooklets = /* GraphQL */ `
  subscription OnUpdateBooklets($filter: ModelSubscriptionBookletsFilterInput) {
    onUpdateBooklets(filter: $filter) {
      id
      name
      nameEng
      description
      descriptionEng
      level
      priceArs
      priceUsd
      isActive
      paypalCheckoutUrl
      paypalSandBoxCheckoutUrl
      cognitoGroups
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBooklets = /* GraphQL */ `
  subscription OnDeleteBooklets($filter: ModelSubscriptionBookletsFilterInput) {
    onDeleteBooklets(filter: $filter) {
      id
      name
      nameEng
      description
      descriptionEng
      level
      priceArs
      priceUsd
      isActive
      paypalCheckoutUrl
      paypalSandBoxCheckoutUrl
      cognitoGroups
      createdAt
      updatedAt
    }
  }
`;
export const onCreatePlacementResults = /* GraphQL */ `
  subscription OnCreatePlacementResults(
    $filter: ModelSubscriptionPlacementResultsFilterInput
  ) {
    onCreatePlacementResults(filter: $filter) {
      id
      fullName
      email
      level
      phone
      country
      createdAt
      updatedAt
    }
  }
`;
export const onUpdatePlacementResults = /* GraphQL */ `
  subscription OnUpdatePlacementResults(
    $filter: ModelSubscriptionPlacementResultsFilterInput
  ) {
    onUpdatePlacementResults(filter: $filter) {
      id
      fullName
      email
      level
      phone
      country
      createdAt
      updatedAt
    }
  }
`;
export const onDeletePlacementResults = /* GraphQL */ `
  subscription OnDeletePlacementResults(
    $filter: ModelSubscriptionPlacementResultsFilterInput
  ) {
    onDeletePlacementResults(filter: $filter) {
      id
      fullName
      email
      level
      phone
      country
      createdAt
      updatedAt
    }
  }
`;
