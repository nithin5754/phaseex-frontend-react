import { Folder, Plus } from "lucide-react";
import { OpenModal } from "../modal/FolderModal";
import { Link, useParams } from "react-router-dom";
import { LottieAnimation } from "../lootie/Lootie";
import EmptyFolder from "../../../public/json/empty-folder-1.json";
import { ResponseFolderDataType } from "@/app/redux/api/FolderApi";
import UseSpaceRoles from "@/hooks/useSpaceRoles";
import FolderTableToggleView from "../workspaces/FolderTableToggleView";
import { useState } from "react";

interface Props {
  getAllFolder: ResponseFolderDataType[];
}
const WorkSpaceFolder = ({ getAllFolder }: Props) => {
  const { id } = useParams();
  const [toggle, setToggle] = useState<"table-view" | "folder-view">(
    "folder-view"
  );

  const handleToggleHandle = (data: "table-view" | "folder-view"): void => {
    setToggle(data);
  };

  if (!id) {
    return <h1>loading....</h1>;
  }

  const isSpaceOwner = UseSpaceRoles({ workspaceId: id });
  const truncateDesc = (desc: string) => {
    return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
  };
  return (
    <div className=" bg-white border border-gray-200 rounded-lg  dark:bg-background dark:text-primary dark:border-border ">
      <div className="flex justify-between p-4 focus:border-0 ">
        <h1 className="text-xl font-sfpro  ">Folder </h1>
        {isSpaceOwner && <OpenModal title={""} icon={Plus} spaceId={id} />}
        <FolderTableToggleView
          handleToggle={handleToggleHandle}
          name={toggle}
        />
      </div>
      {getAllFolder && getAllFolder.length > 0 ? (
        <>
          {toggle === "folder-view" ? (
            <>
              <div className="flex flex-wrap gap-2 m-2  ml-8">
                {getAllFolder.map((folder) => {
                  return (
                    <Link
                      key={folder.id}
                      to={`/space/${id}/folders/${folder.id}`}
                    >
                      <div className="bg-white w-full md:w-[200px] border rounded-md h-[40px] overflow-hidden flex items-center justify-between px-4 py-1 mx-auto mb-2 dark:bg-secondary dark:border-border dark:text-primary dark:hover:bg-card">
                        <span className="text-slate-400 dark:text-primary">
                          <Folder className="border-gray-500" />
                        </span>
                        <h1 className="font-sfpro text-slate-600 text-center dark:text-primary capitalize ">
                          {folder.folder_title}
                        </h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between mb-2 dark:bg-background dark:text-primary dark:border-border ">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b border-gray-200 dark:text-primary text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider  dark:bg-background dark:border-border"></th>
                      <th className="px-5 py-3 border-b border-gray-200 text-left dark:text-primary  text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background dark:border-border">
                        folder name
                      </th>
                      <th className="px-5 py-3 border-b border-gray-200 dark:text-primary  text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background dark:border-border">
                        folder description
                      </th>
                      <th className="px-5 py-3 border-b border-gray-200 dark:text-primary  text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background dark:border-border">
                        created at
                      </th>
                      <th className="px-5 py-3 border-b border-gray-200 dark:text-primary  text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background dark:border-border">
                        update at
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {getAllFolder?.map((folder, index) => {
                      return (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-background dark:border-border">
                            <h1>{index + 1}</h1>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-background dark:border-border">
                            <Link
                              key={folder.id}
                              to={`/space/${id}/folders/${folder.id}`}
                            >
                              <h1>{folder.folder_title}</h1>
                            </Link>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-background dark:border-border">
                            <h1>{truncateDesc(folder.folder_description)}</h1>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-background dark:border-border">
                            <h1>{folder.createdAt}</h1>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-background dark:border-border">
                            <h1>{folder.updatedAt}</h1>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="flex items-center w-full justify-center text-center">
          <LottieAnimation
            animationData={EmptyFolder}
            height={200}
            width={200}
          />
        </div>
      )}
    </div>
  );
};
export default WorkSpaceFolder;
