import { SendTaskType,ResponseTaskType } from "@/features/types/index";
import { apiSlice } from "./apiSlice";
import { SendDateTaskType, SendPriorityTaskType } from "@/features/types/taskType";
import { useOnUpdatePriorityListMutation } from "./listapi";

 


 export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateTask: builder.mutation<ResponseTaskType ,SendTaskType>({
      query: (credentials) => ({
        url: "/task/create-task",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["TaskSpace"],
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

    providesTags: ["TaskSpace"],
  }),


  onUpdatePriorityTask: builder.mutation<boolean, SendPriorityTaskType>({
    query: (credentials) => ({
      url: `/task/update-priority/${credentials.taskId}`,
      method: "PATCH",
      body: { ...credentials },
    }),
    invalidatesTags: ["TaskSpace"],
  }),


  onUpdateDateTask: builder.mutation<boolean, SendDateTaskType>({
    query: (credentials) => ({
      url: `/task/update-date/${credentials.taskId}`,
      method: "PATCH",
      body: { ...credentials },
    }),
    invalidatesTags: ["TaskSpace"],
  }),


  })
 })


 export const {
useOnCreateTaskMutation,
useGetAllTaskQuery   ,
useOnUpdatePriorityTaskMutation,
useOnUpdateDateTaskMutation


} = taskApiSlice;