import {
  CheckCircle,
  LoaderCircle,
  LoaderIcon,
  MessageCircle,
} from "lucide-react";

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

  const renderStatusIcon = () => {
    if (loadingStates[todo.id]) {
      return <LoaderIcon className="animate-spin" size={24} />;
    }
    return todo.todo_status === 'in progress' ? (
      <LoaderCircle size={24} />
    ) : (
      <CheckCircle size={24} color="green" />
    );
  };

  return (
<tbody className="">
  <tr className={`text-sm ${todo.todo_status === 'completed' ? 'line-through text-gray-500' : ''}`}>

    <td className="p-4 text-center">
      <Checkbox
        disabled={!(permission.developer || permission.manager)}
        checked={todo.todo_status === 'completed'}
        onChange={() => handleChangeCheckBox(todo)}
        className={`${!permission.developer && !permission.manager ? 'border-red-600' : ''}`}
      />
    </td>

    <td className="p-4 text-left max-w-xs truncate">{todo.todo}</td>


    <td className="p-4 ">
      <Link
        to={`/space/${todo.workspaceId}/folders/${todo.folderId}/lists/${todo.listId}/tasks/${todo.taskId}/todo/${todo.id}/comments`}
        className="flex items-center gap-2 text-blue-600 hover:underline"
        aria-label={`View comments for ${todo.todo}`}
      >
        <MessageCircle size={18} />
        <span className="hidden sm:inline">Comments</span>
      </Link>
    </td>


    <td className="p-4 ">{renderStatusIcon()}</td>


    <td className="p-4 ">
      <TodoDropDown permission={permission} />
    </td>
  </tr>
</tbody>

  );
};
export default TodoSingle;
