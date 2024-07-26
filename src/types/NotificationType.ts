


  export interface NotificationDetailsType {
    id:string;
    ownerId:string;
    senderId:string;
    link:string;
    priority:string;
    messageSendBy:string;
    workspaceName:string;
    messageReceiver:string;
    Description:string;
    title:string;
    type:string;
    read:boolean;
    createdAt:string;
    updatedAt:string;
  }




  export interface ReceiveNotificationVideoType {
    senderId:string
    ownerName:string
    workspaceId:string
    url:string
    type:string
  }

  

  export interface TVideoInviteLink {

    id:string;
    senderId:string;
    workspaceId:string;
    ownerName:string;
    url:string;
    type:"video"|"chat"
    createdAt:string


 }