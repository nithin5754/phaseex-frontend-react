import { apiSlice } from "@/app/redux/api/apiSlice";
import { logOut, setCredentials } from "../../../features/auth/authSlice";

export interface User {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  profile_image?: string;
  roles: string;
  verified?: boolean;
  otp?: string;
  verify_token?: string;
  expires?: Date;
  forgotPassWord_verified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LoginResponse {
  message: string;
  data: User;
  accessToken: string;
}

interface ForgotPasswordOtpResponse {
  message: string;
  tokenId: string;
}

interface ForgotPasswordChange {
  message: string;
  isPasswordChanged: boolean;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { email: string; password: string }>(
      {
        query: (credentials) => ({
          url: "/auth/login",
          method: "POST",
          body: { ...credentials },
        }),
      }
    ),

    forgotPasswordVerify: builder.mutation<User, { email: string }>({
      query: (credentials) => ({
        url: "/auth/forgotPasswordSendOtp",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    forgotPasswordOtp: builder.mutation<
      ForgotPasswordOtpResponse,
      { otp: string; tokenId: string }
    >({
      query: (credentials) => ({
        url: "/auth/forgotPasswordVerifyOtp",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    forgotPasswordSetNewPass: builder.mutation<
      ForgotPasswordChange,
      { password: string; tokenId: string }
    >({
      query: (credentials) => ({
        url: "/auth/change-forgot-password-change",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    getName: builder.query<User, void>({
      query: () => "/auth/getUserName",
    }),

    getDashBoard: builder.query<void, void>({
      query: () => "/auth/test",
      keepUnusedDataFor: 5,
    }),

    getTesting: builder.query<void, void>({
      query: () => "/home/testing",
      keepUnusedDataFor: 5,
    }),
    sendLogOut: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        console.log("starting!");
        try {
          const { data } = await queryFulfilled;
          console.log("success!", data);

          dispatch(apiSlice.util.resetApiState());
          dispatch(logOut());
        } catch (err) {
          console.log("error... ", err);
        }
      },
      invalidatesTags: ["User",
        "Workspace",
        "FolderSpace",
        "ListSpace",
        "TaskSpace",
        "Search",
        "Notification",
        "TodoTask",
        "Collaborators",
        "Activity",
        "VideoChat"],
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          console.log(data);
          dispatch(setCredentials({ accessToken }));
        } catch (error: any) {
          console.log(error, "refersh endpoint persist");
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useGetDashBoardQuery,
  useSendLogOutMutation,
  useGetTestingQuery,
  useRefreshMutation,
  useForgotPasswordVerifyMutation,
  useForgotPasswordOtpMutation,
  useForgotPasswordSetNewPassMutation,
  useGetNameQuery,
} = authApiSlice;
