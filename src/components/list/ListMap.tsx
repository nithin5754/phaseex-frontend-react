import {
  ListProgressBar,
  PriorityListSetting,
  UpdateDateList,
} from "../list/index";
import useTimeDue from "@/hooks/useTimeDue";
import { Link } from "react-router-dom";

import { AddModalMembersList } from "../modal/add-members-list";
import { useContext } from "react";
import { ListContext } from "@/app/context/list.context";
import useRolePermission from "@/hooks/useRolePermission";

import { XCircle, Clock, CheckCircle, CheckSquare, Send } from "lucide-react";
import { ListStatus } from "@/app/redux/api/listapi";
import { Button } from "../ui/button";
import { IconLockFilled } from "@tabler/icons-react";

type StatusStyles = {
  [key in ListStatus]: {
    text: string;
    icon: string;
  };
};

interface Props {
  index: number;
}

const ListMap = ({ index }: Props) => {
  const { list, folderId, workspaceId } = useContext(ListContext);
  const permission = useRolePermission({
    workspaceId,
  });

  let due: number = useTimeDue({
    list_due_date: list.list_due_date,
  });

  const statusStyles: StatusStyles = {
    cancelled: {
      text: "text-red-500",
      icon: "text-red-500",
    },
    pending: {
      text: "text-yellow-500",
      icon: "text-yellow-500",
    },
    verified: {
      text: "text-blue-500",
      icon: "text-blue-500",
    },
    complete: {
      text: "text-green-500",
      icon: "text-green-500",
    },
    rejected: {
      text: "text-gray-500",
      icon: "text-gray-500",
    },
    onGoing: {
      text: "text-orange-500",
      icon: "text-orange-500",
    },
  };

  const statusIcons: any = {
    cancelled: XCircle,
    pending: Clock,
    verified: CheckCircle,
    complete: CheckSquare,
    rejected: XCircle,
    onGoing: XCircle,
  };

  return (
    <tr key={list.id} className="border-b-transparent border-t  border-border">
      <td className="px-2 py-3 text-sm bg-white dark:bg-background">
        {index + 1}
      </td>
      <td className="px-2 py-3 text-sm bg-white dark:bg-background ">
        <Link
          to={`/space/${workspaceId}/folders/${folderId}/lists/${list.id}`}
          className="text-gray-600 hover:underline"
        >
          {list.list_title}
        </Link>
      </td>
      <td className="px-2 py-3 text-sm bg-white dark:bg-background">
        <ListProgressBar percentage={list.progressTask} />
      </td>
      <td className="px-2 py-3 text-sm bg-white dark:bg-background">
        <div className="flex items-center gap-4">
          <AddModalMembersList />
        </div>
      </td>
      <td className="px-2 py-3 text-[12px] bg-white dark:bg-background">
        <div className="flex items-center ">
          <span>{list.list_due_date}</span>
          {permission.owner && <UpdateDateList />}
        </div>
      </td>
      <td className="px-2 py-3 text-sm bg-white dark:bg-background">{due}</td>
      <td className="px-2 py-3 text-sm bg-white dark:bg-background">
        {
          <PriorityListSetting
            priority={list.priority_list as "high" | "medium" | "low"}
            permission={permission.owner ?? false}
          />
        }
      </td>{" "}
      <td className="px-2 py-3 text-sm bg-white dark:bg-background">
        {list.status && statusStyles[list.status] ? (
          <div className="flex items-center gap-2">
            {(() => {
              const StatusIcon = statusIcons[list.status];
              return (
                <StatusIcon
                  className={statusStyles[list.status].icon}
                  aria-label={`${list.status} status`}
                />
              );
            })()}
            <span className={statusStyles[list.status].text}>
              {list.status}
            </span>
          </div>
        ) : (
          <span className="text-gray-500">No Status</span>
        )}
      </td>
      {permission.manager || permission.owner ? (
        <td className="px-2 py-3 text-sm bg-white dark:bg-background flex justify-center w-full">
          {(() => {
            switch (list.status) {
              case "onGoing":
                return (
                  <Link
                    to={`/space/${workspaceId}/folders/${folderId}/lists/${list.id}/create-review`}
                    className="text-gray-600 hover:underline"
                    aria-label="Send review"
                  >
                    <Button
                      className="hover:bg-transparent text-black dark:text-white"
                      variant={"outline"}
                    >
                      {" "}
                      send <Send className="inline-block ml-1" />
                    </Button>
                  </Link>
                );
              case "verified":
                return <></>;
              case "rejected":
                return (
                  <Link
                    to={`/space/${workspaceId}/folders/${folderId}/lists/${list.id}/resend-send-review`}
                    className="text-gray-600 hover:underline"
                    aria-label="Re-Send review"
                  >
                    re-send
                  </Link>
                );
              default:
                return null;
            }
          })()}
        </td>
      ) : (
        <td className="px-2 py-3 text-sm bg-white dark:bg-background flex justify-center w-full">
          <IconLockFilled />
        </td>
      )}
    </tr>
  );
};
export default ListMap;
