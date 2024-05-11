import { UserInfo } from '../../features/types/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  user: UserInfo | null;
 
  accessToken: string | null;
}


const initialState: AuthState = {
  user: null,
  accessToken:null
};


export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      return {...state,accessToken:action.payload.accessToken}
     
    },
    logout: (state) => {
      state.accessToken=null
      state.user=null
    
    },
  }


})


export const { setCredentials, logout } = authSlice.actions;

export const selectCurrentToken=(state: { auth?: { accessToken:string|null }; } )=>state.auth?.accessToken


export default authSlice.reducer;