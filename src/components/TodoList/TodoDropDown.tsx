
import {FileEdit, LoaderPinwheel, Trash,  } from "lucide-react";

import { TodoModalEdit } from "../modal/Todo-edit-modal";

import { useOnDeleteTaskTodoMutation } from "@/app/redux/api/todoapi";

import { SendDeleteTodoTask } from "@/types/TodoType";
import { toast } from "../ui/use-toast";
import UseSpaceRoles from "@/hooks/useSpaceRoles";

import { CActivitySendType } from "@/types/TActivity";
import { useOnCreateActivityMutation } from "@/app/redux/api/activityApi";
import { useSelector } from "react-redux";
import { selectCurrentUserName } from "@/features/auth/authSlice";

interface Props {
  workspaceId:string,
  folderId:string,
  listId:string,
  taskId:string
  todoId:string,
  todo:string,
  todo_status:string
}

const TodoDropDown = ({workspaceId,folderId,listId,taskId,todoId,todo,todo_status}:Props) => {
const [onDeleteTaskTodo,{isLoading}]=useOnDeleteTaskTodoMutation()
const isSpaceOwner = UseSpaceRoles({ workspaceId });



const [onCreateActivity]=useOnCreateActivityMutation() 
const currentName=useSelector(selectCurrentUserName)

const handleDelete=async()=>{

  let TaskTodoData: SendDeleteTodoTask= {
    taskId,
    workspaceId,
    folderId,
    listId,
    todoId,
  };

   try {
   let response= await onDeleteTaskTodo(TaskTodoData).unwrap();

   if(response){
              
    let ActivityData:CActivitySendType={
      workspaceId,
      folderId,
      listId,
      taskId,
      activity:`${currentName} deleted the todo ${todo} `
    }
    await onCreateActivity(ActivityData).unwrap()
   }


   
   } catch (error: any) {
    if (!error.status) {
      toast({
        title: "no response",
        variant: "destructive",
      });
    } else if (error.status) {
      toast({
        title: `${error.data.message}`,
        variant: "destructive",
      });
    }
  } 
  
}

  return (
    <div className="flex gap-3 ">
      <>
      {
  todo_status === 'completed' ? (
    <FileEdit size={23} color="#47504f" />
  ) : (
    <>
      {isSpaceOwner ? (
        <TodoModalEdit
          icon={FileEdit}
          spaceId={workspaceId}
          folderId={folderId}
          listId={listId}
          taskId={taskId}
          todoId={todoId}
          todo={todo}
        />
      ) : (
        <FileEdit size={23} color="#47504f" />
      )}
    </>
  )
}

      </>

      <>
      {isSpaceOwner  ? (
        <>
        {
         isLoading?(<>
            <LoaderPinwheel className="animate-spin " size={24}/>
         </>):( <>
           <Trash size={23} onClick={handleDelete}/>
           </>)
        }
        </>
      ) : (
        <Trash size={23} color="#47504f" />
      )}
    </>


      
    </div>
      
  )
}
export default TodoDropDown