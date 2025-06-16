import { Link } from "react-router-dom";
import { TableCell, TableRow } from "../ui/table";
import UpdateTaskStatus from "./UpdateTaskStatus";
import { Check, User } from "lucide-react";
import PriorityTaskSetting from "./TaskPiroritySetting";
import { useContext } from "react";
import { TaskContext } from "@/app/context/task.context";
import { TaskCollabModal } from "../modal/add-task-collaborators";

interface Props {}

const SingleTask = ({}: Props) => {
  const { task, workspaceId, folderId, listId } = useContext(TaskContext);

  return (
    <TableRow key={task.id} className="dark:border dark:border-border">
      <TableCell className="font-medium text-center">
        <UpdateTaskStatus taskId={task.id} status={task.status_task} />
      </TableCell>

      <TableCell className="font-medium text-center flex items-center">
        <Link
          to={`/space/${workspaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
        >
          {task.task_title}
        </Link>
      </TableCell>

      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-2">
     <TaskCollabModal icon={User}/>
        </div>
      </TableCell>

      <TableCell className="w-[160px] text-center">
        {task.status_task === "complete" ? (
          <div className="flex items-center gap-1">
            <Check className="w-4 text-green-800" style={{ strokeWidth: 6 }} />
            {task.status_task}
          </div>
        ) : (
          task.status_task
        )}
      </TableCell>

      <TableCell className="text-center">
        <PriorityTaskSetting priority={task.priority_task} />
      </TableCell>

      <TableCell className="text-center">
        <Link
          to={`/space/${workspaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
        >
          . . .
        </Link>
      </TableCell>
    </TableRow>
  );
};
export default SingleTask;
