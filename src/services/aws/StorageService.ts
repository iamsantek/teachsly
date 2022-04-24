import { Storage } from '@aws-amplify/storage'
import { v4 as uuidv4 } from 'uuid'
import { CreateMediaInput, CreateMediaMutation } from '../../API'
import { LogLevel, LogTypes } from '../../enums/LogTypes'
import { createMedia } from '../../graphql/mutations'
import { Media } from '../../models'
import Logger from '../../utils/Logger'
import GraphQLService from '../GraphQLService'
import CloudFrontService from './CloudFrontService'

class StorageService {
  private getExtensionType = (file: File) =>
    file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2)

  public getSignedUrl = async (key: string) => {
    try {
      const signedURL = await CloudFrontService.getCDNUrl(key)

      return signedURL
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.StorageService,
        `Error when fetching media ${key} from S3`,
        error
      )
    }
  }

  private generateFileName = (file: File) => {
    const fileExtension = this.getExtensionType(file)

    return `${uuidv4()}.${fileExtension}`
  }

  public uploadToS3 = async (file: File | undefined) => {
    try {
      if (!file) {
        return
      }

      const fileName = this.generateFileName(file)

      return await Storage.put(fileName, file, {
        // acl: "public-read", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
        contentType: file.type
      })
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.StorageService,
        'Error when uploading media to S3',
        error
      )
    }
  }

  public persistMedia = async (media: CreateMediaInput, file?: File) => {
    const fileUploaded = await this.uploadToS3(file)
    const { title, description, type, groups, content, uploadedBy, link, folderId, mimeType } = media as CreateMediaInput

    try {
      const filterGroups = (groups as string[]).filter((group) => group)

      const media = new Media({
        title,
        description: description || '',
        link: fileUploaded?.key || link,
        type,
        content: content as string,
        uploadedBy,
        groups: filterGroups as string[],
        folderId: folderId as string | undefined,
        mimeType: mimeType || file?.type
      })

      return GraphQLService.fetchQuery<CreateMediaMutation>({
        query: createMedia,
        input: media
      })
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.StorageService,
        'Error when uploading media to the database',
        error
      )
    }
  }
}

export default new StorageService()
