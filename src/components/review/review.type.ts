export interface User {
  id: string;
  name: string;
  email?: string;
}
export interface ProjectReviewer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  approvalStatus: "Approved" | "Rejected" | "Pending";
  reviewedAt?: string | Date;
  suggestion?: string;
}
export interface Reply {
  commentId: string;
  author: User;
  content: string;
  createdAt: string;
}

export interface Comment {
  commentId: string;
  author: User;
  content: string;
  createdAt: string;
  replies: Reply[];
}

export interface Attachment {
  fileId: string;
  name: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface Dependency {
  id: string;
  title: string;
  description: String;
  link: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  attempt: number;
  status: "Approved" | "Rejected" | "Pending" | "Completed";
  createdAt: string;
  message:string[];
  featureDueDate: string;
  assignee: User;
  reviewers: User[];
  reviewerLogs: ProjectReviewer[];
  comments: Comment[];
  approved: boolean;
  workspaceId: string;
  listId: string;
  folderId: string;
  dependencies: Dependency[];
  attachments: Attachment[];
}
