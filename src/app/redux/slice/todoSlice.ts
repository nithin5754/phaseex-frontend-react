import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../api/store";
import { TodoType } from "@/features/types/TodoType";
import { WorkSpaceCollabType } from "@/features/types/searchType";

export interface TodoSliceType {
  searchTodoItem: TodoType[] | null;
  searchTodoQuery: string | "";
  recentlySearched: string[];
  todoRecentlySearchSuggestion:boolean;
  SearchTodoCollabQuery:string|""

  todoSearchCollab:WorkSpaceCollabType[]|null,
  todoSearchQueyCollab:string;
  todoSuggestionOpenClose:boolean
}

const initialState: TodoSliceType = {
  searchTodoItem: null,
  searchTodoQuery: "",
  SearchTodoCollabQuery:"",
  recentlySearched: [],
  todoRecentlySearchSuggestion: false,


  todoSearchCollab: null,
  todoSearchQueyCollab:'',
  todoSuggestionOpenClose:false
};

export interface TodoStatus {
  id: string;
  todo_status: "completed" | "in progress" | "hidden";
}
export interface TodoNameType {
  id: string;
  todo: string;
}

export const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setSearchTodoItem: (state, action: PayloadAction<TodoType[] | null>) => {
      if (action.payload) {
        state.searchTodoItem = action.payload;
      } else {
        state.searchTodoItem = null;
      }
    },

    setSearchTodoQuery: (state, action: PayloadAction<string | "">) => {
      if (action.payload) {
        state.searchTodoQuery = action.payload;
      } else {
        state.searchTodoQuery = "";
      }
    },

    setSearchTodoCollabQuery: (state, action: PayloadAction<string | "">) => {
      if (action.payload) {
        state.SearchTodoCollabQuery = action.payload;
      } else {
        state.SearchTodoCollabQuery = "";
      }
    },

    updateTodoStatus: (state, action: PayloadAction<TodoStatus>) => {
      const { id, todo_status } = action.payload;
      if (state.searchTodoItem && id && state.searchTodoItem.length > 0) {
        const index = state.searchTodoItem.findIndex((todo) => todo.id === id);

        state.searchTodoItem[index].todo_status = todo_status;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      if (state.searchTodoItem && state.searchTodoItem.length > 0) {
        state.searchTodoItem = state.searchTodoItem.filter(
          (todo) => todo.id !== action.payload
        );
      }
    },

    updateTodoName: (state, action: PayloadAction<TodoNameType>) => {
      const { id, todo } = action.payload;

      console.log(action.payload, "update name");

      if (state.searchTodoItem && state.searchTodoItem.length > 0) {
        const index = state.searchTodoItem.findIndex((todo) => todo.id === id);
        state.searchTodoItem[index].todo = todo;
      }
    },

    setRecentlySearched: (state, action: PayloadAction<string>) => {
      if (!state.recentlySearched.includes(action.payload)&&action.payload !== "") {
        state.recentlySearched = [...state.recentlySearched, action.payload];
      }

        if(state.recentlySearched.length>5){
          state.recentlySearched.splice(0, state.recentlySearched.length-5);
        }
    },

    setTodoRecentlySearchSuggestion:(state,action:PayloadAction<boolean>)=>{
      
      state.todoRecentlySearchSuggestion=action.payload
    },

    setSearchTodoCollab(state,action:PayloadAction<WorkSpaceCollabType[]>){
      state.todoSearchCollab=action.payload
    },
    removeSearchTodoCollab(state,_action){
      state.todoSearchCollab=null
    },


    setSuggestionOpen(state,_action){
      state.todoSuggestionOpenClose=true
    },
    setSuggestionClose(state,_action){
      state.todoSuggestionOpenClose=false
    }
  },
});

export const {
  setSearchTodoItem,
  setSearchTodoQuery,
  updateTodoStatus,
  deleteTodo,
  updateTodoName,
  setRecentlySearched,
  setTodoRecentlySearchSuggestion,
  setSearchTodoCollab,
  removeSearchTodoCollab,
  setSuggestionOpen,
  setSearchTodoCollabQuery,
  setSuggestionClose

} = TodoSlice.actions;

export default TodoSlice.reducer;

export const selectTodoQuery = (store: RootState) => store.todo.searchTodoQuery;
export const selectTodoItem = (store: RootState) => store.todo.searchTodoItem;
export const selectRecentlySearchQuery = (store: RootState) =>
  store.todo.recentlySearched;

export const selectTodoCollabQuery = (store: RootState) =>
  store.todo.SearchTodoCollabQuery;


// export const selectRecentlySearchedItem=(store:RootState)=>store.todo.todoRecentlySearchSuggestion


  export const selectShowRecently=(store:RootState)=>store.todo.todoRecentlySearchSuggestion


  export const selectTodoCollabSpace=(state:RootState)=>state.todo.todoSearchCollab

export const selectSearchQuery=(state:RootState)=>state.todo.todoSearchQueyCollab

export const selectSUggestionCollabTodoOpenClose=(state:RootState)=>state.todo.todoSuggestionOpenClose
