






import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../api/store';




interface taskState {
  CurrentPage:number|1;
  openDesc:boolean

}

const initialState: taskState = {
  CurrentPage: 1,
  openDesc: false
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changePageNumberTask(state,action:PayloadAction<number>){
     state.CurrentPage=action.payload
      
    },

    setOpenDescTask(state,action:PayloadAction<boolean>){
      state.openDesc=action.payload
    }


  },
 
});

export const {changePageNumberTask,setOpenDescTask} = taskSlice.actions;

export default taskSlice.reducer;


export const selectPage = (state:any) => state.tasks.CurrentPage
export const selectOpenTaskDesc=(state:RootState)=>state.tasks.openDesc
