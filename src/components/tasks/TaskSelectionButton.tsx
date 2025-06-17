import { Link, Notebook } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setOpenDescTask } from "@/app/redux/slice/taskSlice";
import { TaskLinkModal } from "../modal/add-link-modal";
import { ResponseTaskType } from "@/types";

import { AttachmentAddModal } from "../modal/add-attachment-modal";
import { ListsContext } from "@/app/context/lists.context";
import { useContext } from "react";

interface Props {
  singleTask: ResponseTaskType | null;
}

const TaskSelectionButton = ({ singleTask }: Props) => {
  const dispatch = useDispatch();

  const { isCurrentUserManager, isManagerExists } = useContext(ListsContext);
  return (
    <div className="flex  m-auto  gap-4 px-6">
      <Button
        onClick={() => dispatch(setOpenDescTask(true))}
        disabled={!isCurrentUserManager && !isManagerExists}
      >
        <Notebook size={16} /> description
      </Button>

      <AttachmentAddModal />
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
