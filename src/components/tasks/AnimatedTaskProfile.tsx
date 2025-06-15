
import { AnimatedTooltip } from "../aceternityuI/tooltip/animated-tooltip";

import { useGetCollabTaskByIdQuery } from "@/app/redux/api/taskapi";





interface Props {
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string
}

export function AnimatedTaskProfile({workspaceId,folderId,listId,taskId}:Props) {


  const {data:getCollabTaskById}=useGetCollabTaskByIdQuery({workspaceId,folderId,listId,taskId},    {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })


  


  return (
    <div className="flex flex-row items-center justify-center">
      {getCollabTaskById&&<AnimatedTooltip items={getCollabTaskById} />}
    </div>
  );
}
