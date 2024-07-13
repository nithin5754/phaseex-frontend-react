

import { baseUrl } from "@/lib/constant";
import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const googleApiSlice = createApi({
  reducerPath: 'googleApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl}),
  endpoints: (builder) => ({
    googleAuth:builder.mutation<any, { token:string }>(
      {
        query: ({token}) => ({
          url: `/auth/googleAuth/${token}`,
          method: "POST",

        }),
      }
    ),
  }),
});

export const { useGoogleAuthMutation } = googleApiSlice;
export default googleApiSlice;