import { AttachmentSliceType } from "@/features/types/attachment";
import { apiSlice } from "./apiSlice";

export const AttachMentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

          /**
     * @api {/attachment/add-attachment}
     * @desc create new attachment
     * @return {boolean}
     */


    onCreateAttachMent: builder.mutation<boolean, FormData>({
      query: (formData) => ({
        url: "/attachment/add-attachment",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Attachment"],
    }),
    /**
     * @api {/get-all-attachment}
     * @desc get all attachment in taskId
     * @return {AttachmentSliceType}
     */

    getAllAttachment: builder.query<
      AttachmentSliceType,
      { workspaceId: string; folderId: string; listId: string; taskId: string }
    >({
      query: ({ workspaceId, folderId, listId, taskId }) => ({
        url: `/attachment/get-all-attachment?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}&taskId=${taskId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["Attachment"],
    }),




    /**
     * @api {/delete-single-attachment}
     * @desc to delete attachment single
     * @return {boolean}
     */

    onDeleteSingleAttachment: builder.mutation<any, {workspaceId:string,folderId:string,listId:string,taskId:string,attachment_id:string}>({
      query: (credentials) => ({
        url: "/attachment/delete-single-attachment",
        method: "DELETE",
        body: {...credentials},
      }),
      invalidatesTags: ["Attachment"],
    }),



  }),
});

export const { 
  useOnCreateAttachMentMutation, 
  useGetAllAttachmentQuery ,
  useOnDeleteSingleAttachmentMutation
} =
  AttachMentSlice;
