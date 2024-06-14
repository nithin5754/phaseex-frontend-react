// /user

import { ResponseSUserType } from "@/features/types/searchType";
import { apiSlice } from "./apiSlice";
import { TodoType } from "@/features/types/TodoType";

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
  })
})



export const {useGetSearchUserMutation,
  useGetSearchTodoMutation
}=searchApiSlice