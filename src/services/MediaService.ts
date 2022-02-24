import { graphqlOperation } from 'aws-amplify'
import { LogLevel, LogTypes } from '../enums/LogTypes'
import { deleteMedia, updateMedia } from '../graphql/mutations'
import { listMedia } from '../graphql/queries'
import { Media } from '../interfaces/Media'
import Logger from '../utils/Logger'
import GraphQLService, { GraphQLResultWithNextToken } from './GraphQLService'
import { removeNotAllowedPropertiesFromModel } from '../utils/GraphQLUtils'
import StorageService from './aws/StorageService'

class MediaService {
  public fetchMedias = async (
    nextToken?: string
  ): Promise<GraphQLResultWithNextToken<Media> | undefined> => {
    return GraphQLService.fetchQuery({
      query: listMedia,
      nextToken
    })
  }

  public updateMedia = async (media: Media) => {
    try {
      const models = await GraphQLService.graphQL<any>(
        graphqlOperation(updateMedia, {
          input: removeNotAllowedPropertiesFromModel(media)
        })
      )

      return (models?.data?.updateMedia as Media) || []
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        'Error when updating Media',
        error
      )
    }
  }

  public deleteMedia = async (mediaId: string) => {
    try {
      const media = await GraphQLService.graphQL<any>(
        graphqlOperation(deleteMedia, {
          input: {
            id: mediaId
          }
        })
      )

      return media?.data?.deleteMedia as Media
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        'Error when deleting a Media',
        error
      )
    }
  }

  public generateSignedUrl = async (key: string) => {
    const signedURL = await StorageService.getSignedUrl(key)

    if (signedURL) {
      window.open(signedURL, '_blank')
    }
  }
}

export default new MediaService()
