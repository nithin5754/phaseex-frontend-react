

import { LottieAnimation } from "../lootie/Lootie"
import {  AddTodoCollabInput } from "../search"
import collabLootie from '.././../../public/json/collabrative-1.json'

import { useSelector } from "react-redux";
import { selectSUggestionCollabListOpenClose } from "@/app/redux/slice/listSlice";
import { useGetCollabListByIdQuery } from "@/app/redux/api/listapi";
import { AddTodoCollabSuggestion } from "./index";
import { selectSUggestionCollabTodoOpenClose } from "@/app/redux/slice/todoSlice";
import { todo } from "node:test";


interface Props {
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todoId:string
}
const CollabTodo = ({workspaceId,folderId,listId,taskId,todoId}:Props) => {

  const openClose=useSelector(selectSUggestionCollabTodoOpenClose)

  // const {data:getCollabListById}=useGetCollabListByIdQuery({workspaceId,folderId,listId})  
  return (
     <div className="flex  flex-col mx-auto mt-4  ">
      <AddTodoCollabInput/>
      <>
      {
        openClose&& <AddTodoCollabSuggestion workspaceId={workspaceId} folderId={folderId} listId={listId} taskId={taskId} todoId={todoId}/>
      }
      </>
    {/* {
      getCollabListById&&getCollabListById.length>0?(
        <>
        <MembersListAddPage workspaceId={workspaceId} folderId={folderId} listId={listId}/>
        </>
      ):(<LottieAnimation animationData={collabLootie} height={300} width={300}/>)
    } */}
     
     </div>
  )
}
export default CollabTodo