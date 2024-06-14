
import {
  Table,
  TableBody,

  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "../ui/checkbox"
import { CheckCircle,  LoaderCircle,  LoaderIcon, MoreHorizontal} from "lucide-react"
import { SendTodoCheckBox, TodoType } from "@/features/types/TodoType"

import { useOnUpdateStatusTodoMutation } from "@/app/redux/api/todoapi";
import { useState } from "react";

import TodoDropDown from "./TodoDropDown";
import { toast } from "../ui/use-toast";
import { useSelector } from "react-redux";
import { selectTodoItem, selectTodoQuery } from "@/app/redux/slice/todoSlice";


interface Props {
  getAllTodoTask:TodoType[];

}

const TodoTable = ({getAllTodoTask}:Props) => {

  const [onUpdateStatusTodo]=useOnUpdateStatusTodoMutation()

  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({});

  const searchTodoItem=useSelector(selectTodoItem)
  const searchTodoQuery=useSelector(selectTodoQuery)

  
    const handleChangeCheckBox = async(todo:TodoType) => {
      setLoadingStates({...loadingStates, [todo.id]: true });
 let todo_status:"completed"|"in progress"|"hidden" = todo.todo_status === 'completed'? 'in progress' : 'completed';

    let todoSendData:SendTodoCheckBox={
      workspaceId:todo.workspaceId,
      folderId:todo.folderId,
      todo_status:todo_status,
      listId:todo.listId,
      taskId:todo.taskId,
      id:todo.id
    }

    try {
      const response=await onUpdateStatusTodo(todoSendData).unwrap()
      if(response){
        setLoadingStates({...loadingStates, [todo.id]: false });
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
    } finally {
      setLoadingStates({...loadingStates, [todo.id]: false });
    }
    
  };


  return (

    <Table>
    <TableHeader>
      <TableRow>
        <TableHead ></TableHead>
        <TableHead>todo</TableHead>
        <TableHead>assignee</TableHead>
        <TableHead>status</TableHead>
        <TableHead className="text-center">action</TableHead>
      </TableRow>
    </TableHeader>
<>
{
  searchTodoQuery===""?(
   <>
    {getAllTodoTask.map((todo) => (
      <TableBody key={todo.id}>
        <TableRow
        className={todo.todo_status==='completed'?'line-through':''}
      
        >
          <TableCell >
            <Checkbox
      
              checked={todo.todo_status==='completed'}
              onClick={() => handleChangeCheckBox(todo)}
            />
          </TableCell>
          <TableCell>{todo.todo}</TableCell>
          <TableCell>{todo.assignee}</TableCell>
          <TableCell>
          {loadingStates[todo.id]? (
                <LoaderIcon className="animate-spin " size={24}/>
              ) : (
                todo.todo_status === 'in progress'? (
                  <LoaderCircle  size={24}/>
                ) : (
                  <CheckCircle size={24} color="green" />
                )
              )}
</TableCell>
          <TableCell className="">
         
          <TodoDropDown workspaceId={todo.workspaceId} folderId={todo.folderId} listId={todo.listId} taskId={todo.taskId} todoId={todo.id} todo={todo.todo} todo_status={todo.todo_status} />

          </TableCell>
        </TableRow>
      </TableBody>
    ))}
   </>
  ):(<>
      {searchTodoItem&&searchTodoItem.length>0&&searchTodoItem.map((todo) => (
      <TableBody key={todo.id}>
        <TableRow
        className={todo.todo_status==='completed'?'line-through':''}
      
        >
          <TableCell >
            <Checkbox
      
              checked={todo.todo_status==='completed'}
              onClick={() => handleChangeCheckBox(todo)}
            />
          </TableCell>
          <TableCell>{todo.todo}</TableCell>
          <TableCell>{todo.assignee}</TableCell>
          <TableCell>
          {loadingStates[todo.id]? (
                <LoaderIcon className="animate-spin " size={24}/>
              ) : (
                todo.todo_status === 'in progress'? (
                  <LoaderCircle  size={24}/>
                ) : (
                  <CheckCircle size={24} color="green" />
                )
              )}
</TableCell>
          <TableCell className="">
         
          <TodoDropDown workspaceId={todo.workspaceId} folderId={todo.folderId} listId={todo.listId} taskId={todo.taskId} todoId={todo.id} todo={todo.todo} todo_status={todo.todo_status} />

          </TableCell>
        </TableRow>
      </TableBody>
    ))}
  </>)
}
</>
  </Table>
  )
}
export default TodoTable