import { useGetSingleWorkSpaceQuery } from "@/app/api/spaceApi";
import { useParams } from "react-router-dom";
import { EarthIcon, Lock, Plus } from "lucide-react";
import { OpenModal } from "../modal/FolderModal";
import { useGetAllFolderQuery } from "@/app/api/FolderApi";
import { WorkSpaceFolder } from "../folder/index";
import { ListWorkSpace } from "../list/index";
import { SpaceViewALLskelton } from "../shimmer/index";

const WorkSpaceDeatils = () => {
  const { id } = useParams();

  if (!id) {
    return <h1>loading....</h1>;
  }

  const { data: singleWorkSpace, isLoading } = useGetSingleWorkSpaceQuery(id,{
    pollingInterval:120000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  });
  const { data: getAllFolder } = useGetAllFolderQuery(id,{
    pollingInterval:120000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  });

  if (isLoading || !getAllFolder) {
    return <SpaceViewALLskelton/>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-row w-full gap-2 items-center  justify-center ">
        <div className="flex w-full bg-white text-black border border-gray-200 rounded-lg h-[100px] p-4 dark:text-primary dark:bg-background dark:border-border">
          <div className="flex flex-col justify-between">
            <h1 className="font-sfpro text-lg">
              Space {singleWorkSpace?.title}
            </h1>
            <p className="text-gray-600  dark:text-primary">
              Description: {singleWorkSpace?.workspace_description}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-gray-800 font-sfpro  dark:text-primary">
                {singleWorkSpace?.workspaceType}
              </p>
              <span className="text-slate-300 font-sfpro  dark:text-primary ">
                {singleWorkSpace?.workspaceType === "private" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <EarthIcon className="w-4 h-4" />
                )}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center w-[300px] justify-center bg-white border border-gray-200 rounded-lg h-[100px] dark:bg-background  dark:text-primary dark:border-border">
          <div className="text-center">
            <h1 className="font-sfpro text-lg">create new List</h1>
          </div>
        </div>

        <div className="flex items-center w-[300px] justify-center bg-white border border-gray-200 rounded-lg h-[100px] dark:bg-background  dark:text-primary dark:border-border">
          <div className="text-center">
            <h1 className="font-sfpro text-lg "></h1>
            <OpenModal title={"create new Folder"} icon={Plus} spaceId={id} />
          </div>
        </div>
      </div>

      {/* /**
 folder section overview here
 */}

      <WorkSpaceFolder getAllFolder={getAllFolder} />

      {/* list section over view */}

      <ListWorkSpace />
    </div>
  );
};
export default WorkSpaceDeatils;
