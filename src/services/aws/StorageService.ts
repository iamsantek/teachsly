import { Storage } from "@aws-amplify/storage";
import { graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import awsmobile from "../../aws-exports";
import { LogLevel, LogTypes } from "../../enums/LogTypes";
import { UserTypes } from "../../enums/UserTypes";
import { createMedia } from "../../graphql/mutations";
import { Media as PlatformMedia } from "../../interfaces/Media";
import { Media } from "../../models";
import Logger from "../../utils/Logger";
import GraphQLService, { GraphQLResultType } from "../GraphQLService";

class StorageService {
  private getExtensionType = (file: File) =>
    file.name.slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2);

  public uploadToS3 = async (file: File | undefined) => {
    try {
      if (!file) {
        return;
      }

      const fileExtension = this.getExtensionType(file);
      const fileName = `${uuidv4()}.${fileExtension}`;
      
      Storage.configure({
        region: "us-east-1",
        bucket: "theofficeenglish63ca63e9fc534941b077cff980406a8225223-dev"
      })

      return await Storage.put(fileName, file, {
        // acl: "public-read", // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#upload-property
        metadata: { key: "Test" }, // (map<String>) A map of metadata to store with the object in S3.
        contentType: file.type,
      });
    } catch (error) {
      console.log(error);
      Logger.log(
        LogLevel.ERROR,
        LogTypes.StorageService,
        "Error when uploading media to S3",
        error
      );
    }
  };

  public persistMedia = async (media: PlatformMedia, file?: File) => {
    const fileUploaded = await this.uploadToS3(file);
    const { title, description, type, groups } = media;

    if (!fileUploaded) {
      return;
    }

    const groupsWithAdminAccess = [...groups, UserTypes.ADMIN]

    try {
      const link = fileUploaded.key;
      const media = new Media({
        title,
        description,
        link,
        type,
        groups: groupsWithAdminAccess,
      });

      const response = await GraphQLService.graphQL(
        graphqlOperation(createMedia, { input: media })
      );

      if (response) {
        const results = response as GraphQLResultType<Media>;
        return results?.data?.createMedia as Media || null;
      }
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.StorageService,
        "Error when uploading media to the database",
        error
      );
    }
  };
}

export default new StorageService();
