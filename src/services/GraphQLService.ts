import {
  graphqlOperation,
  GraphQLOptions,
  GraphQLResult
} from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify'
import { LogLevel, LogTypes } from '../enums/LogTypes'
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
}

class GraphQLService {
  public graphQL = <T extends object>(
    options: GraphQLOptions,
    additionalHeaders?: {
      [key: string]: string;
    }
  ): Promise<GraphQLResult<T>> | undefined => {
    try {
      const query = API.graphql(options, additionalHeaders) as Promise<
        GraphQLResult<T>
      >
      return query
    } catch (e) {
      console.log(e)
    }
  }

  public fetchQuery = async <T>({
    query,
    input = undefined,
    limit = undefined,
    nextToken = undefined,
    filter = undefined,
    id = undefined
  }: QueryParameters): Promise<T | undefined> => {
    try {
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
        'Error when executing GraphQL Query',
        e
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
        'Error when executing GraphQL Query',
        e
      )
    }
  }
}

export default new GraphQLService()
