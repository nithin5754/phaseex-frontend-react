
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../api/store';






export interface NotificationType {

  toggle:boolean;
  notificationList:any;
  newNotification:number
   
}

const initialState:NotificationType ={
  toggle: false,
  notificationList:null,
  newNotification:0
}






export const NotificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    notificationOpen: (state, action:PayloadAction<boolean>) => {
      state.toggle = action.payload;
    },

    notificationList:(state,action:PayloadAction<any>)=>{
      state.notificationList=action.payload
    }


    
    


  },
 
});

export const {notificationOpen,notificationList} = NotificationSlice.actions;

export default NotificationSlice.reducer;


export const setOpenNotification = (state:RootState) => state.notification.toggle

export const getNotification=(state:RootState)=>state.notification.notificationList
