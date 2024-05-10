import { UserInfo } from '../../features/types/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  user: UserInfo | null;
}


const initialState: AuthState = {
  user: null,
};


export const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers:{
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
     
    },
    logout: (state) => {
      state.user = null;
    
    },
  }


})


export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;