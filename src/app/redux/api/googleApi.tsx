

import { baseUrl } from "@/lib/constant";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { LoginResponse } from "./AuthApi";

export const googleApiSlice = createApi({
  reducerPath: 'googleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
  endpoints: (builder) => ({
    googleAuth:builder.mutation<LoginResponse, { token:string }>(
      {
        query: (credentials) => ({
          url:'/auth/googleAuth',
          method: "POST",
          body: { ...credentials },
        }),
      }
    ),
  }),
});

export const { useGoogleAuthMutation } = googleApiSlice;
export default googleApiSlice;