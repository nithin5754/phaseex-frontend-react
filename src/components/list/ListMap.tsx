import { ResponseListDataType } from "@/app/redux/api/listapi";
import {

  ListProgressBar,
  PriorityListSetting,
  UpdateDateList,
} from "../list/index";
import useTimeDue from "@/hooks/useTimeDue";
import { Link } from "react-router-dom";



import UseSpaceRoles from "@/hooks/useSpaceRoles";

interface Props {
  list: ResponseListDataType;
  index: number;
  folderId: string;
  workspaceId: string;
}

const ListMap = ({ list, index, folderId, workspaceId }: Props) => {
  const isSpaceOwner = UseSpaceRoles({ workspaceId });



  let due: number = useTimeDue({
    list_due_date: list.list_due_date,
  });

  return (
    <tr key={list.id} className="border-b border-gray-200 dark:border-border">
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        {index + 1}
      </td>
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        {isSpaceOwner? (
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
      </td>
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        <ListProgressBar percentage={list.progressTask} />
      </td>
      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        <div className="flex items-center gap-4">
          <>
           add collab
          
          </>
    
        </div>
      </td>

      <td className="flex px-5 py-3 my-auto text-[12px] dark:bg-background">
        {list.list_due_date}
        <>
    
            <UpdateDateList
              folderId={folderId}
              workspaceId={workspaceId}
              listId={list.id}
            />
        </>
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
