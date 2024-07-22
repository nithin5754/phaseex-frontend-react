

import { CActivitySendType, ResponseActivityModal } from "@/features/types/TActivity";
import { apiSlice } from "./apiSlice";

export const activityApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({


    onCreateActivity: builder.mutation<boolean, CActivitySendType>({
      query: (credentials) => ({
        url: "/activity/create-activity",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: (
        _result,
        _error,
        { workspaceId, folderId,listId,taskId}
      ) => [
        {
          type: "Activity",
          id: `${workspaceId}-${folderId}-${listId}-${taskId}`,
        },
      ],
    }),




    onGetAllActivity:builder.query<
    ResponseActivityModal,
    { workspaceId: string; folderId: string; listId: string; taskId: string }
  >({
    query: ({ workspaceId, folderId, listId, taskId }) => ({
      url: `/activity/get-all-activity?workspaceId=${workspaceId}&folderId=${folderId}&listId=${listId}&taskId=${taskId}`,
      validateStatus: (
        response: { status: number },
        result: { isError: any }
      ) => {
        return response.status === 200 && !result.isError;
      },
    }),

    providesTags: (_result, _error, { workspaceId, folderId, listId,taskId }) => [
      {
        type: "Activity",
        id: `${workspaceId}-${folderId}-${listId}-${taskId}`,
      },
    ],
  }),
       

  }),
});

export const {
useOnCreateActivityMutation,
useOnGetAllActivityQuery

} = activityApi;
