import { SendTaskType,ResponseTaskType } from "@/features/types/index";
import { apiSlice } from "./apiSlice";

 


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
  })
 })


 export const {
useOnCreateTaskMutation
} = taskApiSlice;