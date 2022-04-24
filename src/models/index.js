// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MediaType = {
  "LINK": "LINK",
  "FILE": "FILE"
};

const DisabledAccountReasons = {
  "DISABLED_BY_ADMIN": "DISABLED_BY_ADMIN",
  "PAYMENT_NOT_COMPLETED": "PAYMENT_NOT_COMPLETED"
};

const { Course, MediaFolder, Media, User } = initSchema(schema);

export {
  Course,
  MediaFolder,
  Media,
  User,
  MediaType,
  DisabledAccountReasons
};