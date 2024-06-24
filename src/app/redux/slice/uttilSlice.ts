

// src/app/api/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


import { RootState } from '../api/store';


interface UtilType {
   sidebarCloseOpen:boolean
}




const initialState:UtilType = {
sidebarCloseOpen:false

};

export const userSlice = createSlice({
  name: 'util',
  initialState,
  reducers: {
    setSideBarClose(state, _action) {
      state.sidebarCloseOpen =true;
    },
    setSideBarOpen(state, _action) {
      state.sidebarCloseOpen =false
    },
  
   
  },  
});




export const { setSideBarClose,setSideBarOpen } = userSlice.actions;


export default userSlice.reducer


export const selectSideCloseOpen=(store:RootState)=>store.util.sidebarCloseOpen

