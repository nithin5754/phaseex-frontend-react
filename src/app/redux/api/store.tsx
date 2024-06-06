import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../../features/auth/authSlice'
import { apiSlice } from './apiSlice'
import { useDispatch } from 'react-redux'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from '../slice/userSlice'
import workSpaceReducer  from '@/app/redux/slice/workspaceSlice'
import listSliceReducer from '../slice/listSlice'
import taskSliceReducer from '../slice/taskSlice'
import searchReducer from '../slice/searchSlice'
import notificationReducer from '../slice/notificationSlice'
import socketReducer from '../slice/socketSlice'


// ...

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user:userReducer,
    workspace:workSpaceReducer,
    lists:listSliceReducer,
    tasks:taskSliceReducer,
    search:searchReducer,
    notification:notificationReducer,
    socketSlice:socketReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware(
      
    ).concat(apiSlice.middleware),
devTools: true,

})

setupListeners(store.dispatch)



export type RootState = ReturnType<typeof store.getState>



export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()