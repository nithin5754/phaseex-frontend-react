import {
  ResponseCommentList,
  SCreateTopComment,
  SendGetAllComment,
} from "@/types/comments";
import { apiSlice } from "./apiSlice";

export const commentsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateTopComment: builder.mutation<boolean, SCreateTopComment>({
      query: (credentials) => ({
        url: `/comments/add-top-level-comment/${credentials.todoId}`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, {}) => [
        {
          type: "Comments",
        },
      ],
    }),

    onCreateReplyComment: builder.mutation<
      boolean,
      SCreateTopComment & { parentId: string }
    >({
      query: (credentials) => ({
        url: `/comments/reply-comment/${credentials.todoId}`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, {}) => [
        {
          type: "Comments",
        },
      ],
    }),

    getAllComment: builder.query<ResponseCommentList[], SendGetAllComment>({
      query: (credentials) => ({
        url: `/comments/get-all-comment?workspaceId=${credentials.workspaceId}&folderId=${credentials.folderId}&listId=${credentials.listId}&taskId=${credentials.taskId}&todoId=${credentials.todoId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["Comments"],
    }),

    /***
     * @returns {number}
     * @description count all comment in todoId
     * @param {workspaceId,folderId,listId,taskId,todoId}
     * @api '/count-comment'
     *
     */

    getAllCount: builder.query<
      number,
      {
        workspaceId: string;
        folderId: string;
        listId: string;
        taskId: string;
        todoId: string;
      }
    >({
      query: (credentials) => ({
        url: `/comments/count-comment?workspaceId=${credentials.workspaceId}&folderId=${credentials.folderId}&listId=${credentials.listId}&taskId=${credentials.taskId}&todoId=${credentials.todoId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["Comments"],
    }),
  }),
});

export const {
  useOnCreateReplyCommentMutation,
  useOnCreateTopCommentMutation,
  useGetAllCommentQuery,
  useGetAllCountQuery,
} = commentsSlice;
