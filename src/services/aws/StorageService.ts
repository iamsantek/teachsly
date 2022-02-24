import { Storage } from '@aws-amplify/storage'
import { graphqlOperation } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import { LogLevel, LogTypes } from '../../enums/LogTypes'
import { UserTypes } from '../../enums/UserTypes'
import { createMedia } from '../../graphql/mutations'
import { Media as PlatformMedia } from '../../interfaces/Media'
import { Media } from '../../models'
import Logger from '../../utils/Logger'
import GraphQLService, { GraphQLResultType } from '../GraphQLService'

class StorageService {
  private getExtensionType = (file: File) =>
    file.name.slice(((file.name.lastIndexOf('.') - 1) >>> 0) + 2)

  public getSignedUrl = async (key: string) => {
    try {
      const signedURL = await Storage.get(key)

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
      console.log(error)
      Logger.log(
        LogLevel.ERROR,
        LogTypes.StorageService,
        'Error when uploading media to S3',
        error
      )
    }
  }

  public persistMedia = async (media: PlatformMedia, file?: File) => {
    const fileUploaded = await this.uploadToS3(file)
    const { title, description, type, groups, content } = media

    try {
      const filterGroups = (groups as string[]).filter((group) => group)

      const media = new Media({
        title,
        description,
        link: fileUploaded?.key || '',
        type,
        content,
        groups: [UserTypes.ADMIN, ...(filterGroups as string[])]
      })

      const createdMedia = await GraphQLService.graphQL(
        graphqlOperation(createMedia, { input: media })
      )

      if (createdMedia) {
        const results = createdMedia as GraphQLResultType<Media>
        return (results?.data?.createMedia as PlatformMedia) || null
      }
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
