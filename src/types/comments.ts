

export interface SCreateTopComment{
   
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todoId:string;
  message:string;
}



export interface SendGetAllComment {
   
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todoId:string;
  
}


export interface ResponseCommentList {
  id:string;
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todoId:string;
  message:string;
  userId:string;
  parent:string|null;
  children:ResponseCommentList[]|[]
  createdAt:string;
  updatedAt:string; 
}

