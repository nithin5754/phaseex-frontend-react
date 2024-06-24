


export interface TodoType {
  id:string;
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todo:string;
  assignee:string;
  todo_status:"in progress"|"completed"|"hidden";
  createdAt:string,
  updatedAt:string
}


export interface SendTodoTask {
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todo:string;
}


export interface SendTodoCheckBox {

  workspaceId:string
  folderId:string
  todo_status:"in progress"|"completed"|"hidden"
  listId:string
  taskId:string
  id:string
}




// export interface SendUpdateTodoTask {
//   workspaceId:string,
//   folderId:string,
//   todo:string,
//   listId:string,
//   taskId:string,
//   id:string
// }



export interface SendEditTodoTask {
  workspaceId:string,
  folderId:string,
  todo:string,
  listId:string,
  taskId:string,
  todoId:string
  
}






export interface SendDeleteTodoTask {
  workspaceId:string,
  folderId:string,
  listId:string,
  taskId:string,
  todoId:string
  
}


export interface SendAddCollabTodoTask {
  workspaceId:string,
  folderId:string,
  listId:string,
  taskId:string,
  todoId:string
  collabId:string
  
}







