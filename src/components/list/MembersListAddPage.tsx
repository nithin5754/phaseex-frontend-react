import { SendAddCollabListType, useGetCollabListByIdQuery } from "@/app/redux/api/listapi";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MembersSingleListCollab from "./MembersSingleListCollab";

interface Props {
  workspaceId: string;
  folderId: string;
  listId: string;
}

const MembersListAddPage = ({ workspaceId, folderId, listId }: Props) => {
  const { data: getCollabListById } = useGetCollabListByIdQuery({
    workspaceId,
    folderId,
    listId,
  });

  return (
<>


<ul className="w-full mt-4 ">
      {getCollabListById?.map((collabList) => {
         
         let responsedata:SendAddCollabListType={
            workspaceId:workspaceId,
            folderId: folderId,
            listId:listId,
            collabId:collabList.id
         }
         
        return (
        <MembersSingleListCollab collabList={collabList} checkingDetails={responsedata}/>
        );
      })}
    </ul>

</>
  );
};
export default MembersListAddPage;
