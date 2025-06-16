import { Table } from "@/components/ui/table";

import { SendTodoCheckBox, TodoType } from "@/types/TodoType";

import { useOnUpdateStatusTodoMutation } from "@/app/redux/api/todoapi";
import { useState } from "react";

import { toast } from "../ui/use-toast";
import { useSelector } from "react-redux";
import { selectTodoItem, selectTodoQuery } from "@/app/redux/slice/todoSlice";

import { TodoSingle, TodoTHead } from "./index";

import { useOnCreateActivityMutation } from "@/app/redux/api/activityApi";
import { CActivitySendType } from "@/types/TActivity";
import { selectCurrentUserName } from "@/features/auth/authSlice";
import { TodoContext } from "@/app/context/todo.context";

interface Props {
  getAllTodoTask: TodoType[];
}

const TodoTable = ({ getAllTodoTask }: Props) => {
  const [onUpdateStatusTodo] = useOnUpdateStatusTodoMutation();

  const [loadingStates, setLoadingStates] = useState<{
    [key: string]: boolean;
  }>({});

  const searchTodoItem = useSelector(selectTodoItem);
  const searchTodoQuery = useSelector(selectTodoQuery);
  const currentName = useSelector(selectCurrentUserName);

  const [onCreateActivity] = useOnCreateActivityMutation();

  const handleChangeCheckBox = async (todo: TodoType) => {
    setLoadingStates({ ...loadingStates, [todo.id]: true });
    let todo_status: "completed" | "in progress" | "hidden" =
      todo.todo_status === "completed" ? "in progress" : "completed";

    let todoSendData: SendTodoCheckBox = {
      workspaceId: todo.workspaceId,
      folderId: todo.folderId,
      todo_status: todo_status,
      listId: todo.listId,
      taskId: todo.taskId,
      id: todo.id,
    };

    try {
      const response = await onUpdateStatusTodo(todoSendData).unwrap();
      if (response) {
        setLoadingStates({ ...loadingStates, [todo.id]: false });

        let ActivityData: CActivitySendType = {
          workspaceId: todo.workspaceId,
          folderId: todo.folderId,
          listId: todo.listId,
          taskId: todo.taskId,
          activity: `${currentName} ${
            todo_status === "completed" ? "completed the " : "unchecked the"
          } ${todo.todo}  `,
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
    } finally {
      setLoadingStates({ ...loadingStates, [todo.id]: false });
    }
  };

  return (
    <Table>
      <TodoTHead />
      <>
        {searchTodoQuery === "" ? (
          <>
            {getAllTodoTask.map((todo: TodoType) => (
           <TodoContext.Provider value={{handleChangeCheckBox,todo,todoId:todo.id,loadingStates}}>
               <TodoSingle
                key={todo.id}
              />
           </TodoContext.Provider>
            ))}
          </>
        ) : (
          <>
            {searchTodoItem &&
              searchTodoItem.length > 0 &&
              searchTodoItem.map((todo: TodoType) => (
                     <TodoContext.Provider value={{handleChangeCheckBox,todo,todoId:todo.id,loadingStates}}>
          <TodoSingle
                  key={todo.id}
      
                />

                     </TodoContext.Provider>
      
              ))}
          </>
        )}
      </>
    </Table>
  );
};
export default TodoTable;
