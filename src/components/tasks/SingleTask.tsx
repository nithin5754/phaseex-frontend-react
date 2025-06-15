import { Link } from "react-router-dom";
import { TableCell, TableRow } from "../ui/table";
import UpdateTaskStatus from "./UpdateTaskStatus";

import { Check} from "lucide-react";
import PriorityTaskSetting from "./TaskPiroritySetting";
import { ResponseTaskType } from "@/types";





interface Props {
  task: ResponseTaskType;
  spaceId: string;
  folderId: string;
  listId: string;
}

const SingleTask = ({ task, spaceId, folderId, listId }: Props) => {
  // const isSpaceOwner = UseSpaceRoles({ workspaceId: spaceId });







  return (
    <TableRow key={task.id} className="dark:border dark:border-border">
      <TableCell className="font-medium text-center">

          <UpdateTaskStatus taskId={task.id} status={task.status_task} />
       
      </TableCell>

      <TableCell className="font-medium text-center flex items-center">
     
          <Link
            to={`/space/${spaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
          >
            {task.task_title}
          </Link>
     
      </TableCell>

      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-2">
    
        <h1>  task collab add</h1>

     
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
        <PriorityTaskSetting
          priority={task.priority_task}
          workspaceId={spaceId}
          folderId={folderId}
          taskId={task.id}
          id={listId}
        />
      </TableCell>

      <TableCell className="text-center">

          <Link
            to={`/space/${spaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
          >
            . . .
          </Link>

      </TableCell>
    </TableRow>
  );
};
export default SingleTask;
