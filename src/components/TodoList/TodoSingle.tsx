import {
  CheckCircle,
  LoaderCircle,
  LoaderIcon,
  MessageCircle,
} from "lucide-react";
import { TableBody, TableCell, TableRow } from "../ui/table";
import TodoDropDown from "./TodoDropDown";
import { Checkbox } from "../ui/checkbox";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { TodoContext } from "@/app/context/todo.context";
import useRolePermission from "@/hooks/useRolePermission";

interface Props {}

const TodoSingle = ({}: Props) => {
  const { todo, loadingStates, handleChangeCheckBox } = useContext(TodoContext);

  const permission = useRolePermission({
    folderId: todo.folderId,
    listId: todo.listId,
    workspaceId: todo.workspaceId,
    taskId: todo.taskId,
  });

  return (
    <TableBody key={todo.id}>
      <TableRow
        className={todo.todo_status === "completed" ? "line-through" : ""}
      >
        <TableCell>
          <Checkbox
            disabled={!permission.developer}
            checked={todo.todo_status === "completed"}
            onClick={() => handleChangeCheckBox(todo)}
            className={`${!permission.developer && "border-red-600"}`}
          />
        </TableCell>
        <TableCell>{todo.todo}</TableCell>
        <TableCell>
          <Link
            to={`/space/${todo.workspaceId}/folders/${todo.folderId}/lists/${todo.listId}/tasks/${todo.taskId}/todo/${todo.id}/comments`}
          >
            <MessageCircle />
          </Link>
        </TableCell>
        <TableCell>
          {loadingStates[todo.id] ? (
            <LoaderIcon className="animate-spin " size={24} />
          ) : todo.todo_status === "in progress" ? (
            <LoaderCircle size={24} />
          ) : (
            <CheckCircle size={24} color="green" />
          )}
        </TableCell>
        <TableCell className="">
          <TodoDropDown permission={permission} />
        </TableCell>
      </TableRow>
    </TableBody>
  );
};
export default TodoSingle;
