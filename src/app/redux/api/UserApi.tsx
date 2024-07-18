import { User } from "./AuthApi";
import { apiSlice } from "./apiSlice";




export interface RegisterUserData {
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
}




export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register:builder.mutation<User,RegisterUserData>(
      {
        query: (credentials) => ({
          url: "/auth/register",
          method: "POST",
          body: {...credentials},
        }),
      }
    ),
    resendOtp:builder.mutation<void,{ tokenId: string }>(
      {
        query: (credentials) => ({
          url: '/auth/resendOtp',
          method: "POST",
          body: {...credentials},
        }),
      }
    ),
    verifyUser:builder.mutation<User,{ tokenId: string ,otp:string}>(
      {
        query: (credentials) => ({
          url: '/auth/verify',
          method: "POST",
          body: {...credentials},
        }),
      }
    ),
    fetchTimerDate:builder.mutation<{updateDate:Date},{ tokenId:string}>(
      {
        query: (credentials) => ({
          url: '/auth/get-timer-date',
          method: "POST",
          body: {...credentials},
        }),
      }
    ),



    AddProfile: builder.mutation<any, FormData>({
      query: (imageFile) => ({
        url: '/auth/add-profile',
        method: "POST",
        body:imageFile
      }),
      invalidatesTags: ["User"],
    }),

    getUserById: builder.query<User, void>({
      query: () => ({
        url: `/auth/getUserById`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),




      providesTags: ["User"],
    }),

  })
})



export const {
  useRegisterMutation,
  useResendOtpMutation,
  useVerifyUserMutation,
  useFetchTimerDateMutation,
  useGetUserByIdQuery,
  useAddProfileMutation
}
  =userApiSlice