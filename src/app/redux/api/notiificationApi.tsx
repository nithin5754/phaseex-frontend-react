import { apiSlice } from "./apiSlice";

export const notificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotificationUnRead: builder.query<any, void>({
      query: () => ({
        url: "/notification/get-all-unread-notification",
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["Notification"],
    }),

    getAllNotification: builder.query<any, void>({
      query: () => ({
        url: "/notification/get-all-notification",
        validateStatus: (
          response: { status: number },
          result: { isError: any }
        ) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["Notification"],
    }),

    onUpdateNotificationRead: builder.mutation<boolean, string>({
      query: (notificationId) => ({
        url: `/notification/update-notification-unread/${notificationId}`,
        method: "PATCH",
      }),

      invalidatesTags: ["Notification"],
    }),

    onDeleteSingleNotification: builder.mutation<boolean, string>({
      query: (notificationId) => ({
        url: `/notification/single-delete-notification/${notificationId}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Notification"],
    }),


    onDeleteInviteLinkNotification: builder.mutation<boolean,string>({
      query: (notificationId) => ({
        url: `/notification/delete-notification-link/${notificationId}`,
        method: "PATCH"
      }),
  
      invalidatesTags:["Notification"],
    }),

  }),
});

export const {
  useGetAllNotificationUnReadQuery,
  useOnUpdateNotificationReadMutation,
  useOnDeleteSingleNotificationMutation,
  useGetAllNotificationQuery,
  useOnDeleteInviteLinkNotificationMutation
} = notificationSlice;
