

// src/app/api/authSlice.ts
import { ResponseWorkspaceDataType } from '@/app/redux/api/spaceApi';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';




interface workspaceState {
  workspaceList: (ResponseWorkspaceDataType)[]|[];
}

const initialState: workspaceState = {
  workspaceList: [],

};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    addAllspaces(state,action:PayloadAction<ResponseWorkspaceDataType[]|[]>){
     state.workspaceList=action.payload.map(item => ({ ...item, visible: true }))
      
    },
    changeVisibliltySpace(state,action:PayloadAction<string>){
      const index = state.workspaceList.findIndex(item => item.id === action.payload);
      if (index !== -1) {
        state.workspaceList[index].active = !state.workspaceList[index].active;
      }
    }
  },
 
});

export const {addAllspaces,changeVisibliltySpace } = workspaceSlice.actions;

export default workspaceSlice.reducer;


export const selectAllSpaces = (state:any) => state.workspace.workspaceList