import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../api/store";


export interface PromptType {
  id?:string;
  question: string;
  questionType?:"text"|"image"
  answer: string | null;
}


interface  chatGroupType {
  groupId:string;
  userId:string;
  title:string
  prompt: PromptType[];
}

export interface geminiType {
chatGroup:chatGroupType[]
 
}

const initialState: geminiType = {
  chatGroup: []
};

export const GeminiSlice = createSlice({
  name: "gemini",
  initialState,
  reducers: {

    addAllGroupToSlice(state,action:PayloadAction< {
      groupId: string;
      title: string;
      userId: string;
      prompt:[];
  }[]>){

    state.chatGroup = [...state.chatGroup, ...action.payload];

  },

  addPrompt(state,action:PayloadAction<{prompt:PromptType[],groupId:string}>){

    let findGroup=state.chatGroup.find((chat)=>chat.groupId===action.payload.groupId)

    if(findGroup){
      findGroup.prompt=[]
      findGroup.prompt=[...findGroup.prompt,...action.payload.prompt]
    }
    
    
    
      
  },

   addGroup(state,action:PayloadAction<{groupId:string,userId:string,title:string}>){
      state.chatGroup.push({groupId:action.payload.groupId,userId:action.payload.userId,title:action.payload.title,prompt:[]})
   },

    addQuestion(state, action: PayloadAction<{ question: string,groupId:string }>) {
          
          let findGroup=state.chatGroup.find((chat)=>chat.groupId===action.payload.groupId)

        if(findGroup){
          findGroup.prompt.push({ question: action.payload.question, answer: null });
        }

    },

    addAnswer(
      state,
      action: PayloadAction<{ question: string; answer: string,groupId:string, }>
    ) {

      let findGroup=state.chatGroup.find((chat)=>chat.groupId===action.payload.groupId)

      if(findGroup){

        const prompt = findGroup.prompt.find(
          (p) => p.question === action.payload.question && p.answer === null
        );


        if (prompt && prompt.answer === null) {
          prompt.answer = action.payload.answer;
        } else {
          findGroup.prompt.push({
            question: action.payload.question,
            answer: action.payload.answer,
          });
        }
         
      }

   
   
    },
  },
});

export const { addQuestion, addAnswer,addGroup,addAllGroupToSlice,addPrompt } = GeminiSlice.actions;

export default GeminiSlice.reducer;

export const selectAllPrompt = (state: RootState) => state.gemini.chatGroup;
