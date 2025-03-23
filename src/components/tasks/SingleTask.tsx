import { Link } from "react-router-dom";
import { TableCell, TableRow } from "../ui/table";
import UpdateTaskStatus from "./UpdateTaskStatus";
import { TaskCollabModal } from "../modal/add-task-collaborators";
import { AnimatedTaskProfile } from "./AnimatedTaskProfile";
import { Check, Circle, UserPlus } from "lucide-react";
import PriorityTaskSetting from "./TaskPiroritySetting";
import { ResponseTaskType } from "@/types";
import UseSpaceRoles from "@/hooks/useSpaceRoles";
import UseListRole from "@/hooks/UseListRole";
import { Button } from "../ui/button";
import useTaskAuth from "@/hooks/useTaskAuth";

interface Props {
  task: ResponseTaskType;
  spaceId: string;
  folderId: string;
  listId: string;
}

const SingleTask = ({ task, spaceId, folderId, listId }: Props) => {
  const isSpaceOwner = UseSpaceRoles({ workspaceId: spaceId });

  const isListRoles = UseListRole({ workspaceId: spaceId, folderId, listId });

  const isUserInTask = useTaskAuth({ task });

  const isManagerOrOwner =
    isSpaceOwner || (isListRoles.status && isListRoles.role === "listManager");
  const canViewTask = isManagerOrOwner || isUserInTask;

  return (
    <TableRow key={task.id} className="dark:border dark:border-border">
      <TableCell className="font-medium text-center">
        {isManagerOrOwner ? (
          <UpdateTaskStatus taskId={task.id} status={task.status_task} />
        ) : (
          <Button className="border-none dark:border-none" variant="outline">
            <Circle className="w-4" />
          </Button>
        )}
      </TableCell>

      <TableCell className="font-medium text-center flex items-center">
        {canViewTask ? (
          <Link
            to={`/space/${spaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
          >
            {task.task_title}
          </Link>
        ) : (
          task.task_title
        )}
      </TableCell>

      <TableCell className="text-center">
        <div className="flex items-center justify-center gap-2">
          {isManagerOrOwner && (
            <TaskCollabModal
              icon={UserPlus}
              spaceId={spaceId}
              folderId={folderId}
              taskId={task.id}
              listId={listId}
            />
          )}
          <AnimatedTaskProfile
            workspaceId={spaceId}
            folderId={folderId}
            listId={listId}
            taskId={task.id}
          />
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
        {canViewTask ? (
          <Link
            to={`/space/${spaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
          >
            . . .
          </Link>
        ) : (
          <></>
        )}
      </TableCell>
    </TableRow>
  );
};
export default SingleTask;
