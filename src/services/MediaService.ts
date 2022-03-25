import { LogLevel, LogTypes } from '../enums/LogTypes'
import { deleteMedia, updateMedia } from '../graphql/mutations'
import { listMedia } from '../graphql/queries'
import { Media } from '../interfaces/Media'
import Logger from '../utils/Logger'
import GraphQLService from './GraphQLService'
import { removeNotAllowedPropertiesFromModel } from '../utils/GraphQLUtils'
import StorageService from './aws/StorageService'
import { DeleteMediaMutation, ListMediaQuery, UpdateMediaMutation } from '../API'

class MediaService {
  public fetchMedias = async (
    nextToken?: string | null,
    courseName?: string | undefined
  ) => {
    return GraphQLService.fetchQuery<ListMediaQuery>({
      query: listMedia,
      filter: courseName
        ? { groups: { contains: courseName } }
        : undefined,
      nextToken
    })
  }

  public updateMedia = async (media: Media) => {
    try {
      const models = await GraphQLService.fetchQuery<UpdateMediaMutation>({
        query: updateMedia,
        input: removeNotAllowedPropertiesFromModel(media)
      })

      return (models?.updateMedia as Media) || []
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
      const media = await GraphQLService.fetchQuery<DeleteMediaMutation>({
        query: deleteMedia,
        input: {
          id: mediaId
        }
      })

      return media?.deleteMedia as Media
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
    return StorageService.getSignedUrl(key)
  }

  public fetchMediaByCourse = async (courseName: string) => {
    return GraphQLService.fetchQuery<ListMediaQuery>({
      query: listMedia,
      filter: {
        name: { eq: courseName }
      }
    })
  }
}

export default new MediaService()
