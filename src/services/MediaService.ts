import { graphqlOperation } from "aws-amplify";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { deleteMedia, updateMedia } from "../graphql/mutations";
import { listMedia } from "../graphql/queries";
import { Media } from "../interfaces/Media";
import Logger from "../utils/Logger";
import GraphQLService from "./GraphQLService";
import { Media as ModelMedia } from "../models/index";
import { removeNotAllowedPropertiesFromModel } from "../utils/GraphQLUtils";

class MediaService {
  public fetchMedias = async () => {
    try {
      const models = await GraphQLService.graphQL<any>(
        graphqlOperation(listMedia)
      );
      return (models?.data?.listMedia.items as Media[]) || [];
    } catch (e) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when fetching Media",
        e
      );
    }
  };

  public updateMedia = async (media: Media) => {
    try {
      const models = await GraphQLService.graphQL<any>(
        graphqlOperation(updateMedia, {
          input: removeNotAllowedPropertiesFromModel(media),
        })
      );

      return (models?.data?.updateMedia as Media) || [];
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when updating Media",
        error
      );
    }
  };

  public deleteMedia = async (mediaId: string) => {
    try {
      const media = await GraphQLService.graphQL<any>(
        graphqlOperation(deleteMedia, {
          input: {
            id: mediaId,
          },
        })
      );

      return media?.data?.deleteMedia as Media;
    } catch (error) {
      Logger.log(
        LogLevel.ERROR,
        LogTypes.CourseService,
        "Error when deleting a Media",
        error
      );
    }
  };
}

export default new MediaService();
