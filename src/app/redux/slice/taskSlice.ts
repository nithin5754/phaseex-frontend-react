






import { PayloadAction, createSlice } from '@reduxjs/toolkit';




interface taskState {
  CurrentPage:number|1;
  date:{
    startTask:string|null,
    dueTask:string|null
  }
}

const initialState: taskState = {
  CurrentPage: 1,
  date:{
    startTask:null,
    dueTask:null
  }

};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changePageNumberTask(state,action:PayloadAction<number>){
     state.CurrentPage=action.payload
      
    },
    setDateTaskPicker(state,action:PayloadAction<{
      startTask:string,
      dueTask:string
    }>){
      state.date.startTask=action.payload.startTask
      state.date.dueTask=action.payload.dueTask
    },

    setDateTaskPickerNull(state,_action){
      state.date.startTask=null
      state.date.dueTask=null
    }

  },
 
});

export const {changePageNumberTask,setDateTaskPicker,setDateTaskPickerNull} = taskSlice.actions;

export default taskSlice.reducer;


export const selectPage = (state:any) => state.tasks.CurrentPage

export const selectTaskDate=(state:any)=>state.tasks.date