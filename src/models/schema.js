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
            ],
          },
        },
      ],
    },
    Todo: {
      name: "Todo",
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
        done: {
          name: "done",
          isArray: false,
          type: "Boolean",
          isRequired: true,
          attributes: [],
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
      pluralName: "Todos",
      attributes: [
        {
          type: "model",
          properties: {},
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: "04887870ae5afc398b8a2b1ab32beebc",
};
