

export interface Attachment {
  id:string
  name: string;
  url: string;
  description:string;
}

export interface AttachmentSliceType {
  id:string;
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string
  attachmentLists: Attachment[];
}


export interface SendAttachment {
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string
  attachmentFile:FormData
  attachmentName:string
  attachment_description:string
}