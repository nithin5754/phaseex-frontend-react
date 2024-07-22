
import { apiSlice } from "./apiSlice";

export interface CollaboratorType {
  assigneeId: string;
  role: string;
  verified:boolean
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


export interface   SpaceCollabSendType {
  workspaceId:string;
  collaboratorId:string;
}





export interface ReceiveCollaboratorType {
  assignee: string; 
  role: string;
  id:string;
  verified:boolean
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
    
    getAllSpaces: builder.query<ResponseWorkspaceDataType[], void>({
      query: () => ({
        url: `/space/workspace`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      providesTags: ["Workspace"],
      keepUnusedDataFor: 100, 
    }),

    getOnGoingSpaces: builder.query<ResponseWorkspaceDataType[], void>({
      query: () => ({
        url: "/space/ongoing-workspace",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),

      providesTags: ["Workspace"],
      keepUnusedDataFor: 100, 
     
    }),

    changeVisiblity: builder.mutation<boolean, { id: string }>({
      query: (credentials) => ({
        url: "/space/workspace-visiblity",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ["Workspace"],
      async onQueryStarted({ id }, { dispatch, queryFulfilled }) {
     
        const patchResult = dispatch(
          workApiSlice.util.updateQueryData(
            "getOnGoingSpaces",
            undefined,
            (draft) => {
              const workspace = draft.find((space) => space.id === id);
              if (workspace) {
          
                workspace.active =false;
              }
            }
          )
        );
   
        const onGoingResult = dispatch(
          workApiSlice.util.updateQueryData("getAllSpaces",undefined, (draft) => {
            const workspace = draft.find((space) => space.id === id);
            if (workspace) {
              workspace.active = true;
            }
          })
        );
   
        try {
          await queryFulfilled;
          dispatch(workApiSlice.endpoints.getAllSpaces.initiate());
          dispatch(workApiSlice.endpoints.getOnGoingSpaces.initiate());
    
        } catch {
          patchResult.undo();
          onGoingResult.undo();

        }
      },
   
    }),



    addCollaborators: builder.mutation<boolean, SpaceCollabSendType>({
      query: (credentials) => ({
        url: "/space/add-new-collaborators",
        method: "POST",
        body: { ...credentials },
      }),     
      invalidatesTags: ["Workspace"],

    }),

    getAllCollabInSpace: builder.query<ReceiveCollaboratorType[], string>({
      query: (id: string) => ({
        url: `/space/get-all-collab/${id}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),



      providesTags: (_result, _error, id) => [{ type: "Collaborators", id },"Workspace"],
    }),


    deleteCollaborator: builder.mutation<boolean, SpaceCollabSendType>({
      query: (credentials) => ({
        url: "/space/delete-collaborator",
        method: "DELETE",
        body: { ...credentials },
      }),    
      
      async onQueryStarted({ workspaceId, collaboratorId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          workApiSlice.util.updateQueryData('getAllCollabInSpace', workspaceId, (draft) => {
            return draft.filter((collab: ReceiveCollaboratorType) => collab.id !== collaboratorId);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error("Error deleting collaborator:", error);
        }
      },

      invalidatesTags: (_result, _error, { workspaceId }) => [
        { type: "Collaborators", id: workspaceId },
        "Workspace"
      ],

    }),


    verifyCollaborators: builder.mutation<boolean, SpaceCollabSendType>({
      query: (credentials) => ({
        url: "/space/verify-collaborator",
        method: "PATCH",
        body: { ...credentials },
      }),     
 
      invalidatesTags: (_result, _error, { workspaceId }) => [
        { type: "Collaborators", id: workspaceId },
        "Workspace"
      ],

    }),



       /**
   * @param {workspaceId}
   * @api {/delete-workSpace/:workspaceId}
   * @return {boolean}
   */


       
    deleteWorkSpace: builder.mutation<boolean,{ workspaceId:string}>({
      query: ({ workspaceId}) => ({
        url: `/space/delete-workSpace/${workspaceId}`,
        method: "POST",
      }),    
      invalidatesTags: (_result, _error, { workspaceId }) => [
        { type: "Collaborators", id: workspaceId },
        "Workspace"
      ],
 
      async onQueryStarted({ workspaceId }, { dispatch, queryFulfilled }) {
  
        const patchResult = dispatch(
          workApiSlice.util.updateQueryData(
            "getOnGoingSpaces",
            undefined,
            (draft) => {
              const workspace = draft.find((space) => space.id === workspaceId);
              if (workspace) {
          
                workspace.active = false;
              }
            }
          )
        );
   
        const onGoingResult = dispatch(
          workApiSlice.util.updateQueryData("getAllSpaces",undefined, (draft) => {
            const workspace = draft.find((space) => space.id === workspaceId);
            if (workspace) {
              workspace.active =true;
            }
          })
        );
        try {
          await queryFulfilled;
          dispatch(workApiSlice.endpoints.getAllSpaces.initiate());
          dispatch(workApiSlice.endpoints.getOnGoingSpaces.initiate());
          dispatch(workApiSlice.util.invalidateTags(["Workspace"]));
        } catch {
          patchResult.undo();
          onGoingResult.undo();

        }
      },
     

    }),


       /**
   * @param {string [manager.viewer,developer]}
   * @api  // /update-space-collab-role
   * @return {boolean}
   */
       updateCollaboratorRole: builder.mutation<boolean, SpaceCollabSendType&{role:string}>({
        query: (credentials) => ({
          url: "/space/update-space-collab-role",
          method: "PATCH",
          body: { ...credentials },
        }),     
   
        invalidatesTags: (_result, _error, { workspaceId }) => [
          { type: "Collaborators", id: workspaceId },
          "Workspace"
        ],
  
      }),

  }),
});

/**
 * @main
 */




export const {
  useCreateSpaceMutation,
  useGetAllSpacesQuery,
  useChangeVisiblityMutation,
  useGetOnGoingSpacesQuery,
  useGetSingleWorkSpaceQuery,
  useAddCollaboratorsMutation,
  useGetAllCollabInSpaceQuery,
  useDeleteCollaboratorMutation,
  useVerifyCollaboratorsMutation,
  useDeleteWorkSpaceMutation,
  useUpdateCollaboratorRoleMutation
} = workApiSlice;
