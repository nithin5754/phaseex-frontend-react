
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
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
          console.log(result,"hello",response,"response");
          
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



      providesTags: (result, error, id) => [{ type: "Collaborators", id },"Workspace"],
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
            console.log(draft,"draft");  
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

      invalidatesTags: (result, error, { workspaceId }) => [
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
 
      invalidatesTags: (result, error, { workspaceId }) => [
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
 
      async onQueryStarted({ workspaceId }, { dispatch, queryFulfilled }) {
        let workspaceWasActive = false;
        const patchResult = dispatch(
          workApiSlice.util.updateQueryData(
            "getOnGoingSpaces",
            undefined,
            (draft) => {
              const workspace = draft.find((space) => space.id === workspaceId);
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
            const workspace = draft.find((space) => space.id === workspaceId);
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
   
        invalidatesTags: (result, error, { workspaceId }) => [
          { type: "Collaborators", id: workspaceId },
          "Workspace"
        ],
  
      }),

  }),
});






export const {
  useCreateSpaceMutation,
  useGetAllSpacesQuery,
  useChangeVisiblityMutation,
  useGetOnGoingSpacesQuery,
  useGetInActiveSpaceCountQuery,
  useGetSingleWorkSpaceQuery,
  useAddCollaboratorsMutation,
  useGetAllCollabInSpaceQuery,
  useDeleteCollaboratorMutation,
  useVerifyCollaboratorsMutation,
  useDeleteWorkSpaceMutation,
  useUpdateCollaboratorRoleMutation
} = workApiSlice;
