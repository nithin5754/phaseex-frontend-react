import { Link } from "react-router-dom";
import { TableCell, TableRow } from "../ui/table";
import UpdateTaskStatus from "./UpdateTaskStatus";
import { Check, User } from "lucide-react";
import PriorityTaskSetting from "./TaskPiroritySetting";
import { useContext } from "react";
import { TaskContext } from "@/app/context/task.context";
import { TaskCollabModal } from "../modal/add-task-collaborators";
import { ListsContext } from "@/app/context/lists.context";
import UseSpaceRoles from "@/hooks/useSpaceRoles";

interface Props {}

const SingleTask = ({}: Props) => {
  const { task, workspaceId, folderId, listId } = useContext(TaskContext);

  const isOwner = UseSpaceRoles({ workspaceId });

  const { isCurrentUserManager, isManagerExists } = useContext(ListsContext);

  return (
    <TableRow
      key={task.id}
      className="dark:border dark:border-border hover:bg-muted/50 transition-colors"
    >
      <TableCell className="text-center align-middle">
        <UpdateTaskStatus taskId={task.id} status={task.status_task} />
      </TableCell>

      <TableCell className="text-center align-middle">
        <Link
          to={`/space/${workspaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          {task.task_title}
        </Link>
      </TableCell>

      <TableCell className="text-center align-middle">
        <div className="flex items-center justify-center">
          <TaskCollabModal
            icon={User}
            permission={(isManagerExists && isCurrentUserManager) || isOwner}
          />
        </div>
      </TableCell>

      <TableCell className="text-center align-middle w-[160px]">
        {task.status_task === "complete" ? (
          <div className="flex items-center justify-center gap-1 text-green-700 font-semibold">
            <Check className="w-4 h-4" style={{ strokeWidth: 6 }} />
            <span className="capitalize">{task.status_task}</span>
          </div>
        ) : (
          <span className="capitalize">{task.status_task}</span>
        )}
      </TableCell>

      <TableCell className="text-center align-middle">
        <PriorityTaskSetting
          priority={task.priority_task}
          permission={(isManagerExists && isCurrentUserManager) || isOwner}
        />
      </TableCell>

      <TableCell className="text-center align-middle">
        <Link
          to={`/space/${workspaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
          className="inline-block text-xl font-bold hover:text-primary"
        >
          &hellip;
        </Link>
      </TableCell>
    </TableRow>
  );
};
export default SingleTask;
