import { apiSlice } from "./apiSlice";

export interface CollaboratorType {
  assigneeId: string;
  role: SpaceRole;
  verified: boolean;
}

export interface ResponseWorkspaceDataType {
  id: string;
  workspaceOwner: string;
  title: string;
  workspace_description: string;
  collaborators: CollaboratorType[];
  workspaceType: string;
  createdAt: Date;
  active: boolean;
  updatedAt: Date;
}

export interface SpaceDataType {
  workspaceOwner: string;
  workspace_description: string;
  title: string;
  workspaceType: string;
}
export type SpaceRole = "developer" | "manager" | "viewer" | "owner";
export interface SpaceCollabSendType {
  workspaceId: string;
  collaboratorId: string;
}

export interface ReceiveCollaboratorType {
  assignee: string; 
  role: SpaceRole;
  id: string;
  verified: boolean;
}

export const workApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSpace: builder.mutation<any, SpaceDataType>({
      query: (credentials) => ({
        url: "/space/workspace",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Workspace"],
    }),

    getSingleWorkSpace: builder.query<
      ResponseWorkspaceDataType & { ownerName: string },
      string
    >({
      query: (id: string) => ({
        url: `/space/workspace/details/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
    }),

    getAllSpaces: builder.query<ResponseWorkspaceDataType[], void>({
      query: () => ({
        url: `/space/workspace`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: ["Workspace"],
    }),

    getAllHiddenSpaces: builder.query<ResponseWorkspaceDataType[], void>({
      query: () => ({
        url: `/space/workspace/hidden`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: ["Workspace"],
    }),

    getAllInvitedSpaces: builder.query<ResponseWorkspaceDataType[], void>({
      query: () => ({
        url: `/space/workspace/invited`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: ["Workspace"],
    }),

    getAllOwnerSpaces: builder.query<ResponseWorkspaceDataType[], void>({
      query: () => ({
        url: `/space/workspace/owner`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: ["Workspace"],
    }),

    changeVisiblity: builder.mutation<boolean, { id: string }>({
      query: (credentials) => ({
        url: "/space/workspace/change/visibility",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Workspace"],
    }),

    addCollaborators: builder.mutation<boolean, SpaceCollabSendType>({
      query: (credentials) => ({
        url: "/space/workspace/add/members",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Workspace"],
    }),

    getAllCollabInSpace: builder.query<ReceiveCollaboratorType[], string>({
      query: (id: string) => ({
        url: `/space/workspace/members/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: (_result, _error, id) => [
        { type: "Collaborators", id },
        "Workspace",
      ],
    }),

    deleteCollaborator: builder.mutation<boolean, SpaceCollabSendType>({
      query: (credentials) => ({
        url: "/space/workspace/delete/members",
        method: "DELETE",
        body: { ...credentials },
      }),

      invalidatesTags: (_result, _error, { workspaceId }) => [
        { type: "Collaborators", id: workspaceId },
        "Workspace",
      ],
    }),

    verifyCollaborators: builder.mutation<boolean, SpaceCollabSendType>({
      query: (credentials) => ({
        url: "/space/workspace/verify/member",
        method: "PATCH",
        body: { ...credentials },
      }),

      invalidatesTags: (_result, _error, { workspaceId }) => [
        { type: "Collaborators", id: workspaceId },
        "Workspace",
      ],
    }),

    /**
     * @param {workspaceId}
     * @api {/delete-workSpace/:workspaceId}
     * @return {boolean}
     */

    deleteWorkSpace: builder.mutation<boolean, { workspaceId: string }>({
      query: ({ workspaceId }) => ({
        url: `/space/workspace/delete/${workspaceId}`,
        method: "POST",
      }),
      invalidatesTags: (_result, _error, { workspaceId }) => [
        { type: "Collaborators", id: workspaceId },
        "Workspace",
      ],
    }),


  }),
});

/**
 * @main
 */

export const {
  useCreateSpaceMutation,
  useGetAllSpacesQuery,
  useChangeVisiblityMutation,
  useGetSingleWorkSpaceQuery,
  useAddCollaboratorsMutation,
  useGetAllCollabInSpaceQuery,
  useDeleteCollaboratorMutation,
  useVerifyCollaboratorsMutation,
  useDeleteWorkSpaceMutation,
  useGetAllHiddenSpacesQuery,
  useGetAllInvitedSpacesQuery,
  useGetAllOwnerSpacesQuery,
} = workApiSlice;
