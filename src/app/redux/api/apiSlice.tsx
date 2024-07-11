// import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query'

import type { RootState } from "./store";
import { logOut, setCredentials } from "@/features/auth/authSlice";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4500/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    (result.error && result.error.status === 403) ||
    (result.error && result.error.status === 401)
  ) {
    console.log("sending refresh token");

    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    console.log(refreshResult, "hello");

    if (refreshResult.data) {
      api.dispatch(setCredentials(refreshResult.data));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Workspace",
    "FolderSpace",
    "ListSpace",
    "TaskSpace",
    "Search",
    "Notification",
    "TodoTask",
    "Collaborators",
    "Activity",
  ],
  endpoints: () => ({}),
});
