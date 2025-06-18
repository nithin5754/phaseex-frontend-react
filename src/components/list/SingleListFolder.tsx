import { ListHistory } from "./index";
import { Plus } from "lucide-react";
import { TaskTable } from "../tasks/index";

import { OpenModal as CreateTaskModal } from "../../components/modal/Task-create-modal";
import { useContext } from "react";
import FolderTableToggleView from "../workspaces/FolderTableToggleView";
import { ListsContext } from "@/app/context/lists.context";
import { useAppDispatch } from "@/app/redux/api/store";
import {
  selectCurrentTableView,
  updateTableView,
} from "@/app/redux/slice/uttilSlice";
import { useSelector } from "react-redux";
import useRolePermission from "@/hooks/useRolePermission";

const SingleListFolder = () => {
  const currentTableView = useSelector(selectCurrentTableView);
  const dispatch = useAppDispatch();
  const { workspaceId, isManagerExists, listId } = useContext(ListsContext);


  const permission = useRolePermission({
    workspaceId,
    listId,
  });

  const handleToggleHandle = (data: "table-view" | "folder-view"): void => {
    dispatch(updateTableView(data));
  };

  return (
    <div className="flex flex-col gap-5  font-sfpro w-full m-4 ">
      <ListHistory
        permission={isManagerExists && (permission.manager || permission.owner)}
      />

      <div className="bg-white   overflow-hidden dark:bg-background dark:text-primary dark:border-border m-4">
        <div className="px-6 py-4  flex justify-between dark:border-border">
          <h2 className="text-lg font-sfpro dark:text-primary">Tasks</h2>

          <CreateTaskModal
            title={""}
            icon={Plus}
            isManagerExists={
              isManagerExists && (permission.manager || permission.owner)
            }
          />

          <FolderTableToggleView
            handleToggle={handleToggleHandle}
            name={currentTableView}
          />
        </div>
        <div className=" py-4">
          <TaskTable toggle={currentTableView} />
        </div>
      </div>
    </div>
  );
};
export default SingleListFolder;
