import { SendTaskType,ResponseTaskType } from "@/features/types/index";
import { apiSlice } from "./apiSlice";
import {  SendPriorityTaskType, SendStatusTaskType } from "@/features/types/taskType";


 


 export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateTask: builder.mutation<ResponseTaskType ,SendTaskType>({
      query: (credentials) => ({
        url: "/task/create-task",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["TaskSpace","ListSpace"],
    }),
    getAllTask: builder.query<
    ResponseTaskType[],
    { workspaceId: string;folderId:string,listId:string }
  >({
    query: ({ workspaceId, folderId,listId }) => ({
      url: `/task/get-all-task?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}`,
      validateStatus: (
        response: { status: number },
        result: { isError: any }
      ) => {
        return response.status === 200 && !result.isError;
      },
 
    }),
         providesTags: (result, error, { workspaceId, folderId, listId }) => [
        { type: 'TaskSpace', id: `${workspaceId}-${folderId}-${listId}` },
      ],

   
  }),


  onUpdatePriorityTask: builder.mutation<boolean, SendPriorityTaskType>({
    query: (credentials) => ({
      url: `/task/update-priority/${credentials.taskId}`,
      method: "PATCH",
      body: { ...credentials },
    }),
    invalidatesTags: (_result, _error, { workspaceId, folderId, listId }) => [
      { type: 'TaskSpace', id: `${workspaceId}-${folderId}-${listId}` },
    ],
    async onQueryStarted({workspaceId, folderId, listId }, { dispatch, queryFulfilled }) {
      try {
        await queryFulfilled;
        dispatch(
          taskApiSlice.util.invalidateTags([{ type: 'TaskSpace', id: `${workspaceId}-${folderId}-${listId}` }])
        );
      } catch (error) {
        console.error('Update status failed', error);
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
      { type: 'TaskSpace', id: `${workspaceId}-${folderId}-${listId}` },
      'ListSpace', 
    ],

    async onQueryStarted({workspaceId, folderId, listId }, { dispatch, queryFulfilled }) {
      try {
        await queryFulfilled;
        dispatch(
          taskApiSlice.util.invalidateTags([{ type: 'TaskSpace', id: `${workspaceId}-${folderId}-${listId}` }])
        );
      } catch (error) {
        console.error('Update status failed', error);
      }
    },
  }),


  })
 })


 export const {
useOnCreateTaskMutation,
useGetAllTaskQuery   ,
useOnUpdatePriorityTaskMutation,
useOnUpdateStatusTaskMutation,




} = taskApiSlice;