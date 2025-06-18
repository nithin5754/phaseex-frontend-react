import { FileEdit, LoaderPinwheel, Trash } from "lucide-react";

import { TodoModalEdit } from "../modal/Todo-edit-modal";

import { useOnDeleteTaskTodoMutation } from "@/app/redux/api/todoapi";

import { SendDeleteTodoTask } from "@/types/TodoType";
import { toast } from "../ui/use-toast";


import { CActivitySendType } from "@/types/TActivity";
import { useOnCreateActivityMutation } from "@/app/redux/api/activityApi";
import { useSelector } from "react-redux";
import { selectCurrentUserName } from "@/features/auth/authSlice";
import { useContext } from "react";
import { TodoContext } from "@/app/context/todo.context";
import { Button } from "../ui/button";

interface Props {
  permission: {
    owner:boolean;
    manager:boolean;
    developer:boolean
  };
}

const TodoDropDown = ({ permission }: Props) => {
  const { todo } = useContext(TodoContext);
  const [onDeleteTaskTodo, { isLoading }] = useOnDeleteTaskTodoMutation();

  const [onCreateActivity] = useOnCreateActivityMutation();
  const currentName = useSelector(selectCurrentUserName);

  const handleDelete = async () => {
    let TaskTodoData: SendDeleteTodoTask = {
      taskId: todo.taskId,
      workspaceId: todo.workspaceId,
      folderId: todo.folderId,
      listId: todo.listId,
      todoId: todo.id,
    };

    try {
      let response = await onDeleteTaskTodo(TaskTodoData).unwrap();

      if (response) {
        let ActivityData: CActivitySendType = {
          taskId: todo.taskId,
          workspaceId: todo.workspaceId,
          folderId: todo.folderId,
          listId: todo.listId,

          activity: `${currentName} deleted the todo ${todo} `,
        };
        await onCreateActivity(ActivityData).unwrap();
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
  };

  return (
    <div className="flex gap-3 ">
      <>
        {todo.todo_status === "completed" ? (
          <FileEdit size={23} color="#47504f" />
        ) : (
          <>
            {permission.owner || permission.manager ||permission.developer ? (
              <TodoModalEdit icon={FileEdit} />
            ) : (
              <FileEdit size={23} color="#47504f" />
            )}
          </>
        )}
      </>

      <>
        {permission.owner || permission.manager ||permission.developer ? (
          <>
            {isLoading ? (
              <>
                <LoaderPinwheel className="animate-spin " size={24} />
              </>
            ) : (
              <>
                <Trash size={23} onClick={handleDelete} />
              </>
            )}
          </>
        ) : (
          <Button disabled={true} variant={"ghost"}>
            {" "}
            <Trash size={23} color="#47504f" />
          </Button>
        )}
      </>
    </div>
  );
};
export default TodoDropDown;
