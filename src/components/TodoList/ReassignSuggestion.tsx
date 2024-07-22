import { useDispatch, useSelector } from "react-redux";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { LucidePlusSquare, UserCircle2Icon } from "lucide-react";
import noSearchUser from "../../../public/json/empty-user-1.json";
import { LottieAnimation } from "../lootie/Lootie";

import { toast } from "../ui/use-toast";
import {
  selectTodoCollabSpace,
  setSearchTodoQuery,
} from "@/app/redux/slice/todoSlice";
import { useOnAddCollabToTodoMutation } from "@/app/redux/api/todoapi";
import { SendAddCollabTodoTask, TodoType } from "@/features/types/TodoType";
import { useOnCreateActivityMutation } from "@/app/redux/api/activityApi";
import { selectCurrentUserName } from "@/features/auth/authSlice";
import { CActivitySendType } from "@/features/types/TActivity";

interface Props {
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId: string;
  todoId: string;
  collabId: string;
  todo: TodoType;
}

const ReassignSuggestion = ({
  workspaceId,
  folderId,
  listId,
  taskId,
  todoId,
  todo,
}: Props) => {
  const getListCollabSuggestion = useSelector(selectTodoCollabSpace);

  const dispatch = useDispatch();
  const [onCreateActivity] = useOnCreateActivityMutation();
  const currentName = useSelector(selectCurrentUserName);

  const [onAddCollabToTodo] = useOnAddCollabToTodoMutation();

  const handleSubmit = async (collabId: string) => {
    let responseData: SendAddCollabTodoTask = {
      workspaceId,
      folderId,
      listId,
      taskId,
      todoId,
      collabId,
    };

    try {
      let response = await onAddCollabToTodo(responseData).unwrap();
      if (response) {
        let ActivityData: CActivitySendType = {
          workspaceId: workspaceId,
          folderId: folderId,
          listId: listId,
          taskId: taskId,
          activity: `${currentName} reassigned the todo ${todo.todo}  `,
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
    <div className="border dark:border-border  m-auto   rounded-md absolute w-[300px]  mt-12 z-50    ">
      <Command>
        <CommandList>
          <CommandGroup heading="suggestions " className="bg-slate-900">
            {getListCollabSuggestion && getListCollabSuggestion.length > 0 ? (
              getListCollabSuggestion.map((query) => (
                <CommandItem className="flex flex-row justify-between w-full">
                  <div className="flex flex-row my-auto items-center  ">
                    <UserCircle2Icon
                      size={14}
                      className="mr-4"
                      onClick={() =>
                        dispatch(setSearchTodoQuery(query.fullName))
                      }
                    />
                    <span>{query.fullName}</span>
                  </div>
                  <LucidePlusSquare
                    size={14}
                    onClick={() => handleSubmit(query.id)}
                  />
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>
                <LottieAnimation
                  animationData={noSearchUser}
                  height={100}
                  width={300}
                />
              </CommandEmpty>
            )}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};
export default ReassignSuggestion;
