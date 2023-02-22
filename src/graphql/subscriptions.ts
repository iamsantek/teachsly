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
export const onUpdateCourse = /* GraphQL */ `
  subscription OnUpdateCourse {
    onUpdateCourse {
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
export const onDeleteCourse = /* GraphQL */ `
  subscription OnDeleteCourse {
    onDeleteCourse {
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
export const onCreateMediaFolder = /* GraphQL */ `
  subscription OnCreateMediaFolder($owner: String) {
    onCreateMediaFolder(owner: $owner) {
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
  subscription OnUpdateMediaFolder($owner: String) {
    onUpdateMediaFolder(owner: $owner) {
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
  subscription OnDeleteMediaFolder($owner: String) {
    onDeleteMediaFolder(owner: $owner) {
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
  subscription OnCreateMedia($owner: String) {
    onCreateMedia(owner: $owner) {
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
  subscription OnUpdateMedia($owner: String) {
    onUpdateMedia(owner: $owner) {
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
  subscription OnDeleteMedia($owner: String) {
    onDeleteMedia(owner: $owner) {
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
  subscription OnCreateUser {
    onCreateUser {
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
  subscription OnUpdateUser {
    onUpdateUser {
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
  subscription OnDeleteUser {
    onDeleteUser {
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
  subscription OnCreateExam($owner: String) {
    onCreateExam(owner: $owner) {
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
  subscription OnUpdateExam($owner: String) {
    onUpdateExam(owner: $owner) {
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
  subscription OnDeleteExam($owner: String) {
    onDeleteExam(owner: $owner) {
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
  subscription OnCreateExamAttempt($owner: String) {
    onCreateExamAttempt(owner: $owner) {
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
  subscription OnUpdateExamAttempt($owner: String) {
    onUpdateExamAttempt(owner: $owner) {
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
  subscription OnDeleteExamAttempt($owner: String) {
    onDeleteExamAttempt(owner: $owner) {
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
  subscription OnCreateLessonPlan($owner: String) {
    onCreateLessonPlan(owner: $owner) {
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
export const onUpdateLessonPlan = /* GraphQL */ `
  subscription OnUpdateLessonPlan($owner: String) {
    onUpdateLessonPlan(owner: $owner) {
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
export const onDeleteLessonPlan = /* GraphQL */ `
  subscription OnDeleteLessonPlan($owner: String) {
    onDeleteLessonPlan(owner: $owner) {
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
export const onCreatePayments = /* GraphQL */ `
  subscription OnCreatePayments {
    onCreatePayments {
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
  subscription OnUpdatePayments {
    onUpdatePayments {
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
  subscription OnDeletePayments {
    onDeletePayments {
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
  subscription OnCreateBooklets {
    onCreateBooklets {
      id
      name
      nameEng
      description
      descriptionEng
      level
      priceArs
      priceUsd
      isActive
      mpCheckoutUrl
      mpPreferenceId
      pdfFile
      paypalCheckoutUrl
      mpSandBoxCheckoutUrl
      paypalSandBoxCheckoutUrl
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateBooklets = /* GraphQL */ `
  subscription OnUpdateBooklets {
    onUpdateBooklets {
      id
      name
      nameEng
      description
      descriptionEng
      level
      priceArs
      priceUsd
      isActive
      mpCheckoutUrl
      mpPreferenceId
      pdfFile
      paypalCheckoutUrl
      mpSandBoxCheckoutUrl
      paypalSandBoxCheckoutUrl
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteBooklets = /* GraphQL */ `
  subscription OnDeleteBooklets {
    onDeleteBooklets {
      id
      name
      nameEng
      description
      descriptionEng
      level
      priceArs
      priceUsd
      isActive
      mpCheckoutUrl
      mpPreferenceId
      pdfFile
      paypalCheckoutUrl
      mpSandBoxCheckoutUrl
      paypalSandBoxCheckoutUrl
      createdAt
      updatedAt
    }
  }
`;
