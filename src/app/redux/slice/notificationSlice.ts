import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../api/store";
import { NotificationDetailsType } from "@/types/NotificationType";

export interface NotificationType {
  toggle: boolean;
  notificationList: any;
  newNotification: number;
  notificationDetails: NotificationDetailsType | null;
}

const initialState: NotificationType = {
  toggle: false,
  notificationList: null,
  newNotification: 0,
  notificationDetails: null,
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    notificationOpen: (state, action: PayloadAction<boolean>) => {
      state.toggle = action.payload;
    },

    notificationList: (state, action: PayloadAction<any>) => {
      state.notificationList = action.payload;
    },

    setNotificationDetails: (
      state,
      action: PayloadAction<NotificationDetailsType>
    ) => {
      state.notificationDetails = action.payload;
    },

    removeNotificationDetails: (state, _action) => {
      state.notificationDetails =null;
    },
  },
});

export const {
  notificationOpen,
  notificationList,
  setNotificationDetails,
  removeNotificationDetails,
} = NotificationSlice.actions;

export default NotificationSlice.reducer;

export const setOpenNotification = (state: RootState) =>
  state.notification.toggle;

export const getNotification = (state: RootState) =>
  state.notification.notificationList;

export const selectNotificationDetails = (state: RootState) =>
  state.notification.notificationDetails;
