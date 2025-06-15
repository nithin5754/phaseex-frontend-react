
import { apiSlice } from "./apiSlice";
import { ICreateChatPayload } from "@/types/chat.type";




export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateChat: builder.mutation<boolean, {body:ICreateChatPayload,workspaceId:string}>({
      query: (credentials) => ({
        url: `/chat/create/${credentials.workspaceId}`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: (_result, _error, {}) => [
        {
          type: "Comments",
        },
      ],
    }),
  }),
});

export const { useOnCreateChatMutation } = chatSlice;
