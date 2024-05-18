

import { apiSlice } from "./apiSlice";


export interface CollaboratorType {
  assigneeId: string; 
  role: string;
}

 
export interface ResponseWorkspaceDataType {
  id:string
  workspaceOwner: string; 
  title: string;
  workspace_description:string
  collaborators:CollaboratorType[]; 
  workspaceType: string;
  createdAt:Date,
  updatedAt:Date
}


export interface SpaceDataType{
  workspaceOwner:string,
  workspace_description:string,
  title:string,
  workspaceType:string
 }




export const workApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    createSpace:builder.mutation<any,SpaceDataType>(
      {
        query: (credentials) => ({
          url: "/space/workspace",
          method: "POST",
          body: {...credentials},
        }),
      }
    ),

    getAllSpaces:builder.query<ResponseWorkspaceDataType[],void>({
      query: () => ({
        url: '/space/workspace',
        validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
        },
        
        
     }),
    })
  })
})


export const {useCreateSpaceMutation,useGetAllSpacesQuery}=workApiSlice





