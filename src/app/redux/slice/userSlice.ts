

// src/app/api/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Socket } from 'socket.io-client';
import { RootState } from '../api/store';


interface UsersState {
  timer:Date|null,
  authId:string|null,
  socketConnection:Socket|null
}




const initialState: UsersState = {
  timer:null,
  authId:null,
  socketConnection:null

};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetOrUpdateTimer(state, action: PayloadAction<Date | null>) {
      state.timer = action.payload;
    },
    resetOrUpdateAuthId(state, action: PayloadAction<string | null>) {
      state.authId = action.payload;
    },
    setSocketConnection : (state,action)=>{
      state.socketConnection = action.payload
    }
  },
});




export const { resetOrUpdateTimer,resetOrUpdateAuthId,setSocketConnection } = userSlice.actions;


export default userSlice.reducer


export const currentSocketConnection=(state:RootState)=>state.user.socketConnection
