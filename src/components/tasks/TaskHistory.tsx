import { upperCase } from "@/lib/utils.data";
import { ResponseTaskType } from "@/types";
import { File } from "lucide-react";

interface Props {
  singleTask: ResponseTaskType | null;
}

const TaskHistory = ({ singleTask }: Props) => {
  if (singleTask === null) {
    return <h1>loading....</h1>;
  }



  return (
    <div className="flex flex-1 p-4 ">
      <div className="flex flex-row p-4  rounded-lg shadow-md w-full">
        <div className="flex flex-col justify-between w-full">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center text-lg font-medium text-gray-800 dark:text-white gap-3">
              <File size={18} className="text-primary" />
              {upperCase(singleTask.task_title)}
            </div>
            <div className="flex items-center"></div>
          </div>
          <h1 className="text-gray-500 text-sm mt-2 dark:text-gray-400">
            Created at {singleTask.createdAt}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default TaskHistory;
