



import { AnimatedTooltip } from "../aceternityuI/tooltip/animated-tooltip";

import { useGetAllTodoCollabByIdQuery } from "@/app/redux/api/todoapi";



interface Props {
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string;
  todoId:string
}

export function AnimatedTodoProfile({workspaceId,folderId,listId,taskId,todoId}:Props) {
  const { data: getAllTodoCollabById } = useGetAllTodoCollabByIdQuery({
    workspaceId,
    folderId,
    listId,
    taskId,
    todoId
  });
  return (
    <div className="flex flex-row items-center justify-center">
      {getAllTodoCollabById&&<AnimatedTooltip items={getAllTodoCollabById} />}
    </div>
  );
}
