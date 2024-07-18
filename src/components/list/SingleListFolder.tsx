import { useParams } from "react-router-dom";
import { ListHistory } from "./index";
import { Plus } from "lucide-react";
import { TaskTable } from "../tasks/index";
import { ResizablePanel, ResizablePanelGroup } from "../ui/resizable";

import { OpenModal as CreateTaskModal } from "../../components/modal/Task-create-modal";

const SingleListFolder = () => {
  const { id, folderId, listId } = useParams();

  if (!id || !folderId || !listId) {
    return <h1>loading....</h1>;
  }
  return (

     
        <div className="flex flex-col gap-5  font-sfpro w-full m-4 ">
          <ListHistory workspaceId={id} folderId={folderId} listId={listId} />

          <div className="bg-white   overflow-hidden dark:bg-background dark:text-primary dark:border-border m-4">
            <div className="px-6 py-4  flex justify-between dark:border-border">
              <h2 className="text-lg font-sfpro dark:text-primary">Tasks</h2>
              <CreateTaskModal
                title={""}
                spaceId={id}
                folderId={folderId}
                icon={Plus}
                listId={listId}
              />
            </div>
            <div className=" py-4">
              <TaskTable spaceId={id} folderId={folderId} listId={listId} />
            </div>
          </div>
        </div>
  
  
  );
};
export default SingleListFolder;
