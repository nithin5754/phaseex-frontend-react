import { useGetSingleTaskQuery } from "@/app/redux/api/taskapi";

import { TaskHistory, TaskMainSection, TaskSelectionButton } from "./index";
import { useParams } from "react-router-dom";



const TaskDeatils = () => {
  let { id, folderId, listId, taskId } = useParams();

  if (!id || !folderId || !listId || !taskId) {
    return <h1>loading...</h1>;
  }




  if (
    typeof id !== "string" ||
    typeof folderId !== "string" ||
    typeof listId !== "string" ||
    typeof taskId !== "string"
  ) {
    return <h1>loading...</h1>;
  }

  const { data: singleTask } = useGetSingleTaskQuery({
    workspaceId: id,
    folderId,
    listId,
    taskId,
  });

  return (
    <div className=" flex flex-col w-full  mx-4 font-sfpro gap-4  ">
      <div className="flex justify-between bg-white  border-gray-200 rounded-lg  dark:bg-muted/50   dark:text-primary">
        <TaskHistory singleTask={singleTask ? singleTask : null} />
        <TaskSelectionButton singleTask={singleTask ? singleTask : null} />
      </div>
      <TaskMainSection singleTask={singleTask ? singleTask : null} />
    </div>
  );
};
export default TaskDeatils;
