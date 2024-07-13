

import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

export const googleApiSlice = createApi({
  reducerPath: 'googleApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4500/api/v1" }),
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