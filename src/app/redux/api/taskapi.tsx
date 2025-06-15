import { SendTaskType, ResponseTaskType } from "@/types/index";
import { apiSlice } from "./apiSlice";
import {
  SendDescriptionTaskType,
  SendDLinkTaskType,
  sendLinkDelete,
  SendPriorityTaskType,
  SendStatusTaskType,
} from "@/types/taskType";


export interface SendAddCollabTaskType {
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId: string;
  collabId: string;
}

export interface SendToCheckCollab {
  workspaceId: string;
  folderId: string;
  listId: string;
}

export interface TResponseCollaboratorDetailType {
  id: string;
  fullName: string;
  email: string;
  imageUrl: string;
  role: string;
}

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateTask: builder.mutation<ResponseTaskType, SendTaskType>({
      query: (credentials) => ({
        url: "/task/create-task",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["TaskSpace", "ListSpace"],
    }),
    getAllTask: builder.query<
      ResponseTaskType[],
      { workspaceId: string; folderId: string; listId: string }
    >({
      query: ({ workspaceId, folderId, listId }) => ({
        url: `/task/get-all-task?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}`,
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (_result, _error, { workspaceId, folderId, listId }) => [
        { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
      ],
    }),

    onUpdatePriorityTask: builder.mutation<boolean, SendPriorityTaskType>({
      query: (credentials) => ({
        url: `/task/update-priority/${credentials.taskId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, { workspaceId, folderId, listId }) => [
        { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
      ],
      async onQueryStarted(
        { workspaceId, folderId, listId },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          dispatch(
            taskApiSlice.util.invalidateTags([
              { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
            ])
          );
        } catch (error) {
          console.error("Update status failed", error);
        }
      },
    }),

    onUpdateStatusTask: builder.mutation<boolean, SendStatusTaskType>({
      query: (credentials) => ({
        url: `/task/update-task/${credentials.taskId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, { workspaceId, folderId, listId }) => [
        { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
        "ListSpace",
      ],

      async onQueryStarted(
        { workspaceId, folderId, listId },
        { dispatch, queryFulfilled }
      ) {
        try {
          await queryFulfilled;
          dispatch(
            taskApiSlice.util.invalidateTags([
              { type: "TaskSpace", id: `${workspaceId}-${folderId}-${listId}` },
            ])
          );
        } catch (error) {
          console.error("Update status failed", error);
        }
      },
    }),

    getSingleTask: builder.query<
      ResponseTaskType,
      { workspaceId: string; folderId: string; listId: string; taskId: string }
    >({
      query: ({ workspaceId, folderId, listId, taskId }) => ({
        url: `/task/get-single-task?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}&taskId=${taskId}`,
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: (_result, _error, { workspaceId, folderId, listId }) => [
        {
          type: "TaskSpace",
          id: `${workspaceId}-${folderId}-${listId}`,
        },
      ],
    }),

    onUpdateDescriptionTask: builder.mutation<boolean, SendDescriptionTaskType>(
      {
        query: (credentials) => ({
          url: `/task/update-task-description/${credentials.taskId}`,
          method: "PATCH",
          body: { ...credentials },
        }),
        invalidatesTags: (
          _result,
          _error,
          { workspaceId, folderId, listId }
        ) => [
          {
            type: "TaskSpace",
            id: `${workspaceId}-${folderId}-${listId}`,
          },
        ],
      }
    ),







    /**
     * @returns {Promise<boolean>}
     * @param {workspaceId,folderId,listId,taskId,link,link_name}
     * @api  `/task/ /add_link/task/${credentials.taskId}`
     */

    addLinkToTask: builder.mutation<boolean, SendDLinkTaskType>({
      query: (credentials) => ({
        url: `/task/add_link/task/${credentials.taskId}`,
        method: "PATCH",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, { workspaceId, folderId, listId }) => [
        {
          type: "TaskSpace",
          id: `${workspaceId}-${folderId}-${listId}`,
        },
      ],
    }),

    /**
     * @returns {Promise<boolean>}
     * @param {workspaceId,folderId,listId,taskId,linkId}
     * @api  `/delete-link-task/:taskId`
     */

    deleteLinkTask: builder.mutation<boolean, sendLinkDelete>({
      query: (credentials) => ({
        url: `/task/delete-link-task/${credentials.taskId}`,
        method: "DELETE",
        body: credentials,
      }),
      invalidatesTags: (
        _result,
        _error,
        { workspaceId, folderId, listId }
      ) => [
        {
          type: "TaskSpace",
          id: `${workspaceId}-${folderId}-${listId}`,
        },
      ],
    }),

    /**
     * @returns {Promise<boolean>}
     * @param  {workspaceId: string;folderId: string;listId: string;taskId: string;files:FileList} 
     * @api  `/task/update-files`
     */




  }),
});

export const {
  useOnCreateTaskMutation,
  useGetAllTaskQuery,
  useOnUpdatePriorityTaskMutation,
  useOnUpdateStatusTaskMutation,
  useGetSingleTaskQuery,
  useOnUpdateDescriptionTaskMutation,
  useAddLinkToTaskMutation,
  useDeleteLinkTaskMutation,

} = taskApiSlice;
