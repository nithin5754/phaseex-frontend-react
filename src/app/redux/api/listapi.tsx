import { apiSlice } from "./apiSlice";

export interface ListType {
  list_title: string;
  list_description: string;
  priority_list: string;
  list_start_date:string,
  list_due_date:string,
}

export interface SendListData {
  folderId: string;
  workspaceId: string;
  listData: ListType;
}


export interface ListCollaboratorType {
  assignee: string; 
  role:"developer"|"listManager"|"spaceOwner"|"viewer";
}

export interface ResponseListDataType {
  id: string;
  list_title: string;
  list_description: string;
  workspaceId: string;
  priority_list: string;
  progressTask:number;
  list_start_date:string,
  list_collaborators:ListCollaboratorType[];
  list_due_date:string,
  folderId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ListDataTypePage {
  lists: ResponseListDataType[];
  total: number;
}

export interface SendPriorityListType {
  priority: string;
  workspaceId: string;
  folderId: string;
  listId: string;
}

export interface SendDateListType {
  list_start_date: string;
  list_due_date:string;
  workspaceId: string;
  folderId: string;
  listId: string;
}



export interface SendAddCollabListType {

  workspaceId: string;
  folderId: string;
  listId: string;
  collabId:string;

}





export interface ListCollaboratorDetailType {
  id:string;
  fullName: string; 
  email:string
  imageUrl:string;
  role:"listManager"|"spaceOwner"|"viewer";
}


export const listApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateList: builder.mutation<ResponseListDataType, SendListData>({
      query: (credentials) => ({
        url: "/list/create",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["ListSpace"],
    }),

    onUpdatePriorityList: builder.mutation<boolean, SendPriorityListType>({
      query: (credentials) => ({
        url: `/list/update-priority-list/${credentials.listId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: ["ListSpace"],
    }),

    onUpdateDateList: builder.mutation<boolean, SendDateListType>({
      query: (credentials) => ({
        url: `/list/update-date-list/${credentials.listId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: ["ListSpace"],
    }),

    getAllList: builder.query<
      ResponseListDataType[],
      { workspaceId: string; folderId: string }
    >({
      query: ({ workspaceId, folderId }) => ({
        url: `/list/get-all-list?workspaceId=${workspaceId}&folderId=${folderId}`,
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["ListSpace"],
    }),


    getSingleList: builder.query<
    ResponseListDataType,
    { workspaceId: string; folderId: string,listId:string }
  >({
    query: ({ workspaceId, folderId,listId }) => ({
      url: `/list/get-single-list?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}`,
      validateStatus: (
        response: { status: number },
        result: { isError: any }
      ) => {
        return response.status === 200 && !result.isError;
      },
    }),

    providesTags: ["ListSpace"],
  }),


    getAllListByPage: builder.query<
      ListDataTypePage,
      { workspaceId: string; folderId: string; page: string }
    >({
      query: ({ workspaceId, folderId, page }) => ({
        url: `/list/get-all-list-page?workspaceId=${workspaceId}&folderId=${folderId}&page=${page}`,
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["ListSpace"],
    }),


    addCollaboratorToList: builder.mutation<boolean, SendAddCollabListType>({
      query: (credentials) => ({
        url: `/list/add-members-list/${credentials.listId}`,
        method: "PATCH",
        body: { ...credentials },
      }),     
      invalidatesTags: ["ListSpace"],

    }),

    
    getCollabListById: builder.query<
    ListCollaboratorDetailType[],
    { workspaceId: string; folderId: string; listId: string }
  >({
    query: ({ workspaceId, folderId, listId }) => ({
      url: `/list/all-collab-list-id?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}`,
      validateStatus: (
        response: { status: number },
        result: { isError: any }
      ) => {
        return response.status === 200 && !result.isError;
      },
    }),

    providesTags: ["ListSpace"],
  }),

/**
 * @api  "/update-collab-list-role/:collabId"
 */

  updateCollaboratorToListRole: builder.mutation<boolean, SendAddCollabListType&{role:"listManager"|"spaceOwner"|"viewer"}>({
    query: (credentials) => ({
      url: `/list/update-collab-list-role/${credentials.collabId}`,
      method: "PATCH",
      body: { ...credentials },
    }),     
    invalidatesTags: ["ListSpace"],

  }),

  /***
   * @api /delete-collab-list-assignee
   */


  deleteCollaboratorToListAssignee: builder.mutation<boolean, SendAddCollabListType>({
    query: (credentials) => ({
      url: `/list/delete-collab-list-assignee/${credentials.collabId}`,
      method: "DELETE",
      body: { ...credentials },
    }),     
    invalidatesTags: ["ListSpace"],

  }),

  }),
});

export const {
  useOnCreateListMutation,
  useGetAllListQuery,
  useGetAllListByPageQuery,
  useOnUpdatePriorityListMutation,
  useOnUpdateDateListMutation,
  useGetSingleListQuery,
  useAddCollaboratorToListMutation,
  useGetCollabListByIdQuery,
  useUpdateCollaboratorToListRoleMutation,
  useDeleteCollaboratorToListAssigneeMutation
} = listApiSlice;
