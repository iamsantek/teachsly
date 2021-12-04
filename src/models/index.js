// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Course, Todo } = initSchema(schema);

export {
  Course,
  Todo
};