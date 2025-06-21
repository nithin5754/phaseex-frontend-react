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

export type ListStatus ="cancelled" | "pending" | "verified" | "complete" | 'rejected' |"onGoing";
export interface ListCollaboratorType {
  assignee: string; 
  assignee_name?:string;
  role:"developer"|"manager"|"owner"|"viewer";
}

export interface ResponseListDataType {
  id: string;
  list_title: string;
  list_description: string;
  workspaceId: string;
  priority_list: string;
  progressTask:number;
  status:ListStatus;
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
  memberId:string;
  role:'manager'|'viewer'

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
      invalidatesTags: (
        _result,
        _error,
        { workspaceId, folderId}
      ) => [
        {
          type: "ListSpace",
          id: `${workspaceId}-${folderId}`,
        },
      ],
    }),

    onUpdatePriorityList: builder.mutation<boolean, SendPriorityListType>({
      query: (credentials) => ({
        url: `/list/update-priority-list/${credentials.listId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: (
        _result,
        _error,
        { workspaceId, folderId}
      ) => [
        {
          type: "ListSpace",
          id: `${workspaceId}-${folderId}`,
        },
      ],
    }),

    onUpdateDateList: builder.mutation<boolean, SendDateListType>({
      query: (credentials) => ({
        url: `/list/update-date-list/${credentials.listId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: (
        _result,
        _error,
        { workspaceId, folderId}
      ) => [
        {
          type: "ListSpace",
          id: `${workspaceId}-${folderId}`,
        },
      ],
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

      providesTags: (_result, _error, { workspaceId, folderId }) => [
        {
          type: "ListSpace",
          id: `${workspaceId}-${folderId}`,
        },
      ],
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

    providesTags: (_result, _error, { workspaceId, folderId }) => [
      {
        type: "ListSpace",
        id: `${workspaceId}-${folderId}}`,
      },
    ],
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

      providesTags: (_result, _error, { workspaceId, folderId }) => [
        {
          type: "ListSpace",
          id: `${workspaceId}-${folderId}`,
        },
      ],
    }),

    onAddManagerViewerList: builder.mutation<boolean, SendAddCollabListType>({
      query: (credentials) => ({
        url: `/list/add-manager-viewer-list/${credentials.listId}`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: (
        _result,
        _error,
        { workspaceId, folderId}
      ) => [
        {
          type: "ListSpace",
          id: `${workspaceId}-${folderId}`,
        },
      ],
    }),


    
// /




  }),
});

export const {
  useOnCreateListMutation,
  useGetAllListQuery,
  useGetAllListByPageQuery,
  useOnUpdatePriorityListMutation,
  useOnUpdateDateListMutation,
  useGetSingleListQuery,
  useOnAddManagerViewerListMutation
} = listApiSlice;
