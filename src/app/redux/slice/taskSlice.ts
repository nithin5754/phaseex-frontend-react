






import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../api/store';
import { WorkSpaceCollabType } from '@/types/searchType';




interface taskState {
  CurrentPage:number|1;
  openDesc:boolean;
 taskSearchCollab:WorkSpaceCollabType[]|null,
 taskSearchQueyCollab:string;
 taskSuggestionOpenClose:boolean


}

const initialState: taskState = {
  CurrentPage: 1,
  openDesc: false,
  taskSearchCollab: null,
  taskSearchQueyCollab: '',
  taskSuggestionOpenClose: false,

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
    },



    setSearchTaskCollab(state,action:PayloadAction<WorkSpaceCollabType[]>){
      state.taskSearchCollab=action.payload
    },
    removeSearchTaskCollab(state,_action){
      state.taskSearchCollab=null
    },

    setSearchTaskQuery(state,action:PayloadAction<string>){
      state.taskSearchQueyCollab=action.payload
    },
    setSuggestionOpen(state,_action){
      state.taskSuggestionOpenClose=true
    },
    setSuggestionClose(state,_action){
      state.taskSuggestionOpenClose=false
    },





  },
 
});

export const {changePageNumberTask,setOpenDescTask,setSearchTaskCollab,removeSearchTaskCollab,setSearchTaskQuery,setSuggestionClose,setSuggestionOpen,} = taskSlice.actions;

export default taskSlice.reducer;


export const selectPage = (state:any) => state.tasks.CurrentPage
export const selectOpenTaskDesc=(state:RootState)=>state.tasks.openDesc


export const selectTaskCollabSpace=(state:RootState)=>state.tasks.taskSearchCollab

export const selectSearchQuery=(state:RootState)=>state.tasks.taskSearchQueyCollab

export const selectSUggestionCollabTaskOpenClose=(state:RootState)=>state.tasks.taskSuggestionOpenClose



