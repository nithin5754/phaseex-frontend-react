import { ResponseTaskType } from "@/types";
import {
  ListCollaboratorType,
  ResponseListDataType,
} from "../redux/api/listapi";
import { TodoType } from "@/types/TodoType";
import { ReceiveCollaboratorType } from "../redux/api/spaceApi";
import { Project } from "@/components/review/review.type";

export interface IListContext {
  workspaceId: string;
  folderId: string;
  listId: string;
  list: ResponseListDataType;
}



export interface IReviewContext {
  project:Project
}


export interface IAddReviewContext {

  list: ResponseListDataType;
}

export interface IListsContext {
  isLoading: boolean;
  isError: boolean;
  workspaceId: string;
  folderId: string;

  listId: string;
  lists?: ResponseListDataType;
  isManagerExists: boolean;
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

export interface IListsContext {}
