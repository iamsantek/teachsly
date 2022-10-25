import { LogLevel, LogTypes } from '../enums/LogTypes'
import { deleteMedia, updateMedia } from '../graphql/mutations'
import { getMedia, listMedia } from '../graphql/queries'
import { Media } from '../interfaces/Media'
import { Media as MediaAPI, DeleteMediaMutation, ListMediaQuery, MediaType, UpdateMediaMutation, UpdateMediaInput, GetMediaQuery, EnglishLevel } from '../API'
import Logger from '../utils/Logger'
import GraphQLService from './GraphQLService'
import { removeNotAllowedPropertiesFromModel } from '../utils/GraphQLUtils'
import StorageService from './aws/StorageService'

class MediaService {
  public fetchMedias = async (
    nextToken?: string | null,
    courseName?: string | undefined
  ) => {
    return GraphQLService.fetchQuery<ListMediaQuery>({
      query: listMedia,
      filter: courseName
        ? {
          groups: { contains: courseName },
          folderId: { attributeExists: false }
        }
        : { folderId: { attributeExists: false } },
      nextToken
    })
  }

  public updateMedia = async (media: UpdateMediaInput) => {
    try {
      return GraphQLService.fetchQuery<UpdateMediaMutation>({
        query: updateMedia,
        input: removeNotAllowedPropertiesFromModel(media)
      })
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

  public getMediaLink = async (key: string, type: MediaType) => {
    if (type === MediaType.LINK) {
      return key
    }

    const signedUrl = await this.generateSignedUrl(key)

    return signedUrl?.url as string
  }

  public fetchMediaByCourseId = async (courseId: string | undefined, englishLevel: EnglishLevel, includeMediaInsideFolders: boolean = false, nextToken?: string | undefined | null) => {
    if (!courseId) {
      return
    }

    return GraphQLService.fetchQuery<ListMediaQuery>({
      query: listMedia,
      nextToken,
      filter: {
        and: [
          {
            or: [
              { groups: { contains: courseId } },
              englishLevel && { groups: { contains: englishLevel } },
            ].filter(x => x)
          },
          { folderId: { attributeExists: includeMediaInsideFolders } },
        ]
      }
    })
  }

  public fetchMediaByFolderId = async (folderId: string | undefined, nextToken: string | null | undefined) => {
    if (!folderId) {
      return
    }

    return GraphQLService.fetchQuery<ListMediaQuery>({
      query: listMedia,
      filter: {
        folderId: { eq: folderId }
      },
      nextToken
    })
  }

  public fetchMediaById = async (mediaId: string) => {
    return GraphQLService.fetchQuery<GetMediaQuery>({
      query: getMedia,
      id: mediaId
    })
  }

  public redirectToMediaUrl = async (media: MediaAPI | Media) => {
    if (media?.type === MediaType.LINK) {
      window.open(media.link, '_blank')
      return
    }

    const signedUrl = await this.getMediaLink(media.link, media.type)

    const isAudioOrVideo = media?.mimeType?.includes('audio') || media?.mimeType?.includes('video')

    window.open(isAudioOrVideo ? `/play/${media.id as string}` : signedUrl, '_blank')
  }
}

export default new MediaService()
