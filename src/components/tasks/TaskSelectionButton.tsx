import { Link, Notebook } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setOpenDescTask } from "@/app/redux/slice/taskSlice";
import { TaskLinkModal } from "../modal/add-link-modal";
import { ResponseTaskType } from "@/features/types";

import { AttachmentAddModal } from "../modal/add-attachment-modal";

interface Props {
  singleTask: ResponseTaskType | null;
}

const TaskSelectionButton = ({ singleTask }: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="flex p-4 justify-end items-end    gap-4 bg-white  border-gray-200 rounded-lg h-[100px] dark:bg-background  dark:text-primaryr">
      <Button onClick={() => dispatch(setOpenDescTask(true))}>
        <Notebook  size={16} /> description
      </Button>

      <AttachmentAddModal/>
      <>
        {singleTask && (
          <TaskLinkModal
    
            icon={Link}
            spaceId={singleTask.workspaceId}
            folderId={singleTask.folderId}
            listId={singleTask.listId}
            taskId={singleTask.id}
          />
        )}
      </>
    </div>
  );
};
export default TaskSelectionButton;
