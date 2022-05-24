import { createMedia, createMediaFolder, createUser, deleteMedia, updateCourse, updateMedia, updateMediaFolder, updateUser } from '../graphql/mutations'
import { listCourses, listMedia, listMediaFolders } from '../graphql/queries'

const createMediaMock = {
  createMedia: {
    id: '4a6766c6-095c-4216-b762-d8c56f97b0f8',
    title: 'Text',
    type: 'LINK',
    description: 'Text',
    link: 'https://www.google.com',
    content: '',
    groups: [
      'SpeakingII2022'
    ],
    uploadedBy: 'Teachsly Admin',
    mimeType: 'application/link',
    folderId: null,
    createdAt: '2022-05-20T17:25:08.085Z',
    updatedAt: '2022-05-20T17:25:08.085Z',
    owner: null
  }
}

export const updateMediaMock = {
  updateMedia: {
    id: 'f7eb8694-72f3-4b94-b2e4-9a47aa81891e',
    title: 'VAMOOO',
    type: 'LINK',
    description: 'Link que reenvia a Google',
    link: 'https://meet.google.com/shu-shdz-hds',
    content: '',
    groups: [
      'Students'
    ],
    uploadedBy: 'Teachsly Admin',
    mimeType: 'application/link',
    folderId: null,
    createdAt: '2022-05-20T16:38:28.416Z',
    updatedAt: '2022-05-20T16:38:42.455Z',
    owner: null
  }
}

