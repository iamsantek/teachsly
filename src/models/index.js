// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MediaType = {
  "LINK": "LINK",
  "FILE": "FILE",
  "VIDEO": "VIDEO"
};

const DisabledAccountReasons = {
  "DISABLED_BY_ADMIN": "DISABLED_BY_ADMIN",
  "PAYMENT_NOT_COMPLETED": "PAYMENT_NOT_COMPLETED"
};

const { Course, Media, User } = initSchema(schema);

export {
  Course,
  Media,
  User,
  MediaType,
  DisabledAccountReasons
};