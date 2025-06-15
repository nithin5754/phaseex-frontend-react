
export interface IMember {
  userId: string;
  role: "admin" | "member";
  joinedAt: Date;
}

export interface IChatResponse {
  id: string;
  workspaceId: string;
  members: IMember[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IReadBy {
  userId: string;
  readAt: Date;
}

export interface IMessageResponse {
  id: string;
  chatId: string;
  senderId: string;
  senderUsername: string;
  content: string;
  type: "text" | "image" | "file" | "system";
  readBy: IReadBy[];
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateChatPayload = Omit<IChatResponse, "id" | "createdAt" | "updatedAt">;

export type ICreateMessagePayload = Omit<
  IMessageResponse,
  "createdAt" | "updatedAt" | "id" | "deletedAt"
>;


