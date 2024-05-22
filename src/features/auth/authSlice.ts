

// src/app/api/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userName:string|null
}

const initialState: AuthState = {
  token: localStorage.getItem("accessToken")?localStorage.getItem("accessToken"):null,
  userName: localStorage.getItem("userInfo")?localStorage.getItem("userInfo"):null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      if(typeof action.payload !=='string'){
        const {accessToken}=action.payload
        localStorage.setItem('accessToken', accessToken);
   
        state.token=accessToken
      }else{
        state.token =action.payload
        localStorage.setItem('accessToken', action.payload);

      }
  },
  setUserName:(state,action)=>{
    state.userName=action.payload
    localStorage.setItem('userInfo', action.payload);
  },
  logOut: (state) => {
    state.userName=null
    state.token = null
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userInfo")
}
  },
});

export const { setCredentials,logOut,setUserName } = authSlice.actions;

export default authSlice.reducer;


export const selectCurrentToken = (state:any) => state.auth.token
export const selectCurrentUserName=(state:any)=>state.auth.userName