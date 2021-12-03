import { DataStore } from "aws-amplify";
import { Todo } from "../models";

class TodoService {
  async getTodos() {
    DataStore.clear();
    DataStore.start();
    return await DataStore.query(Todo);
  }
}

export default new TodoService();
