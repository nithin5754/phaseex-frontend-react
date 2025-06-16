import { ResponseTaskType } from "@/types";
import {
  ListCollaboratorType,
  ResponseListDataType,
} from "../redux/api/listapi";
import { TodoType } from "@/types/TodoType";
import { ReceiveCollaboratorType } from "../redux/api/spaceApi";

export interface IListContext {
  workspaceId: string;
  folderId: string;
  listId: string;
  list: ResponseListDataType;

}

export interface ITaskContext {
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId: string;
  task: ResponseTaskType;
  spaceAllMembers: ReceiveCollaboratorType[];
    listCollaborators: ListCollaboratorType[];
}

export interface ITodoContext {
  todoId: string;
  todo: TodoType;
  handleChangeCheckBox: (todo: TodoType) => Promise<void>;
  loadingStates: {
    [key: string]: boolean;
  };
}
