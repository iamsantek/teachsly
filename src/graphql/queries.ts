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
      englishLevel
      type
      isVirtual
      zoomMeetingId
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
        englishLevel
        type
        isVirtual
        zoomMeetingId
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
      parentId
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
        parentId
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
      englishLevel
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
        englishLevel
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getExam = /* GraphQL */ `
  query GetExam($id: ID!) {
    getExam(id: $id) {
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
export const listExams = /* GraphQL */ `
  query ListExams(
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
      }
      nextToken
    }
  }
`;
export const getExamAttempt = /* GraphQL */ `
  query GetExamAttempt($id: ID!) {
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
    }
  }
`;
export const listExamAttempts = /* GraphQL */ `
  query ListExamAttempts(
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
      }
      nextToken
    }
  }
`;
export const getLessonPlan = /* GraphQL */ `
  query GetLessonPlan($id: ID!) {
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
    }
  }
`;
export const listLessonPlans = /* GraphQL */ `
  query ListLessonPlans(
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
      }
      nextToken
    }
  }
`;
export const getPayments = /* GraphQL */ `
  query GetPayments($id: ID!) {
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
    }
  }
`;
export const listPayments = /* GraphQL */ `
  query ListPayments(
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
      }
      nextToken
    }
  }
`;
export const getBooklets = /* GraphQL */ `
  query GetBooklets($id: ID!) {
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
      mpCheckoutUrl
      mpPreferenceId
      pdfFile
      paypalCheckoutUrl
      mpSandBoxCheckoutUrl
      paypalSandBoxCheckoutUrl
      cognitoGroups
      createdAt
      updatedAt
    }
  }
`;
export const listBooklets = /* GraphQL */ `
  query ListBooklets(
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
        mpCheckoutUrl
        mpPreferenceId
        pdfFile
        paypalCheckoutUrl
        mpSandBoxCheckoutUrl
        paypalSandBoxCheckoutUrl
        cognitoGroups
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const courseByExternalId = /* GraphQL */ `
  query CourseByExternalId(
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
      }
      nextToken
    }
  }
`;
export const examAttemptByExternalId = /* GraphQL */ `
  query ExamAttemptByExternalId(
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
      }
      nextToken
    }
  }
`;
export const lessonPlanByExternalId = /* GraphQL */ `
  query LessonPlanByExternalId(
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
      }
      nextToken
    }
  }
`;
