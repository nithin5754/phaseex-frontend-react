

// src/app/api/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,

};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      if(typeof action.payload !=='string'){
        const {accessToken}=action.payload
        state.token=accessToken
      }else{
        state.token =action.payload

      }
  },
  logOut: (state) => {

    state.token = null
}
  },
});

export const { setCredentials,logOut } = authSlice.actions;

export default authSlice.reducer;


export const selectCurrentToken = (state:any) => state.auth.token