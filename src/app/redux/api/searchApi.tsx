// /user

import { ResponseSUserType, WorkSpaceCollabType } from "@/features/types/searchType";
import { apiSlice } from "./apiSlice";
import { TodoCollabType, TodoType } from "@/features/types/TodoType";

// 
export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchUser: builder.mutation<ResponseSUserType[], string>({
      query: (searchKey) => ({
        url: `/search/user/${searchKey}`,
        method: "POST",
      }),
      invalidatesTags: ["Search"],
 
    }),

    getSearchTodo: builder.mutation<TodoType[],  { workspaceId: string;folderId:string,listId:string,taskId:string,todoKey:string }>({
      query: ({ workspaceId, folderId,listId,taskId,todoKey }) => ({
        url: `/search/todo/?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}&taskId=${taskId}&todoKey=${todoKey}`,
        method: "POST",
      }),
      invalidatesTags: ["Search"],
 
    }),
    getSearchSpaceCollab: builder.mutation<WorkSpaceCollabType[],  { workspaceId: string;collabKey:string }>({
      query: ({ workspaceId,collabKey }) => ({
        url: `/search/space/?workspaceId=${workspaceId}&collabKey=${collabKey}`,
        method: "POST",
      }),
      invalidatesTags: ["Search"],
    }),





  /**
   * @param {}
   * @api {/task-collab?workspaceId={workspaceId}&folderId={folderId}&listId={listId}&collabKey={collabkey}}
   * @return {}
   */

  getSearchTodoCollab: builder.mutation<TodoCollabType[],  { workspaceId: string;folderId:string,listId:string,taskId:string,collabKey:string }>({
    query: ({ workspaceId,folderId,listId,taskId,collabKey }) => ({
      url: `/search/task-collab?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}&taskId=${taskId}&collabKey=${collabKey}`,
      method: "POST",
    }),
 

    invalidatesTags: (_result, _error, { workspaceId, folderId, listId,taskId}) => [
     "Search", { type: 'TodoTask', id: `${workspaceId}-${folderId}-${listId}-${taskId}` },
    ],
  }),





 





  })
})



export const {useGetSearchUserMutation,
  useGetSearchTodoMutation,
  useGetSearchSpaceCollabMutation,
  useGetSearchTodoCollabMutation
}=searchApiSlice