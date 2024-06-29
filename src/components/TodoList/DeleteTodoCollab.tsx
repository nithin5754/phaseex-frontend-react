


import { SendAddCollabListType } from "@/app/redux/api/listapi"
import { useOnDeleteCollabToTodoMutation } from "@/app/redux/api/todoapi";
import { SendAddCollabTodoTask, TodoCollabType } from "@/features/types/TodoType";
import { Trash } from "lucide-react";

    


interface Props {
  collabList: TodoCollabType;
  checkingDetails:SendAddCollabTodoTask
}

const DeleteTodoCollab = ({collabList,checkingDetails}:Props) => {

  const [onDeleteCollabToTodo]=useOnDeleteCollabToTodoMutation()
  const HandleSubmit=async()=>{
   try {
    await onDeleteCollabToTodo({ workspaceId:checkingDetails.workspaceId,folderId:checkingDetails.folderId,listId:checkingDetails.listId,taskId:checkingDetails.taskId,todoId:checkingDetails.todoId,collabId:checkingDetails.collabId}).unwrap()
   } catch (error) {
    console.log(error,"deleteing todo collab id");

   }

  }
  return (
    <Trash size={18} onClick={HandleSubmit} />
  )
}

  
export default DeleteTodoCollab