import { ResponseListDataType } from "@/app/redux/api/listapi";
import {
  AnimatedProfile,
  ListProgressBar,
  PriorityListSetting,
  UpdateDateList,
} from "../list/index";
import moment from "moment";
import useTimeDue from "@/hooks/useTimeDue";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus2Icon } from "lucide-react";
import { ListCollabModal } from "../modal/add-list-collab-modal";

import UseListRole from "@/hooks/UseListRole";
import UseSpaceRoles from "@/hooks/useSpaceRoles";

  

interface Props {
  list: ResponseListDataType;
  index: number;
  folderId: string;
  workspaceId: string;
}

const ListMap = ({ list, index, folderId, workspaceId }: Props) => {

  const navigate=useNavigate()
  const start_date = moment(
    list.list_start_date,
    "MMMM D, YYYY - h:mm a"
  ).toDate();
  const due_date = moment(list.list_due_date, "MMMM D, YYYY - h:mm a").toDate();
  const isSpaceOwner = UseSpaceRoles({ workspaceId });

  const isListRoles = UseListRole({ workspaceId, folderId, listId: list.id });

  let due: number = useTimeDue({
    list_start_date: list.list_start_date,
    list_due_date: list.list_due_date,
  });


  // const handleCheck=()=> {
       
  //   if((isSpaceOwner||isListRoles.status||isListRoles.taskGrp)){
  //       navigate(`/space/${workspaceId}/folders/${folderId}/lists/${list.id}`)
  //   }
     
  // }

  return (
    <tr key={list.id} className="border-b border-gray-200 dark:border-border">
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        {index + 1}
      </td>
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        {(isSpaceOwner||isListRoles.status||isListRoles.taskGrp)? (
          <>
            <Link
              to={`/space/${workspaceId}/folders/${folderId}/lists/${list.id}`}
            >
              {list.list_title}
            </Link>
          </>
        ) : (
          <>{list.list_title}</>
        )}



       {/* <button onClick={handleCheck} className="border-none bg-none ">{list.list_title}</button> */}
      </td>
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        <ListProgressBar percentage={list.progressTask} />
      </td>
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        <div className="flex items-center gap-4">
          <>
            {isSpaceOwner && (
              <ListCollabModal
                icon={UserPlus2Icon}
                spaceId={workspaceId}
                folderId={folderId}
                listId={list.id}
              />
            )}
          </>
          <AnimatedProfile
            workspaceId={workspaceId}
            folderId={folderId}
            listId={list.id}
          />
        </div>
      </td>

      <td className="flex px-5 py-3 my-auto text-[12px] dark:bg-background">
        {list.list_start_date}
        <>
          {(isListRoles.role === "listManager" || isSpaceOwner) && (
            <UpdateDateList
              start_date={start_date}
              due_date={due_date}
              folderId={folderId}
              workspaceId={workspaceId}
              listId={list.id}
            />
          )}
        </>
      </td>
      <td className="flex px-5 py-3 my-auto text-[12px]  dark:bg-background">
        {list.list_due_date}
      </td>
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">{due}</td>
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        <PriorityListSetting
          priority={list.priority_list}
          id={list.id}
          folderId={folderId}
          workspaceId={workspaceId}
        />
      </td>
    </tr>
  );
};
export default ListMap;
