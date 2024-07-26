


export interface ResponseSUserType {
  id:string,
  userName:string,
  email:string,
  profile_image?:string,
  roles:string,
  verified:boolean,
  createdAt:Date,
  updatedAt:Date
  
}


export interface sendTodoSearchType{
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todoKey:string;
}


export interface WorkSpaceCollabType {
  id:string
  fullName:string;
  email:string
}