export const listMediaMock = {
  listMedia: {
    items: [
      {
        id: 'f99c3abf-8442-4448-a738-7495af9b2148',
        title: 'Cómo subir carpetas y contenidos a las mismas',
        type: 'FILE',
        description: 'Breve video explicativo sobre cómo usar la nueva estructura de carpetas',
        link: '658ab098-8877-4a2e-bdab-322100992fb5.mov',
        content: '',
        groups: [
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'video/quicktime',
        folderId: null,
        createdAt: '2022-05-19T16:25:19.765Z',
        updatedAt: '2022-05-19T16:25:19.765Z',
        owner: null
      },
      {
        id: '2b692247-1e2b-413a-bbbd-7d91f6160188',
        title: 'General Differences Between British and American English',
        type: 'FILE',
        description: 'General Differences Between British and American English',
        link: 'a2706698-0f5f-49ef-9295-77461ad903f1.pdf',
        content: '',
        groups: [
          'Students',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-03-24T14:14:44.337Z',
        updatedAt: '2022-03-24T15:15:35.504Z',
        owner: null
      },
      {
        id: '90ff32b1-dfe0-4721-a43b-99fb72ade22f',
        title: 'Quasimodo - Workpack',
        type: 'FILE',
        description: 'Material de trabajo de Quasimodo',
        link: '369e6772-6ba7-4707-b260-afe7b60ebc9c.pdf',
        content: '',
        groups: [
          'TeensI2022',
          'ElementaryI2022',
          'ElementaryII2022',
          'ElementaryIV2022',
          'ElementaryIII2022',
          'Pre-IntermediateI2022',
          'IntermediateI2022',
          'IntermediateIII2022',
          'IntermediateII2022',
          'StarterI2022',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-05-09T12:36:18.950Z',
        updatedAt: '2022-05-09T12:36:18.950Z',
        owner: null
      },
      {
        id: '4ee23724-7f1f-4fb1-99cc-f871d2f6f677',
        title: 'HYPHEN',
        type: 'FILE',
        description: 'when to use hyphens',
        link: '22651335-9b63-4edf-9ee2-799168a8d61f.docx',
        content: '',
        groups: [
          'Upper-IntermediateII2022'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-05-04T20:40:41.005Z',
        updatedAt: '2022-05-04T20:40:41.005Z',
        owner: 'b82eb088-d619-45a5-96db-70ddbaef23f6'
      },
      {
        id: '4abc99de-92b3-40a2-81b6-97a31e6f6627',
        title: 'Verbs',
        type: 'FILE',
        description: 'some exceptions that allows the ing form',
        link: '39e49a27-9b70-4930-88d7-ebac4ac4b65f.docx',
        content: '',
        groups: [
          'Upper-IntermediateII2022'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-04-27T20:58:30.174Z',
        updatedAt: '2022-04-27T20:58:30.174Z',
        owner: 'b82eb088-d619-45a5-96db-70ddbaef23f6'
      },
      {
        id: 'c740d1c7-a8cf-4dba-9c19-8e30846f8425',
        title: 'VERB AGREE',
        type: 'FILE',
        description: 'VERB AGREE',
        link: '91aeaca1-3357-4f1a-b945-637b53d7cc5c.docx',
        content: '',
        groups: [
          'Upper-IntermediateII2022'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-05-04T18:12:49.122Z',
        updatedAt: '2022-05-04T18:12:49.122Z',
        owner: 'b82eb088-d619-45a5-96db-70ddbaef23f6'
      },
      {
        id: '25b24501-efba-4a7d-9696-59936f8c3926',
        title: 'How to Pronounce ZERO in English',
        type: 'FILE',
        description: 'How to Pronounce ZERO in English',
        link: 'e3c7d55a-4fbd-4888-888d-ef1a8433db3c.pdf',
        content: '',
        groups: [
          'Students',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-03-24T14:16:02.979Z',
        updatedAt: '2022-03-24T15:15:49.671Z',
        owner: null
      },
      {
        id: '5f7e1653-07ee-4b5b-8ca4-a3bbeb34d67d',
        title: 'Términos y Condiciones ',
        type: 'FILE',
        description: 'Leé atentamente nuestros términos y condiciones 2022.',
        link: '6ed8cb22-3ccb-490f-900d-4d55da656666.pdf',
        content: '',
        groups: [
          'Students',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-03-24T14:25:23.679Z',
        updatedAt: '2022-03-24T15:16:00.389Z',
        owner: null
      },
      {
        id: '2d2b09a2-e64d-4af3-a529-6a00c05cd241',
        title: 'Revision May 18th',
        type: 'FILE',
        description: ':)',
        link: '17fe83cc-9e84-4374-abfe-b73a14820684.pdf',
        content: '',
        groups: [
          'Upper-IntermediateI2022'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-05-18T16:13:10.756Z',
        updatedAt: '2022-05-18T16:13:10.756Z',
        owner: '8cecc592-94b7-4da5-8dd6-72167caf968d'
      },
      {
        id: '6e53b94a-a727-4275-93d4-eb7e955c0536',
        title: 'Irregular Verbs List',
        type: 'FILE',
        description: 'Irregular Verbs List',
        link: '32c9bd17-bd91-493f-830d-429ab5c65a95.pdf',
        content: '',
        groups: [
          'Students',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-03-24T14:13:35.757Z',
        updatedAt: '2022-03-24T15:16:13.559Z',
        owner: null
      },
      {
        id: '7e570449-2343-4a49-b5b7-b281a6b5a029',
        title: 'HOLIDAY - MAY 18TH ',
        type: 'FILE',
        description: 'Download the PDF file and start working :) ',
        link: 'd15878a6-009b-4c30-a4a2-c8744ffe3abe.pdf',
        content: '',
        groups: [
          'ElementaryIII2022'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-05-18T15:34:10.940Z',
        updatedAt: '2022-05-18T15:34:10.940Z',
        owner: '970bc925-77a6-47c2-9b3e-f55cb9c2eeca'
      },
      {
        id: 'c197dbe8-fb6b-4fb1-b36c-67f07ee11f1f',
        title: 'Phonetics - Handout 1',
        type: 'FILE',
        description: 'Some general notions about Phonetics and English Phonology',
        link: '97bd621e-29d2-431b-8daa-2410c057a767.pdf',
        content: '',
        groups: [
          'Students',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-03-24T14:18:05.640Z',
        updatedAt: '2022-03-24T15:16:24.890Z',
        owner: null
      },
      {
        id: 'b013b2c4-4666-45b5-830c-61d95f398093',
        title: 'The Pretenders Workpack',
        type: 'FILE',
        description: 'Material de trabajo para The Pretenders',
        link: 'f06c7130-ef9e-42c5-91d6-71397b603b50.pdf',
        content: '',
        groups: [
          'Upper-IntermediateI2022',
          'IELTS2022',
          'IELTSII2022',
          'SpeakingII2022',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-05-09T12:39:32.529Z',
        updatedAt: '2022-05-09T12:39:32.529Z',
        owner: null
      },
      {
        id: 'a6ee9b7a-de82-444b-be15-8b64ff16a731',
        title: 'HOLIDAY - MAY 18TH ',
        type: 'FILE',
        description: 'Download the PDF file and start working :) ',
        link: '9f0c5297-0fbf-482e-8f46-a096df9db8bd.pdf',
        content: '',
        groups: [
          'StarterI2022'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-05-18T15:32:42.704Z',
        updatedAt: '2022-05-18T15:32:42.704Z',
        owner: '970bc925-77a6-47c2-9b3e-f55cb9c2eeca'
      },
      {
        id: 'f8b44848-9edf-4954-b932-04be804a8fcb',
        title: 'Idioms',
        type: 'FILE',
        description: 'Some common idioms in English and its equivalences in Spanish',
        link: '63514415-ca95-40bf-ab82-f315882d1a51.pdf',
        content: '',
        groups: [
          'Students',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-03-24T14:17:08.980Z',
        updatedAt: '2022-03-24T15:16:38.796Z',
        owner: null
      },
      {
        id: '7629cfcb-ac86-4332-a727-3f25eef11e42',
        title: 'Revision Unit 3',
        type: 'FILE',
        description: 'Revision May 18th',
        link: '0f71c9e2-7bd1-4386-b7be-628654df325e.pdf',
        content: 'Hello people!!! This is a revision from the last unit :) See you soon',
        groups: [
          'ElementaryII2022'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/pdf',
        folderId: null,
        createdAt: '2022-05-18T15:47:32.686Z',
        updatedAt: '2022-05-18T15:47:32.686Z',
        owner: '8cecc592-94b7-4da5-8dd6-72167caf968d'
      },
      {
        id: '2f535a07-2a58-4cf9-94b2-51a3cc1b54f3',
        title: 'English File Intermediate Workbook Audios',
        type: 'FILE',
        description: 'English File Intermediate Workbook Audios',
        link: 'a3349cc6-b86a-45a0-b019-aa1a60337d12.rar',
        content: 'Descomprimir el .rar para visualizar los archivos de manera individual.',
        groups: [
          'IntermediateII2022',
          'IntermediateI2022',
          'IntermediateIII2022',
          'IntermediateIV2022',
          'Teachers'
        ],
        uploadedBy: 'Teachsly Admin',
        mimeType: 'application/file',
        folderId: null,
        createdAt: '2022-03-28T19:23:06.036Z',
        updatedAt: '2022-03-28T19:23:06.036Z',
        owner: null
      }
    ],
    nextToken: null
  }
}

const listMediaFolderMock = {
  listMediaFolders: {
    items: [
      {
        id: '3ec2db18-a239-47c2-80b0-d5189a8e37ea',
        name: 'Expert IELTS 7.5 - Books & Audios',
        groups: [
          'IELTS2022',
          'IELTSII2022',
          'Teachers'
        ],
        createdAt: '2022-05-11T22:38:33.046Z',
        updatedAt: '2022-05-11T22:45:27.229Z',
        owner: null
      }
    ],
    nextToken: null
  }
}

const listCoursesMock = {
  listCourses: {
    items: [
      {
        id: 'feff0e42-537b-448e-b136-de6291d8175e',
        name: 'Speaking II',
        scheduleDates: [
          5
        ],
        scheduleStartTime: '13:00:00.000',
        scheduleEndTime: '15:00:00.000',
        virtualClassLink: 'https://meet.google.com/shu-shdz-hds',
        isActive: true,
        externalId: 'SpeakingII2022',
        scheduleYear: 2022,
        createdAt: '2022-05-20T16:37:49.269Z',
        updatedAt: '2022-05-20T16:37:49.269Z'
      },
      {
        id: '50dd90c3-7f23-45a7-b9e2-4162e99f60bb',
        name: 'Advanced I',
        scheduleDates: [
          4
        ],
        scheduleStartTime: '16:00:00.000',
        scheduleEndTime: '17:30:00.000',
        virtualClassLink: '',
        isActive: true,
        externalId: 'AdvancedI2022',
        scheduleYear: 2022,
        createdAt: '2022-05-20T16:38:02.698Z',
        updatedAt: '2022-05-20T16:38:02.698Z'
      },
      {
        id: '1fe7c0ef-6673-449d-956d-2cdaf7f2a6e2',
        name: 'Speaking I',
        scheduleDates: [
          1,
          4
        ],
        scheduleStartTime: '12:00:00.000',
        scheduleEndTime: '13:00:00.000',
        virtualClassLink: '',
        isActive: true,
        externalId: 'SpeakingI2022',
        scheduleYear: 2022,
        createdAt: '2022-05-20T16:37:24.697Z',
        updatedAt: '2022-05-20T16:37:24.697Z'
      }
    ],
    nextToken: null
  }
}

const deleteMediaMock = {
  deleteMedia: {
    id: 'f7eb8694-72f3-4b94-b2e4-9a47aa81891e',
    title: 'Link to Google2',
    type: 'LINK',
    description: 'Link que reenvia a Google',
    link: 'https://meet.google.com/shu-shdz-hds',
    content: '',
    groups: [
      'Students'
    ],
    uploadedBy: 'Teachsly Admin',
    mimeType: 'application/link',
    folderId: null,
    createdAt: '2022-05-20T16:38:28.416Z',
    updatedAt: '2022-05-20T16:38:42.455Z',
    owner: null
  }
}

const updateCourseMock = {
  updateCourse: {
    id: 'feff0e42-537b-448e-b136-de6291d8175e',
    name: 'Speaking II',
    scheduleDates: [
      5
    ],
    scheduleStartTime: '14:00',
    scheduleEndTime: '15:00:00.000',
    virtualClassLink: 'https://meet.google.com/chu-sadz-hds',
    isActive: true,
    externalId: 'SpeakingII2022',
    scheduleYear: 2022,
    createdAt: '2022-05-20T16:37:49.269Z',
    updatedAt: '2022-05-20T17:26:45.041Z'
  }
}

const createUserMock = {
  createUser: {
    id: '8f63c2a8-f9d0-4811-9c4c-75f33b91d6d4',
    name: 'Student Teachsly 2',
    email: 'student.teachsly@santek.dev',
    phone: '542215455611',
    cognitoId: '64b87a00-7d83-44a5-8669-e76bb9354367',
    groups: [
      'Students'
    ],
    isDisabledUser: false,
    disabledReason: null,
    createdAt: '2022-05-20T17:29:46.679Z',
    updatedAt: '2022-05-20T17:29:46.679Z'
  }
}

const updateUserMock = {
  updateUser: {
    id: '8f63c2a8-f9d0-4811-9c4c-75f33b91d6d4',
    name: 'Teachsly Student',
    email: 'student.teachsly@santek.dev',
    phone: '542215455611',
    cognitoId: '64b87a00-7d83-44a5-8669-e76bb9354367',
    groups: [
      'Students'
    ],
    isDisabledUser: false,
    disabledReason: null,
    createdAt: '2022-05-20T17:29:46.679Z',
    updatedAt: '2022-05-20T17:30:36.664Z'
  }
}

const createMediaFolderMock = {
  createMediaFolder: {
    id: 'c2429b7e-a5c2-4393-9fba-ae9a8495aebd',
    name: 'IELTS Audios',
    groups: [
      'Students'
    ],
    createdAt: '2022-05-20T17:31:58.157Z',
    updatedAt: '2022-05-20T17:31:58.157Z',
    owner: null
  }
}

const updateMediaFolderMock = {
  updateMediaFolder: {
    id: 'c2429b7e-a5c2-4393-9fba-ae9a8495aebd',
    name: 'IELTS Audios II',
    groups: [
      'Students'
    ],
    createdAt: '2022-05-20T17:31:58.157Z',
    updatedAt: '2022-05-20T17:33:19.193Z',
    owner: null
  }
}

export const graphQLMockResponses = {
  [createMedia]: createMediaMock,
  [listMedia]: listMediaMock,
  [updateMedia]: updateMediaMock,
  [deleteMedia]: deleteMediaMock,
  [listCourses]: listCoursesMock,
  [updateCourse]: updateCourseMock,
  [createUser]: createUserMock,
  [updateUser]: updateUserMock,
  [listMediaFolders]: listMediaFolderMock,
  [createMediaFolder]: createMediaFolderMock,
  [updateMediaFolder]: updateMediaFolderMock
}
