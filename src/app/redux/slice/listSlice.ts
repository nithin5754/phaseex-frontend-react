






import { PayloadAction, createSlice } from '@reduxjs/toolkit';




interface listState {
  CurrentPage:number|1;
  date:{
    startList:string|null,
    dueList:string|null
  }
}

const initialState: listState = {
  CurrentPage: 1,
  date:{
    startList:null,
    dueList:null
  }

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
    }

  },
 
});

export const {changePageNumber,setDateListPicker,setDatePickerNull} = listSlice.actions;

export default listSlice.reducer;


export const selectPage = (state:any) => state.lists.CurrentPage

export const selectListDate=(state:any)=>state.lists.date