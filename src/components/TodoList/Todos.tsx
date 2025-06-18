import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { useParams } from "react-router-dom";
import { useGetAllTodoTaskQuery } from "@/app/redux/api/todoapi";
import { Plus } from "lucide-react";
import { TodoSearch, TodoTable } from "./index";

import { LottieAnimation } from "../lootie/Lootie";

import emptyTodoTask from "../../../public/json/empty-todo-task-1.json";
import { TodoModalCreate } from "../modal/todo-modal-create";
import useRolePermission from "@/hooks/useRolePermission";

const Todos = () => {
  const { id, folderId, listId, taskId } = useParams();
  const permission = useRolePermission({
    workspaceId: id,
    folderId: folderId,
    taskId: taskId,
    listId: listId,
  });

  if (!id || !folderId || !listId || !taskId) {
    return <h1>loading...</h1>;
  }

  if (
    typeof id !== "string" ||
    typeof folderId !== "string" ||
    typeof listId !== "string" ||
    typeof taskId !== "string"
  ) {
    return <h1>loading....</h1>;
  }

  const { data: getAllTodoTask } = useGetAllTodoTaskQuery({
    workspaceId: id,
    folderId,
    listId,
    taskId,
  });

  return (
    <div className="flex w-full flex-col mt-8">
      <div className="flex flex-wrap m-auto gap-2">
        <div className="">
          <h1 className="font-sfpro text-xl w-28">Todo Task</h1>
        </div>

        <TodoSearch />

        {
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <TodoModalCreate
                  spaceId={id}
                  folderId={folderId}
                  listId={listId}
                  taskId={taskId}
                  icon={Plus}
                  permission={permission.developer||permission.manager||permission.owner}
                />
              </TooltipTrigger>
              <TooltipContent className="">
                <p className="font-sfpro">Add todo task</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
      </div>

      <div className="w-full h-min-[300px] border bg-white text-black font-sfpro shadow-sm rounded-lg overflow-hidden dark:bg-background dark:text-primary dark:border-border">
        <div className="p-6">
          <h1 className="font-sfpro text-xl">Todo</h1>
          {getAllTodoTask && getAllTodoTask.length > 0 ? (
            <>
              <div className="flex flex-wrap items-center justify-between mb-2 dark:bg-background dark:text-primary dark:border-border">
                <TodoTable
                  getAllTodoTask={
                    getAllTodoTask && getAllTodoTask.length > 0
                      ? getAllTodoTask
                      : []
                  }
                />
              </div>
            </>
          ) : (
            <div className="flex items-center w-full justify-center text-center">
              <LottieAnimation
                animationData={emptyTodoTask}
                height={200}
                width={200}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Todos;
