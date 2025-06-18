import { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOpenTaskDesc,
  setOpenDescTask,
} from "@/app/redux/slice/taskSlice";
import { Todos } from "../TodoList/index";
import { ResponseTaskType } from "@/types";
import { SendDescriptionTaskType } from "@/types/taskType";
import { useOnUpdateDescriptionTaskMutation } from "@/app/redux/api/taskapi";
import { toast } from "../ui/use-toast";
import TaskLinks from "./TaskLinks";

import useRolePermission from "@/hooks/useRolePermission";

interface Props {
  singleTask: ResponseTaskType | null;
}

const TaskMainLeft = ({ singleTask }: Props) => {
  const openDescTask: boolean = useSelector(selectOpenTaskDesc);

  const [isDescription, setDescription] = useState<string>("");
  const permission = useRolePermission({
    workspaceId: singleTask?.workspaceId,
    folderId: singleTask?.folderId,
    taskId: singleTask?.id,
    listId: singleTask?.listId,
  });

  useEffect(() => {
    if (singleTask) {
      setDescription(singleTask.task_description);
    }
  }, [singleTask]);

  const [onUpdateDescriptionTask] = useOnUpdateDescriptionTaskMutation();

  const dispatch = useDispatch();

  const handleUpdateDescription = async () => {
    if (singleTask) {
      let TaskTodoData: SendDescriptionTaskType = {
        task_description: isDescription,
        workspaceId: singleTask?.workspaceId,
        folderId: singleTask?.folderId,
        taskId: singleTask?.id,
        listId: singleTask?.listId,
      };

      try {
        let response = await onUpdateDescriptionTask(TaskTodoData).unwrap();

        if (response) {
          dispatch(setOpenDescTask(false));
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
  };

  return (
    <div>
      <h1 className="font-sfpro text-lg ">Description</h1>
      {!openDescTask && (
        <>
          <div className="flex p-4  dark:text-primary">
            <div className="text-start overflow-auto max-h-[300px]">
              <p
                tabIndex={0}
                onFocus={() => dispatch(setOpenDescTask(true))}
                className="break-words break-all"
              >
                {singleTask
                  ? singleTask.task_description
                  : "write description about task...."}
              </p>
            </div>
          </div>
        </>
      )}
      <div>
        {singleTask && singleTask.taskLink.length > 0 && (
          <TaskLinks links={singleTask?.taskLink} />
        )}
      </div>
      {openDescTask && (
        <div className="flex flex-col gap-4 mb-6">
          <Textarea
            placeholder="write description about task...."
            value={isDescription}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-4">
            <Button
              disabled={!(permission.manager || permission.owner)}
              onClick={() => dispatch(setOpenDescTask(false))}
            >
              close
            </Button>
            <Button
              disabled={!(permission.manager || permission.owner)}
              onClick={handleUpdateDescription}
            >
              Add
            </Button>
          </div>
        </div>
      )}

      <Todos />
    </div>
  );
};
export default TaskMainLeft;
