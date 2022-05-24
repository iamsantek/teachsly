import { CreateMediaFolderInput, CreateMediaFolderMutation, MediaType, MediaFolder, ListMediaFoldersQuery, GetMediaFolderQuery, UpdateMediaFolderMutation, UpdateMediaFolderInput, DeleteMediaFolderMutation, UpdateMediaMutation } from '../API'
import { LogLevel, LogTypes } from '../enums/LogTypes'
import { FetchType } from '../enums/Media'
import { DeleteFolderMethod } from '../enums/MediaFolder'
import { createMediaFolder, deleteMediaFolder, updateMediaFolder } from '../graphql/mutations'
import { listMediaFolders, getMediaFolder } from '../graphql/queries'
import { Media, MediaWithFile } from '../interfaces/Media'
import Logger from '../utils/Logger'
import StorageService from './aws/StorageService'
import GraphQLService from './GraphQLService'
import MediaService from './MediaService'

class MediaFolderService {
  public addMediasToFolder = (medias: MediaWithFile[], folderId: string, uploadedBy: string, groups: string[]) => {
    return medias.map(async media => {
      const formattedMedia = {
        id: '',
        title: media.title,
        description: '',
        groups,
        link: '',
        uploadedBy,
        type: MediaType.FILE,
        folderId,
        mimeType: media.file.type
      }

      return StorageService.persistMedia(formattedMedia, media.file)
    })
  }

  public createFolder = async (folderName: string, groups: string[], uploadedBy: string, files: MediaWithFile[]) => {
    const mediaFolder: CreateMediaFolderInput = {
      name: folderName,
      groups: groups
    }

    const mediaFolderCreated = await GraphQLService.fetchQuery<CreateMediaFolderMutation>({
      query: createMediaFolder,
      input: mediaFolder
    })

    const mediaFolderId = mediaFolderCreated?.createMediaFolder?.id

    if (mediaFolderId) {
      const mediasToFolderPromises = this.addMediasToFolder(files, mediaFolderId, uploadedBy, groups)
      await Promise.all(mediasToFolderPromises)

      return mediaFolderCreated.createMediaFolder as MediaFolder
    }
  }

  public fetchMediaFolders = async (fetchType: FetchType = FetchType.ALL, courseId?: string) => {
    const fetchFilter = {
      [FetchType.ALL]: undefined,
      [FetchType.COURSE]: {
        groups: { contains: courseId }
      },
      [FetchType.FOLDER]: {}
    }

    return GraphQLService.fetchQuery<ListMediaFoldersQuery>({
      query: listMediaFolders,
      filter: fetchFilter[fetchType]
    })
  }

  public fetchMediaFolderById = async (folderId?: string) => {
    
    if (!folderId) {
      return
    }

    return GraphQLService.fetchQuery<GetMediaFolderQuery>({
      query: getMediaFolder,
      id: folderId
    })
  }

  public updateFolder = async (folder: UpdateMediaFolderInput) => {
    try {
      const models = await GraphQLService.fetchQuery<UpdateMediaFolderMutation>({
        query: updateMediaFolder,
        input: folder
      })

      return models
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.MediaFolderService,
        'Error when updating Media Folder',
        error
      )
    }
  }

  public deleteMediaFolder = async (folderId: string, deleteMethod: DeleteFolderMethod) => {
    const deleteMediaFolder = await this.deleteMediaFolderById(folderId)
    let updatePromises: Promise<Media | UpdateMediaMutation | undefined>[] | undefined = []

    if (!deleteMediaFolder?.deleteMediaFolder) {
      return
    }

    const medias = await MediaService.fetchMediaByFolderId(folderId, undefined)

    updatePromises = medias?.listMedia?.items.filter(Boolean).map(media => {
      if (deleteMethod === DeleteFolderMethod.DELETE_FOLDER) {
        // Update all medias to root folder
        return MediaService.updateMedia({
          ...media,
          id: media?.id as string,
          folderId: null
        })
      } else {
        return MediaService.deleteMedia(media?.id as string)
      }
    })
    if (updatePromises) {
      const allPromisesCompleted = await Promise.all(updatePromises)

      return allPromisesCompleted.every(Boolean)
    }
  }

  public deleteMediaFolderById = async (folderId: string) => {
    return GraphQLService.fetchQuery<DeleteMediaFolderMutation>({
      query: deleteMediaFolder,
      input: {
        id: folderId
      }
    })
  }
}

export default new MediaFolderService()
