import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface Attachment {
  id:string
  name: string;
  url: string;
}

export interface AttachmentSliceType {
  attachmentArray: Attachment[];
}

const initialState: AttachmentSliceType = {
  attachmentArray: [],
};

export const AttachmentSlice = createSlice({
  name: 'attachment',
  initialState,
  reducers: {
    addAttachment: (state, action: PayloadAction<Attachment>) => {
      state.attachmentArray.push(action.payload); 
    },
    removeAttachment: (state, action: PayloadAction<string>) => {
      state.attachmentArray = state.attachmentArray.filter(
        (attachment) => attachment.id !== action.payload
      );
    },
    clearAttachments: (state) => {
      state.attachmentArray = [];
    },
  },
});

export const { addAttachment, removeAttachment, clearAttachments } = AttachmentSlice.actions;

export default AttachmentSlice.reducer;
