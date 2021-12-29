import { graphqlOperation } from "aws-amplify";
import { Media } from "../API";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import { listMedia } from "../graphql/queries";
import Logger from "../utils/Logger";
import GraphQLService from "./GraphQLService";

class MediaService {
  public fetchMedia = async () => {
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
}

export default new MediaService();
