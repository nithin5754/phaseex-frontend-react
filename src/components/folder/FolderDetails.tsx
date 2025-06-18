import { useGetSingleFolderQuery } from "@/app/redux/api/FolderApi";

import { OpenModal as CreateListModal } from "../modal/list-create-modal";

import { Plus } from "lucide-react";


import TemplateAbout from "../template/About/TemplateAbout";
import useRolePermission from "@/hooks/useRolePermission";
interface Props {
  id: string;
  folderId: string;
}

const FolderDetails = ({ id, folderId }: Props) => {
  const permission = useRolePermission({
    workspaceId:id,
   
  });
  const { data: singleFolder, isLoading } = useGetSingleFolderQuery(
    { spaceId: id, folderId },
  );

  if (isLoading) {
    0
    return <h1>loading...</h1>;
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div
        className="w-full bg-white text-black border border-gray-200 rounded-lg p-6 h-auto dark:text-primary dark:bg-background 
  dark:border-border flex flex-row justify-between"
      >
        {singleFolder && (
          <TemplateAbout
            templateAbout={{
              title: singleFolder?.folder_title,
              description: singleFolder.folder_description,
              owner_name: "",
              date: `${singleFolder.createdAt}`,
              type: "folder",
            }}
          />
        )}

        <>
          {permission.owner && (
            <>
              <CreateListModal
                title={"create list"}
                icon={Plus}
                spaceId={id}
                folderId={folderId}
              />
            </>
          )}
        </>
      </div>
    </div>
  );
};
export default FolderDetails;
