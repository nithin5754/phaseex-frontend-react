import { useChangeVisiblityMutation, useGetAllHiddenSpacesQuery, useGetAllInvitedSpacesQuery, useGetAllOwnerSpacesQuery } from "@/app/redux/api/spaceApi";
import { SpaceHome } from "@/components/workspaces";
import { DashBoardWSCard } from "@/components/workspaces/DashBoardWSCard";
import { FolderCheck, Medal, EyeOff, Folder } from "lucide-react";
import { WorkSpaceContext } from "./providers/space.providers";

function DashBoardWorkSpace() {
  const [changeVisibility] = useChangeVisiblityMutation();

  const { data: getAllHiddenSpaces } = useGetAllHiddenSpacesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: getAllInvitedSpaces } = useGetAllInvitedSpacesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { data: getAllOwnerSpaces } = useGetAllOwnerSpacesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const handleHideSubmit = async (id: string) => {
    try {
      await changeVisibility({ id }).unwrap();
    } catch (error) {
      console.error("Failed to change visibility", error);
    }
  };
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex w-full gap-2 mb-2  border dark:border-primary/20 rounded-xl">
        <DashBoardWSCard icon={FolderCheck} title="active  " value={1} />
        <DashBoardWSCard icon={Medal} title="completed  " value={1} />
        <DashBoardWSCard icon={EyeOff} title="hidden  " value={1} />
        <DashBoardWSCard icon={Folder} title="my  " value={1} />
      </div>
      <div className="mt-6">
        <WorkSpaceContext.Provider
          value={{
            getAllHiddenSpaces: getAllHiddenSpaces || [],
            getAllInvitedSpaces: getAllInvitedSpaces || [],
            getAllOwnerSpaces: getAllOwnerSpaces || [],
            handleHideSubmit,
          }}
        >
          <SpaceHome />
        </WorkSpaceContext.Provider>
      </div>
    </div>
  );
}

export default DashBoardWorkSpace;
