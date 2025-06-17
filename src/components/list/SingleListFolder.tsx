import { ListHistory } from "./index";
import { Plus } from "lucide-react";
import { TaskTable } from "../tasks/index";

import { OpenModal as CreateTaskModal } from "../../components/modal/Task-create-modal";
import { useContext, useEffect, useState } from "react";
import FolderTableToggleView from "../workspaces/FolderTableToggleView";
import { ListsContext } from "@/app/context/lists.context";
import { useAppDispatch } from "@/app/redux/api/store";
import {
  selectCurrentTableView,
  updateTableView,
} from "@/app/redux/slice/uttilSlice";
import { useSelector } from "react-redux";

import UseSpaceRoles from "@/hooks/useSpaceRoles";

const SingleListFolder = () => {
  const currentTableView = useSelector(selectCurrentTableView);
  const dispatch = useAppDispatch();
  const { workspaceId, isCurrentUserManager, isManagerExists } =
    useContext(ListsContext);
  const isSpaceOwner = UseSpaceRoles({ workspaceId: workspaceId });

  const handleToggleHandle = (data: "table-view" | "folder-view"): void => {
    dispatch(updateTableView(data));
  };

  return (
    <div className="flex flex-col gap-5  font-sfpro w-full m-4 ">
      <ListHistory
        permission={isManagerExists && (isCurrentUserManager || isSpaceOwner)}
      />

      <div className="bg-white   overflow-hidden dark:bg-background dark:text-primary dark:border-border m-4">
        <div className="px-6 py-4  flex justify-between dark:border-border">
          <h2 className="text-lg font-sfpro dark:text-primary">Tasks</h2>

          <CreateTaskModal
            title={""}
            icon={Plus}
            isManagerExists={
              isManagerExists && (isCurrentUserManager || isSpaceOwner)
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
