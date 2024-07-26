import { ResponseTaskType } from "@/types";

interface Props {
  singleTask: ResponseTaskType | null;
}

const TaskHistory = ({ singleTask }: Props) => {
  if (singleTask === null) {
    return <h1>loading....</h1>;
  }

  return (
    <div className="flex p-4 bg-white  border-gray-200 rounded-lg h-[20px] dark:bg-background  dark:text-primaryr">
      <div className="text-start">
        <h1 className="font-sfpro text-lg">{singleTask.task_title}</h1>
      </div>
    </div>
  );
};
export default TaskHistory;
