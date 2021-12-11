export const schema = {
  models: {
    Course: {
      name: "Course",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        teacher: {
          name: "teacher",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        scheduleDate: {
          name: "scheduleDate",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        scheduleStartTime: {
          name: "scheduleStartTime",
          isArray: false,
          type: "AWSTime",
          isRequired: true,
          attributes: [],
        },
        scheduleEndTime: {
          name: "scheduleEndTime",
          isArray: false,
          type: "AWSTime",
          isRequired: true,
          attributes: [],
        },
        students: {
          name: "students",
          isArray: true,
          type: {
            model: "CourseStudents",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "course",
          },
        },
        teachers: {
          name: "teachers",
          isArray: true,
          type: {
            model: "CoursesTeachers",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "course",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "Courses",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
              {
                allow: "private",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    Student: {
      name: "Student",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        courses: {
          name: "courses",
          isArray: true,
          type: {
            model: "CourseStudents",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "student",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "Students",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
    Teacher: {
      name: "Teacher",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        name: {
          name: "name",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        userId: {
          name: "userId",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        students: {
          name: "students",
          isArray: true,
          type: {
            model: "CoursesTeachers",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "teacher",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "Teachers",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
    Media: {
      name: "Media",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        title: {
          name: "title",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        description: {
          name: "description",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        link: {
          name: "link",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        groups: {
          name: "groups",
          isArray: true,
          type: "String",
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "Media",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                groupClaim: "cognito:groups",
                provider: "userPools",
                allow: "groups",
                groupsField: "groups",
                groupField: "groups",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    CourseStudents: {
      name: "CourseStudents",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        courseID: {
          name: "courseID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        studentID: {
          name: "studentID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        course: {
          name: "course",
          isArray: false,
          type: {
            model: "Course",
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "courseID",
          },
        },
        student: {
          name: "student",
          isArray: false,
          type: {
            model: "Student",
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "studentID",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "CourseStudents",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
    CoursesTeachers: {
      name: "CoursesTeachers",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        courseID: {
          name: "courseID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        teacherID: {
          name: "teacherID",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        course: {
          name: "course",
          isArray: false,
          type: {
            model: "Course",
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "courseID",
          },
        },
        teacher: {
          name: "teacher",
          isArray: false,
          type: {
            model: "Teacher",
          },
          isRequired: true,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "teacherID",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "CoursesTeachers",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
  },
  enums: {
    MediaType: {
      name: "MediaType",
      values: ["LINK", "PDF", "VIDEO"],
    },
  },
  nonModels: {},
  version: "4b8416d016f6fd299bc1ba039c8b0af7",
};
