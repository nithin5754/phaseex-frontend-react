

import { LottieAnimation } from "../lootie/Lootie"
import {  AddTodoCollabInput } from "../search"
import collabLootie from '.././../../public/json/collabrative-1.json'

import { useSelector } from "react-redux";

import { AddTodoCollabSuggestion, MembersTodoCollabPage } from "./index";
import { selectSUggestionCollabTodoOpenClose } from "@/app/redux/slice/todoSlice";

import { useGetAllTodoCollabByIdQuery } from "@/app/redux/api/todoapi";



interface Props {
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todoId:string
}
const CollabTodo = ({workspaceId,folderId,listId,taskId,todoId}:Props) => {

  const openClose=useSelector(selectSUggestionCollabTodoOpenClose)

  const {data:getAllTodoCollabById}=useGetAllTodoCollabByIdQuery({workspaceId,folderId,listId,taskId,todoId})  

  console.log(getAllTodoCollabById,"hey uii todo list mhnnn");
  
  return (
     <div className="flex  flex-col mx-auto mt-4  ">
      <AddTodoCollabInput taskId={taskId}/>
      <>
      {
        openClose&& <AddTodoCollabSuggestion workspaceId={workspaceId} folderId={folderId} listId={listId} taskId={taskId} todoId={todoId}/>
      }
      </>
    {
      getAllTodoCollabById&&getAllTodoCollabById.length>0?(
        <>
        <MembersTodoCollabPage workspaceId={workspaceId} folderId={folderId} listId={listId} taskId={taskId} todoId={todoId}/>

        </>
      ):(<LottieAnimation animationData={collabLootie} height={300} width={300}/>)
    }
     
     </div>
  )
}
export default CollabTodo