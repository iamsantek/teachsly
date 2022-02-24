import {
  graphqlOperation,
  GraphQLOptions,
  GraphQLResult
} from '@aws-amplify/api-graphql'
import { API } from 'aws-amplify'
import { GRAPHQL_MAX_PAGE_RESULTS } from '../constants/GraphQL'
import { LogLevel, LogTypes } from '../enums/LogTypes'
import Logger from '../utils/Logger'

export interface GraphQLResultWithNextToken<T> {
  items: T | T[];
  nextToken: string;
}

interface SingleResult<T> {
  [key: string]: T | Array<T>;
}
export interface GraphQLResultType<T> {
  data?: SingleResult<T>;
  errors?: object;
}

interface QueryInput {
  input: string;
}

export interface FilterInput {
  filter: Object;
}

type QueryParameters = {
  query: string;
  input?: QueryInput | undefined;
  nextToken?: string | undefined;
  filter?: FilterInput | undefined;
  limit?: number;
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
    limit = GRAPHQL_MAX_PAGE_RESULTS,
    nextToken = undefined,
    filter = undefined
  }: QueryParameters): Promise<GraphQLResultWithNextToken<T> | undefined> => {
    try {
      const models = await API.graphql(
        graphqlOperation(query, {
          input,
          filter,
          limit,
          nextToken
        })
      ) as GraphQLResult

      // TODO: Improve this weird handling to get the results from GraphQL
      const result: {[key: string]: any} = models.data as object
      const queryKey = Object.entries(result)[0][0]

      return result[queryKey]
    } catch (e) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.GraphQLService,
        'Error when executing Graph QL Query',
        e
      )
    }
  }
}

export default new GraphQLService()
