

// src/app/api/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


import { RootState } from '../api/store';


interface UtilType {
   sidebarCloseOpen:boolean
   color:number,
   theme: {
    bg: string,
    border: string
    fontColor: string,
  }
}




const initialState:UtilType = {
  sidebarCloseOpen: false,
  color: 0,
  theme: {
    bg: '',
    border: '',
    fontColor: ''
  }
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

    setColor(state, action:PayloadAction<number>) {
      state.color =action.payload
    },

    bgColor(state, action:PayloadAction<string>) {
      state.theme.bg=action.payload
    },
    borderColor(state, action:PayloadAction<string>) {
      state.theme.border=action.payload
    },
    fontColor(state, action:PayloadAction<string>) {
      state.theme.fontColor=action.payload
    },
  
  
   
  },  
});




export const { setSideBarClose,setSideBarOpen,setColor,bgColor,borderColor,fontColor } = userSlice.actions;


export default userSlice.reducer


export const selectSideCloseOpen=(store:RootState)=>store.util.sidebarCloseOpen

export const selectCurrentColor=(store:RootState)=>store.util.color

export const selectBGCurrentColor=(store:RootState)=>store.util.theme.bg
export const selectBorderCurrentColor=(store:RootState)=>store.util.theme.border

export const selectFontColorCurrentColor=(store:RootState)=>store.util.theme.fontColor

