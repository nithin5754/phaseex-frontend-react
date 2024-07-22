

import { AnimatedTooltip } from "../aceternityuI/tooltip/animated-tooltip";
import { useGetCollabListByIdQuery } from "@/app/redux/api/listapi";




interface Props {
  workspaceId:string;
  folderId:string;
  listId:string
}

export function AnimatedProfile({workspaceId,folderId,listId}:Props) {


  const {data:getCollabListById}=useGetCollabListByIdQuery({workspaceId,folderId,listId})
  return (
    <div className="flex flex-row items-center justify-center">
      {getCollabListById&&<AnimatedTooltip items={getCollabListById} />}
    </div>
  );
}
