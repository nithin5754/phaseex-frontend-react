






import { WorkSpaceCollabType } from '@/types/searchType';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../api/store';




interface listState {
  CurrentPage:number|1;
  date:{
    startList:string|null,
    dueList:string|null
  },
  listSearchCollab:WorkSpaceCollabType[]|null,
  listSearchQueyCollab:string;
  listSuggestionOpenClose:boolean



}

const initialState: listState = {
  CurrentPage: 1,
  date: {
    startList: null,
    dueList: null
  },
  listSearchCollab: null,
  listSearchQueyCollab:'',
  listSuggestionOpenClose:false
};

export const listSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    changePageNumber(state,action:PayloadAction<number>){
     state.CurrentPage=action.payload
      
    },
    setDateListPicker(state,action:PayloadAction<{
      startList:string,
      dueList:string
    }>){
      state.date.startList=action.payload.startList
      state.date.dueList=action.payload.dueList
    },

    setDatePickerNull(state,action:PayloadAction<{
      startList:null,
      dueList:null
    }>){
      state.date.startList=action.payload.startList
      state.date.dueList=action.payload.dueList
    },
    setSearchListCollab(state,action:PayloadAction<WorkSpaceCollabType[]>){
      state.listSearchCollab=action.payload
    },
    removeSearchListCollab(state,_action){
      state.listSearchCollab=null
    },

    setSearchListQuery(state,action:PayloadAction<string>){
      state.listSearchQueyCollab=action.payload
    },
    setSuggestionOpen(state,_action){
      state.listSuggestionOpenClose=true
    },
    setSuggestionClose(state,_action){
      state.listSuggestionOpenClose=false
    }
  },
 
});

export const {changePageNumber,setDateListPicker,setDatePickerNull,setSearchListCollab,removeSearchListCollab,setSearchListQuery,setSuggestionOpen,setSuggestionClose} = listSlice.actions;

export default listSlice.reducer;


export const selectPage = (state:any) => state.lists.CurrentPage

export const selectListDate=(state:any)=>state.lists.date

export const selectListCollabSpace=(state:RootState)=>state.lists.listSearchCollab

export const selectSearchQuery=(state:RootState)=>state.lists.listSearchQueyCollab

export const selectSUggestionCollabListOpenClose=(state:RootState)=>state.lists.listSuggestionOpenClose