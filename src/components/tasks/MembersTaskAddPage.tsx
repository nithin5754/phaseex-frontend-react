


import { SendAddCollabTaskType, useGetCollabTaskByIdQuery } from "@/app/redux/api/taskapi";
import MembersSingleTaskCollab from "./MembersSingleCollab";

interface Props {
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId:string
}

const MembersTaskAddPage = ({ workspaceId, folderId, listId,taskId }: Props) => {
  const { data: getCollabTaskById } = useGetCollabTaskByIdQuery({
    workspaceId,
    folderId,
    listId,
    taskId
  });

  return (
<>


<ul className="w-full mt-4 ">
      {getCollabTaskById?.map((collabTask) => {
         
         let responsedata:SendAddCollabTaskType={
            workspaceId:workspaceId,
            folderId: folderId,
            listId:listId,
            taskId:taskId,
            collabId:collabTask.id
         }
         
        return (
        <MembersSingleTaskCollab collabTask={collabTask} checkingDetails={responsedata} />
        );
      })}
    </ul>

</>
  );
};
export default MembersTaskAddPage;
