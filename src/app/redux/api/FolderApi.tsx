import { Project } from "@/components/review/review.type";
import { apiSlice } from "./apiSlice";

export interface ResponseFolderDataType {
  id: string;
  folder_title: string;
  folder_description: string;
  workspaceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FolderDataType {
  folder_title: string;
  folder_description: string;
  workspaceId: string;
}
export interface RequestFeatureReviewCreateDTO {
  title: string;
  description: string;
  attempt: number;
  status: "Approved" | "Rejected" | "Pending" | "Completed";
  message: string[];
  featureCreatedAt: string;
  listId: string;
  folderId: string;
  workspaceId: string;
  featureDueDate: string;
}
// "/:workspaceId/:folderId/:listId/:reviewId/review"
export const folderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    onCreateFolder: builder.mutation<ResponseFolderDataType, FolderDataType>({
      query: (credentials) => ({
        url: "/folder/space-folder",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["FolderSpace"],
    }),

    onCreateReviewFolder: builder.mutation<
      boolean,
      RequestFeatureReviewCreateDTO
    >({
      query: (credentials) => ({
        url: `/feature-review/create/${credentials.workspaceId}/${credentials.folderId}/${credentials.listId}/review`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["FolderSpace", "ListSpace"],
    }),

    getAllReviewFolder: builder.query<
      Project[],
      { workspaceId: string; folderId: string }
    >({
      query: ({ workspaceId, folderId }) => ({
        url: `/feature-review/get/${workspaceId}/${folderId}/review`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["FolderSpace","ListSpace"],
    }),

    updateReviewListByManager: builder.mutation<
      boolean,
      {
        workspaceId: string;
        folderId: string;
        listId: string;
        reviewId: string;
        message: string;
      }
    >({
      query: ({ folderId, reviewId, workspaceId, listId, message }) => ({
        url: `/feature-review/update-list-manager/${workspaceId}/${folderId}/${listId}/${reviewId}/review`,
        method: "PATCH",
        body: { message },
      }),

      invalidatesTags: ["FolderSpace", "ListSpace"],
    }),

    getReviewByListId: builder.query<
      Project,
      { workspaceId: string; folderId: string; listId: string }
    >({
      query: ({ workspaceId, folderId, listId }) => ({
        url: `/feature-review/get-list/${workspaceId}/${folderId}/${listId}/review`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["FolderSpace", "ListSpace"],
    }),
    onEditFolder: builder.mutation<
      ResponseFolderDataType,
      { folderData: FolderDataType; folderId: string }
    >({
      query: (credentials) => ({
        url: `/folder/updateFolder`,
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["FolderSpace"],
    }),

    getSingleFolder: builder.query<
      ResponseFolderDataType,
      { spaceId: string; folderId: string }
    >({
      query: ({ spaceId, folderId }) => ({
        url: `/folder/singleFolder?spaceId=${spaceId}&folderId=${folderId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["FolderSpace"],
    }),

    getAllFolder: builder.query<ResponseFolderDataType[], string>({
      query: (workspaceId) => ({
        url: `/folder/get-folder/${workspaceId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["FolderSpace"],
    }),
  }),
});

export const {
  useOnCreateFolderMutation,
  useOnCreateReviewFolderMutation,
  useGetAllFolderQuery,
  useGetSingleFolderQuery,
  useOnEditFolderMutation,
  useGetAllReviewFolderQuery,
  useGetReviewByListIdQuery,
  useUpdateReviewListByManagerMutation,
} = folderApiSlice;
