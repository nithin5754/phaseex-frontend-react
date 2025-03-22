import { useGetSingleWorkSpaceQuery } from "@/app/redux/api/spaceApi";
import { useParams } from "react-router-dom";
import { useGetAllFolderQuery } from "@/app/redux/api/FolderApi";
import { WorkSpaceFolder } from "../folder/index";

import { SpaceViewALLskelton } from "../shimmer/index";
import UseSpaceRoles from "@/hooks/useSpaceRoles";
import { EarthIcon, Lock } from "lucide-react";
import { useState } from "react";
import InviteMemberModal from "./InviteMemberModal";
import { Button } from "../ui/button";


const WorkSpaceDeatils = () => {
  const { id } = useParams();
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  if (!id) {
    return <h1>loading....</h1>;
  }

  UseSpaceRoles({ workspaceId: id });

  const { data: singleWorkSpace, isLoading } = useGetSingleWorkSpaceQuery(id);
  const { data: getAllFolder } = useGetAllFolderQuery(id, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading || !getAllFolder) {
    return <SpaceViewALLskelton />;
  }

  return (
    <>
    {
     displayModal&&(
    
       <InviteMemberModal onClose={()=>setDisplayModal(false)}/>
 
     )
    }

    <div className="flex flex-col gap-6 p-4 ">
  <div className="flex flex-col w-full items-center justify-center">
  <div className="w-full bg-white text-black border border-gray-200 rounded-lg p-6 h-auto dark:text-primary dark:bg-background 
  dark:border-border flex flex-row justify-between">
    <div className="space-y-3 flex-1">
      <h2 className="font-semibold text-lg">About This Space</h2>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2  ">
          <span className="text-gray-500 ">Title:</span>
          <span className="font-medium capitalize">{singleWorkSpace?.title}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500">Owner:</span>
          <span className="font-medium capitalize">{singleWorkSpace?.ownerName}</span>
        </div>

        <div className="flex items-center gap-2 ">
          <span className="text-gray-500">Description:</span>
          <span className="font-normal capitalize">{singleWorkSpace?.workspace_description}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-500">Type:</span>
          <div className="flex items-center gap-2">
            <span className="font-medium dark:text-primary">{singleWorkSpace?.workspaceType}</span>
            {singleWorkSpace?.workspaceType === "private" ? (
              <Lock className="w-4 h-4 text-gray-500" />
            ) : (
              <EarthIcon className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </div>
      </div>
    </div>
<div className="">
  <Button onClick={()=>setDisplayModal(true)} >invite friends +</Button>
</div>
  </div>
</div>

      <WorkSpaceFolder getAllFolder={getAllFolder} />
    </div>
    </>
  );

};
export default WorkSpaceDeatils;
