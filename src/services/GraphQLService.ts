import {
  graphqlOperation,
  GraphQLResult
} from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify'
import { LogLevel, LogTypes } from '../enums/LogTypes'
import { graphQLMockResponses } from '../mocks/mocks'
import { removeNotAllowedPropertiesFromModel } from '../utils/GraphQLUtils'
import Logger from '../utils/Logger'
interface SingleResult<T> {
  [key: string]: T | Array<T>;
}
export interface GraphQLResultType<T> {
  data?: SingleResult<T>;
  errors?: object;
}

type QueryInput = string | Object;

export interface FilterInput {
  filter: Object;
}

type QueryParameters = {
  query: string;
  input?: QueryInput | undefined;
  nextToken?: string | null;
  filter?: Object | undefined;
  limit?: number | null;
  id?: Object | undefined;
  isMockData?: boolean;
}

class GraphQLService {
  mockupData: boolean = true

  public fetchQuery = async <T>({
    query,
    input = undefined,
    limit = undefined,
    nextToken = undefined,
    filter = undefined,
    id = undefined,
    isMockData = true
  }: QueryParameters): Promise<T | undefined> => {
    try {
      if (isMockData) {
        console.log({ query })
        console.log((graphQLMockResponses as any)[query])
        return (graphQLMockResponses as any)[query]
      }

      const sanitizedInput = removeNotAllowedPropertiesFromModel(input)

      const models = await API.graphql(
        graphqlOperation(query, {
          input: sanitizedInput,
          filter,
          limit,
          nextToken,
          id
        })
      ) as GraphQLResult<T>

      return models.data as T
    } catch (e: any) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.GraphQLService,
        'Error when executing GraphQL fetch query',
        e,
        {
          query,
          input,
          limit,
          nextToken,
          filter,
          id
        }
      )
    }
  }

  public fetchById = async <T>(
    query: string,
    filter: Object
  ) => {
    try {
      const models = await API.graphql(
        graphqlOperation(query, filter)
      ) as GraphQLResult<T>

      return models.data as T
    } catch (e: any) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.GraphQLService,
        'Error when executing GraphQL fetchById Query',
        e,
        {
          query,
          filter
        }
      )
    }
  }
}

export default new GraphQLService()
