import { PersistentModelConstructor } from "@aws-amplify/datastore";
import { DataStore } from "aws-amplify";
import { LogLevel, LogTypes } from "../enums/LogTypes";
import Logger from "../utils/Logger";

const logType = LogTypes.DataStore;

class DataStoreService {
  async saveModelItem<T extends Readonly<{ id: string } & Record<string, any>>>(
    model: T
  ) {
    try {
      return await DataStore.save(model);
    } catch (e) {
      Logger.log(LogLevel.ERROR, logType, `Error when saving model`, e);
    }
  }

  async fetchModelById<
    T extends PersistentModelConstructor<
      Readonly<{ id: string } & Record<string, any>>,
      { readOnlyFields: "createdAt" | "updatedAt" }
    >
  >(model: T, itemId: string) {
    try {
      return await DataStore.query(model, itemId);
    } catch (e) {
      Logger.log(LogLevel.ERROR, logType, `Error when fetching model`, e);
    }
  }

  async deleteItem<T>(model: any, itemId: string) {
    try {
      const itemToDelete = await DataStore.query(model, itemId);
      if (itemToDelete) {
        return await DataStore.delete(itemToDelete);
      }
    } catch (e) {
      console.log(`[DATA STORE] Error when deleting ${model.toString()}: ${e}`);
    }
  }

  public async fetchAll(model: any) {
    try {
      return await DataStore.query(model);
    } catch (e) {
      console.log(`[DATA STORE] Error when fetching ${model.toString()}: ${e}`);
    }
  }
}

export default new DataStoreService();
