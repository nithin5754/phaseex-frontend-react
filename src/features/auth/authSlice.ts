

// src/app/api/authSlice.ts
import { RootState } from '@/app/redux/api/store';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  userName:string|null
  email:string|null;
  profile_img:string|null
  loadingImage:boolean
}

const initialState: AuthState = {
  token: localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : null,
  userName: localStorage.getItem("userInfo") ? localStorage.getItem("userInfo") : null,
  email: localStorage.getItem("email") ? localStorage.getItem("email") : null,
  profile_img: localStorage.getItem("img") ? localStorage.getItem("img") : null,
  loadingImage: false
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
  setUserEmail:(state,action)=>{
    state.email=action.payload
    localStorage.setItem('email', action.payload);
  },
  setUserImg:(state,action)=>{
    state.profile_img=action.payload
    localStorage.setItem('img', action.payload);
  },
  setLoadingImg:(state,action)=>{
    state.loadingImage=action.payload
   
  },
  logOut: (state) => {
    state.userName=null
    state.token = null
    localStorage.removeItem("accessToken")
    localStorage.removeItem("userInfo")
    localStorage.removeItem('img')
    localStorage.removeItem('email')
    
}
  },
});

export const { setCredentials,logOut,setUserName,setUserEmail,setUserImg,setLoadingImg } = authSlice.actions;

export default authSlice.reducer;


export const selectCurrentToken = (state:any) => state.auth.token
export const selectCurrentUserName=(state:any)=>state.auth.userName
export const selectCurrentEmail=(state:RootState)=>state.auth.email
export const selectCurrentUserImg=(state:RootState)=>state.auth.profile_img

export const selectCurrentLoadingImage=(state:RootState)=>state.auth.loadingImage