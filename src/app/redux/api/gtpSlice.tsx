





import { GetAllGroupType, GetGptType, SendPromptAnsType, SendPromptQusType } from "@/types/chatType";
import { apiSlice } from "./apiSlice";




export const GPTApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    addNewGrp: builder.mutation<GetAllGroupType, {group_title:string} >({
      query: ({group_title}) => ({
        url: '/gpt/add-new-gpt-group',
        method: "POST",
        body:{group_title}
      }),
      invalidatesTags: ["GPT"],
    }),

    
    addQuestionApi: builder.mutation<{promptId:string}, SendPromptQusType >({
      query: (credentials) => ({
        url: '/gpt/add-question',
        method: "POST",
        body:{...credentials}
      }),
      invalidatesTags: ["GPT"],
    }),


    addAnswerApi: builder.mutation<boolean, SendPromptAnsType >({
      query: (credentials) => ({
        url: '/gpt/add-answer',
        method: "POST",
        body:{...credentials}
      }),
      invalidatesTags: ["GPT"],
    }),

    getAllGroup: builder.query<GetAllGroupType[],void>({
      query: () => ({
        url:'/gpt/get-all-group',
        validateStatus: (response, result) => {      
          return response.status === 200 &&!result.isError;
        },
      }),
      providesTags:["GPT"]
    }),

   


    getAllPrompt: builder.query<GetGptType,{groupId:string}>({
      query: ({groupId}) => ({
        url:`/gpt/get-all-prompt-group/${groupId}`,
        validateStatus: (response, result) => {      
          return response.status === 200 &&!result.isError;
        },
      }),
      providesTags:["GPT"]
    }),



    



  })
})



export const {
useAddNewGrpMutation,
useGetAllGroupQuery,
useAddAnswerApiMutation,
useAddQuestionApiMutation,
useGetAllPromptQuery
}
  =GPTApiSlice