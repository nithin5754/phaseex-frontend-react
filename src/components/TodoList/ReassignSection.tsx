import { selectSUggestionCollabTodoOpenClose } from "@/app/redux/slice/todoSlice";
import { AddTodoCollabInput } from "../search"
import {  ReassignSuggestion } from "./index";
import { useSelector } from "react-redux";
import { TodoType } from "@/features/types/TodoType";
import { LottieAnimation } from "../lootie/Lootie";
import Shakehand from '../../../public/json/handshake.json'

interface Props {
  todo:TodoType
}

const ReassignSection = ({todo}:Props) => {
  const openClose=useSelector(selectSUggestionCollabTodoOpenClose)
  
  return (
    <div className="flex  flex-col mx-auto   ">
    <AddTodoCollabInput taskId={todo.taskId}/>
    <>
    {
      openClose&& <ReassignSuggestion workspaceId={todo.workspaceId} folderId={todo.folderId} listId={todo.listId} taskId={todo.taskId} todoId={todo.id} collabId={todo.assignee}/>
    }
    </>

    <LottieAnimation animationData={Shakehand} height={300} width={300}/>

   
   </div>
  )
}
export default ReassignSection