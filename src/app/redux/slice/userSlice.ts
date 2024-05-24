

// src/app/api/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface UsersState {
  timer:Date|null,
  authId:string|null
}




const initialState: UsersState = {
  timer:null,
  authId:null

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
  },
});




export const { resetOrUpdateTimer,resetOrUpdateAuthId } = userSlice.actions;


export default userSlice.reducer
