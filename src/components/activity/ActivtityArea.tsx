import { useParams } from "react-router-dom";

import { Activity } from "lucide-react";
import { Badge } from "../ui/badge";

import { useOnGetAllActivityQuery } from "@/app/redux/api/activityApi";
import { ResponseActivityArray } from "@/features/types/TActivity";
import { ScrollArea } from "../ui/scroll-area";

const ActivityArea = () => {
  const { id, folderId, listId, taskId } = useParams();

  if (!id || !folderId || !listId || !taskId) {
    return <h1>loading...</h1>;
  }

  if (
    typeof id !== "string" ||
    typeof folderId !== "string" ||
    typeof listId !== "string" ||
    typeof taskId !== "string"
  ) {
    return <h1>loading....</h1>;
  }

  const { data: onGetAllActivity } = useOnGetAllActivityQuery(
    {
      workspaceId: id,
      folderId,
      listId,
      taskId,
    },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <div className="relative flex min-h-[400px] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2  ">
        <Badge variant="outline" className="absolute right-3 top-3">
          Activity
        </Badge>
        <div className="flex-grow overflow-hidden">
          <ScrollArea className="h-[300px] rounded-md border-0 mt-8 mb-[40px]">
            {onGetAllActivity &&
              onGetAllActivity.activity &&
              onGetAllActivity.activity.length > 0 &&
              onGetAllActivity.activity.map((task: ResponseActivityArray) => (
                <article
                  key={task.id}
                  className=" p-3 flex flex-wrap justify-between items-center"
                >
                  <p className="activity-text text-xs text-gray-400 flex gap-2">
                    <Activity size={14} /> {task.message}
                  </p>
                  <p className="activity-date text-xs text-gray-500">
                    {task.date}
                  </p>
                </article>
              ))}
          </ScrollArea>
        </div>
      </div>
    </>
  );
};
export default ActivityArea;
