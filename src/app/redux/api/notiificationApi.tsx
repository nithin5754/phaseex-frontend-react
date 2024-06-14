



import { apiSlice } from "./apiSlice";




export const notificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotificationUnRead:builder.query<
   any,void
  >({
    query: () => ({
     url:'/notification/get-all-unread-notification',
      validateStatus: (
        response: { status: number },
        result: { isError: any }
      ) => {
        return response.status === 200 && !result.isError;
      },

      
    }),
    
    providesTags: ["Notification"],

   
  }),
  })
})



export const {useGetAllNotificationUnReadQuery}=notificationSlice