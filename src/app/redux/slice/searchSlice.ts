
import { ResponseSUserType } from '@/types/searchType';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';





export interface SearchCachedType {
 [key:string]:ResponseSUserType[]
}




const initialState: SearchCachedType = {
};
  

export const CachedSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    cacheResults(state,action:PayloadAction<any>){
    
      state = Object.assign(state, action.payload);

      const keys = Object.keys(state);

      if (keys.length > 10) {
        let oldKeys=keys.slice(0,keys.length-10)

        oldKeys.forEach((key)=> delete state[key])
      }
      
    },


  },
 
});

export const {cacheResults} = CachedSlice.actions;

export default CachedSlice.reducer;


export const selectPage = (state:any) => state.tasks.CurrentPage
