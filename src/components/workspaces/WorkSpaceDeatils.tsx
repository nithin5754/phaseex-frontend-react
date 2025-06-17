import { useGetSingleWorkSpaceQuery } from "@/app/redux/api/spaceApi";
import { useParams } from "react-router-dom";
import { useGetAllFolderQuery } from "@/app/redux/api/FolderApi";
import { WorkSpaceFolder } from "../folder/index";

import { SpaceViewALLskelton } from "../shimmer/index";
import UseSpaceRoles from "@/hooks/useSpaceRoles";

import { useState } from "react";

import { Button } from "../ui/button";
import InviteMemberModal from "../memebers/InviteMemberModal";
import TemplateAbout from "../template/About/TemplateAbout";

const WorkSpaceDeatils = () => {
  const { id } = useParams();
  const [displayModal, setDisplayModal] = useState<boolean>(false);

  if (!id) {
    return <h1>loading....</h1>;
  }

  const isOwner: boolean = UseSpaceRoles({ workspaceId: id });

  const { data: singleWorkSpace, isLoading } = useGetSingleWorkSpaceQuery(id);
  const { data: getAllFolder } = useGetAllFolderQuery(id);

  if (isLoading || !getAllFolder) {
    return <SpaceViewALLskelton />;
  }

  return (
    <>
      {displayModal && (
        <InviteMemberModal onClose={() => setDisplayModal(false)} />
      )}

      <div className="flex flex-col gap-6 p-4 ">
        <div className="flex flex-col w-full items-center justify-center">
          <div
            className="w-full bg-white text-black border border-gray-200 rounded-lg p-6 h-auto dark:text-primary dark:bg-background 
  dark:border-border flex flex-row justify-between"
          >
            {singleWorkSpace && (
              <TemplateAbout
                templateAbout={{
                  title: singleWorkSpace?.title,
                  description: singleWorkSpace.workspace_description,
                  owner_name: singleWorkSpace?.ownerName,
                  date: `${singleWorkSpace.createdAt}`,
                  type: "workspace",
                }}
              />
            )}
            <div className="">
              <Button disabled={!isOwner} onClick={() => setDisplayModal(true)}>
                invite friends +
              </Button>
            </div>
          </div>
        </div>

        <WorkSpaceFolder getAllFolder={getAllFolder} />
      </div>
    </>
  );
};
export default WorkSpaceDeatils;
