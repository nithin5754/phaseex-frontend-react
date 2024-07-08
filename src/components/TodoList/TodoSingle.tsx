import { CheckCircle, Dna, LoaderCircle, LoaderIcon, UserPlus2 } from "lucide-react"
import { TodoCollabModal } from "../modal/add-todo-collab"
import { TableBody, TableCell, TableRow } from "../ui/table"
import { AnimatedTodoProfile } from "./AnimatedTodoCollabProfile"
import TodoDropDown from "./TodoDropDown"
import { Checkbox } from "../ui/checkbox"
import { TodoType } from "@/features/types/TodoType"
import UseListRole from "@/hooks/UseListRole"
import UseSpaceRoles from "@/hooks/useSpaceRoles"
import UseTodoRoles from "@/hooks/useTodoRoles"
import { ReassignTodo } from "./index";


interface Props {
  todo:TodoType
  loadingStates:{ [key: string]: boolean }
  handleChangeCheckBox: (todo: TodoType) => void;
}

const TodoSingle = ({todo,loadingStates,handleChangeCheckBox}:Props) => {
  
  const isTodoRoles=UseTodoRoles({todo})
  const isSpaceOwner = UseSpaceRoles({ workspaceId:todo.workspaceId });

  const isListRoles = UseListRole({ workspaceId:todo.workspaceId, folderId:todo.folderId, listId: todo.listId });

  

  return (
    <TableBody key={todo.id}>
    <TableRow
    className={todo.todo_status==='completed'?'line-through':''}
    >
      <TableCell >
        <Checkbox
        disabled={!isTodoRoles}
          checked={todo.todo_status==='completed'}
          onClick={() => handleChangeCheckBox(todo)}
          className={`${ !isTodoRoles&&'border-red-600'}`}
        />
      </TableCell>
      <TableCell>{todo.todo}</TableCell>
      <TableCell>
      <div className="flex items-center justify-center gap-4">
        {
         ( isSpaceOwner||isListRoles.role==='listManager')&&(
            <>
            <TodoCollabModal icon={UserPlus2} spaceId={todo.workspaceId} folderId={todo.folderId} 
            listId={todo.listId} taskId={todo.taskId} todoId={todo.id}/>
            
            </>
          )
        }
      <AnimatedTodoProfile workspaceId={todo.workspaceId} folderId={todo.folderId} listId={todo.listId} taskId={todo.taskId} todoId={todo.id}/>
      </div>
      </TableCell>
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
      <TableCell className=" flex justify-center items-center mx-auto">
     
<ReassignTodo collabId={todo.assignee} todo={todo}/>

     </TableCell>
    </TableRow>
  </TableBody>
  )
}
export default TodoSingle