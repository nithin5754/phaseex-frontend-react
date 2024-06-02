






import { PayloadAction, createSlice } from '@reduxjs/toolkit';




interface taskState {
  CurrentPage:number|1;

}

const initialState: taskState = {
  CurrentPage: 1,


};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changePageNumberTask(state,action:PayloadAction<number>){
     state.CurrentPage=action.payload
      
    },


  },
 
});

export const {changePageNumberTask} = taskSlice.actions;

export default taskSlice.reducer;


export const selectPage = (state:any) => state.tasks.CurrentPage
