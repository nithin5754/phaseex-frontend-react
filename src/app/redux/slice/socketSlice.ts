

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Socket } from 'socket.io-client'; 
import { RootState } from '../api/store';

interface SocketState {
  socket: Socket | null;
}

const initialState: SocketState = {
  socket: null,
};


const socketSlice = createSlice({
  name: 'socketSlice',
  initialState,
  reducers: {
    addSocketConnection(state, action: PayloadAction<Socket>) {
      state.socket = action.payload as any;
    },
    removeSocketConnection(state) {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
    },
  },
});


export const { addSocketConnection, removeSocketConnection } = socketSlice.actions;


export const selectSocket = (state: RootState) => state.socketSlice.socket;


export default socketSlice.reducer;
