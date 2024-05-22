
import { apiSlice } from "./apiSlice";

export interface CollaboratorType {
  assigneeId: string;
  role: string;
}

export interface ResponseWorkspaceDataType {
  id: string;
  workspaceOwner: string;
  title: string;
  workspace_description: string;
  collaborators: CollaboratorType[];
  workspaceType: string;
  createdAt: Date;
  active: boolean;
  updatedAt: Date;
}

export interface SpaceDataType {
  workspaceOwner: string;
  workspace_description: string;
  title: string;
  workspaceType: string;
}

export const workApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSpace: builder.mutation<any, SpaceDataType>({
      query: (credentials) => ({
        url: "/space/workspace",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Workspace"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          let pageId: string = "1";
          dispatch(workApiSlice.endpoints.getAllSpaces.initiate(pageId));
        } catch (error) {
          console.error("Error creating space:", error);
        }
      },
    }),
  
    getInActiveSpaceCount: builder.query< { count: number }, void>({
      query: () => ({
        url: "/space/allInactive-workspace",
        validateStatus: (response, result) => {
          console.log(result,"hello",response,"resposne");
          
          return response.status === 200 &&!result.isError;
        },
        
      }),
 
      
    }),



    getSingleWorkSpace: builder.query< ResponseWorkspaceDataType,string>({
      query: (id:string) => ({
        url: `/space/workspacedetails/${id}`,
        validateStatus: (response, result) => {
          console.log(result,"hello",response,"response");
          
          return response.status === 200 &&!result.isError;
        },
      
        
      }),
      
    }),
    
    getAllSpaces: builder.query<ResponseWorkspaceDataType[], string>({
      query: (pageId: string) => ({
        url: `/space/workspace?pageId=${pageId}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["Workspace"],
    }),

    getOnGoingSpaces: builder.query<ResponseWorkspaceDataType[], void>({
      query: () => ({
        url: "/space/ongoing-workspace",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["Workspace"],
    }),

    changeVisiblity: builder.mutation<boolean, { id: string }>({
      query: (credentials) => ({
        url: "/space/workspace-visiblity",
        method: "POST",
        body: { ...credentials },
      }),
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        let workspaceWasActive = false;
        const patchResult = dispatch(
          workApiSlice.util.updateQueryData(
            "getOnGoingSpaces",
            undefined,
            (draft) => {
              const workspace = draft.find((space) => space.id === id);
              if (workspace) {
                workspaceWasActive=workspace.active
                workspace.active = !workspace.active;
              }
            }
          )
        );
        let pageId: string = "1";
        const onGoingResult = dispatch(
          workApiSlice.util.updateQueryData("getAllSpaces", pageId, (draft) => {
            const workspace = draft.find((space) => space.id === id);
            if (workspace) {
              workspace.active = !workspace.active;
            }
          })
        );
        const inactiveCountResult=dispatch(
          workApiSlice.util.updateQueryData('getInActiveSpaceCount',undefined,(draft)=>{
            if (workspaceWasActive) {
              draft.count += 1;
            }else{
              draft.count -= 1;
            }
          })
        )
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
          onGoingResult.undo();
          inactiveCountResult.undo();
        }
      },
      invalidatesTags: ["Workspace"],
    }),
  }),
});

export const {
  useCreateSpaceMutation,
  useGetAllSpacesQuery,
  useChangeVisiblityMutation,
  useGetOnGoingSpacesQuery,
  useGetInActiveSpaceCountQuery,
  useGetSingleWorkSpaceQuery
} = workApiSlice;
