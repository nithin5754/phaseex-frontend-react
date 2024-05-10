import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import userReducer from '../slices/userSlice';
import { useDispatch } from 'react-redux';



const store = configureStore({
  reducer: {
    auth: authSlice,
    users:userReducer
  }
});



export default store;

// export type AppDispatch = typeof store.dispatch

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
