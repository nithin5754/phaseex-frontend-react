import { TVideoInviteLink } from "@/types/NotificationType";
import { apiSlice } from "./apiSlice";

export const videoChatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVideoInviteLink: builder.query<TVideoInviteLink, {workspaceId:string}>({
      query: ({workspaceId}) => ({
        url: `/videochat/get-video-chat-noti/${workspaceId}`,
        validateStatus: (response, result) => {
 

          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: ["VideoChat"],
    }),
  }),
});

export const { useGetVideoInviteLinkQuery } = videoChatSlice;
