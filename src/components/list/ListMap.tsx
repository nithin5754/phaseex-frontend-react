import {
  ListProgressBar,
  PriorityListSetting,
  UpdateDateList,
} from "../list/index";
import useTimeDue from "@/hooks/useTimeDue";
import { Link } from "react-router-dom";

import UseSpaceRoles from "@/hooks/useSpaceRoles";
import { AddModalMembersList } from "../modal/add-members-list";
import { useContext } from "react";
import { ListContext } from "@/app/context/list.context";

interface Props {
  index: number;
}

const ListMap = ({ index }: Props) => {
  const { list, folderId, workspaceId } = useContext(ListContext);
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
        <Link
          to={`/space/${workspaceId}/folders/${folderId}/lists/${list.id}`}
          className="text-gray-600 hover:underline"
        >
          {list.list_title}
        </Link>
      </td>

      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        <ListProgressBar percentage={list.progressTask} />
      </td>

      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        <div className="flex items-center gap-4">
          <AddModalMembersList />
        </div>
      </td>

      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        <div className="flex items-center ">
          <span>{list.list_due_date}</span>
          {isSpaceOwner && <UpdateDateList />}
        </div>
      </td>

      <td className="px-5 py-3 text-sm bg-white dark:bg-background">{due}</td>

      <td className="px-5 py-3 text-sm bg-white dark:bg-background">
        {
          <PriorityListSetting
            priority={list.priority_list}
            isPermission={isSpaceOwner ?? false}
          />
        }
      </td>
    </tr>
  );
};
export default ListMap;
