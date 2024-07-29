


import { apiSlice } from "./apiSlice";







export const UploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    UploadFileToGPT: builder.mutation<string, FormData>({
      query: (imageFile) => ({
        url: '/upload/add-gpt',
        method: "POST",
        body:imageFile
      }),
      invalidatesTags: ["Upload"],
    }),

  })
})



export const {
useUploadFileToGPTMutation
}
  =UploadApiSlice