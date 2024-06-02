// /user

import { ResponseSUserType } from "@/features/types/searchType";
import { apiSlice } from "./apiSlice";

// 
export const searchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSearchUser: builder.mutation<ResponseSUserType[], string>({
      query: (searchKey) => ({
        url: `/search/user/${searchKey}`,
        method: "POST",
      }),
      invalidatesTags: ["Search"],
 
    }),
  })
})



export const {useGetSearchUserMutation}=searchApiSlice