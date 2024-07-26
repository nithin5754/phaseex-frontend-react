


export interface CActivitySendType {
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId: string;
  activity: string;
}




export interface ResponseActivityArray {
  
  id:string;
  message:string;
  date:string


}

export interface ResponseActivityModal {
id:string;
workspaceId:string;
folderId:string;
listId:string;
taskId:string;
activity:ResponseActivityArray[]
}