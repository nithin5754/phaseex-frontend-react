import { WorkSpaceContext } from "./context/space.providers";
import {
  useChangeVisiblityMutation,
  useGetAllSpacesQuery,
  useGetOnGoingSpacesQuery,
} from "@/app/redux/api/spaceApi";
import { SpaceHome } from "@/components/work-space";
import DashBoardWSCard from "@/components/work-space/DashBoardWSCard";
import { MenuIcon } from "lucide-react";

function DashBoardWorkSpace() {
  const [changeVisibility] = useChangeVisiblityMutation();
  const { data: getAllSpaces } = useGetAllSpacesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: getOnGoingSpace } = useGetOnGoingSpacesQuery(undefined, {
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
    <div className="flex flex-1 flex-col h-full gap-2">
 <div className="flex flex-row gap-4">
 <DashBoardWSCard icon={MenuIcon} title="hello" value={1} />
      <DashBoardWSCard icon={MenuIcon} title="hello" value={1} />
      <DashBoardWSCard icon={MenuIcon} title="hello" value={1} />
 </div>
      <div className="">
        <WorkSpaceContext.Provider
          value={{
            getAllSpaces: getAllSpaces || [],
            getOnGoingSpace: getOnGoingSpace || [],
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
