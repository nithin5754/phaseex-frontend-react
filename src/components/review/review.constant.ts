
import { Project} from "./review.type";


export const projectData: Project = {
  id: "PRJ-001",
  title: "Sample Project",
  description: "Development of a new user authentication module",
  attempt: 0,
  status: "Pending",
  createdAt: "2025-06-15T10:00:00Z",
  featureDueDate: "2025-06-25T23:59:59Z",
  assignee: {
    id: "USR-101",
    name: "Jane Roe",
    email: "jane.roe@company.com",
  },
  reviewers: [{
    id: "USR-102",
    name: "John Doe",
    email: "john.doe@company.com",
  }],
  reviewerLogs: [
    {
      id: "USR-103",
      name: "Alice Smith",
      email: "alice.smith@company.com",
      suggestion: "Looks good, but consider adding more test cases for edge scenarios.",
      approvalStatus: "Approved",
      reviewedAt: "2025-06-18T14:20:00Z",
    },
    {
      id: "USR-104",
      name: "Bob Johnson",
      email: "bob.johnson@company.com",
      suggestion: "Needs clarification on the implementation details for OAuth integration.",
      approvalStatus: "Pending",
      reviewedAt: "2025-06-18T14:20:00Z",
    },
  ],
  comments: [
    {
      commentId: "CMT-001",
      author: {
        id: "USR-103",
        name: "Alice Smith",
      },
      content: "Please verify the security requirements for the login flow.",
      createdAt: "2025-06-18T14:25:00Z",
      replies: [
        {
          commentId: "CMT-002",
          author: {
            id: "USR-101",
            name: "Jane Roe",
          },
          content: "Added security checks for JWT expiration.",
          createdAt: "2025-06-19T09:10:00Z",
        },
      ],
    },
  ],
  approved: false,

  dependencies: [
    {
      id: "PRJ-002",
      title: "Database Schema Update",
      description: 'hello ',
      link: "www.phaseex.live",
    },
  ],
  attachments: [
    {
      fileId: "FILE-001",
      name: "auth_spec.pdf",
      url: "https://storage.company.com/files/auth_spec.pdf",
      uploadedBy: "USR-101",
      uploadedAt: "2025-06-16T12:00:00Z",
    },
  ],
  message: [],
  workspaceId: "",
  listId: "",
  folderId: ""
};










