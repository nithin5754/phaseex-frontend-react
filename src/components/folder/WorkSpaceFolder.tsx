import { Flag, Folder, Plus } from "lucide-react";
import { OpenModal } from "../modal/FolderModal";
import { Link, useParams } from "react-router-dom";
import { LottieAnimation } from "../lootie/Lootie";
import EmptyFolder from "../../../public/json/empty-folder-1.json";
import { ResponseFolderDataType } from "@/app/redux/api/FolderApi";

import FolderTableToggleView from "../workspaces/FolderTableToggleView";

import { useSelector } from "react-redux";
import {
  selectCurrentTableView,
  updateTableView,
} from "@/app/redux/slice/uttilSlice";
import { useAppDispatch } from "@/app/redux/api/store";
import useRolePermission from "@/hooks/useRolePermission";
import { Fragment } from "react/jsx-runtime";
import ReviewFInalStatus from "./ReviewStatus";

interface Props {
  getAllFolder: ResponseFolderDataType[];
}
const WorkSpaceFolder = ({ getAllFolder }: Props) => {
  const { id } = useParams();

  const currentTableView = useSelector(selectCurrentTableView);
  const dispatch = useAppDispatch();

  const permission = useRolePermission({
    workspaceId: id,
  });

  const handleToggleHandle = (data: "table-view" | "folder-view"): void => {
    dispatch(updateTableView(data));
  };

  if (!id) {
    return <h1>loading....</h1>;
  }

  const truncateDesc = (desc: string) => {
    return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
  };
  return (
    <div className=" bg-whiter   dark:bg-background dark:text-primary  ">
      <div className="flex justify-between p-4 focus:border-0 ">
        <h1 className="text-xl font-sfpro  ">Folder </h1>
        <div className="flex ">
          {permission.owner && (
            <OpenModal title={""} icon={Plus} spaceId={id} />
          )}
          <div className="flex my-auto">
            <FolderTableToggleView
              handleToggle={handleToggleHandle}
              name={currentTableView}
            />
          </div>
        </div>
      </div>
      {getAllFolder && getAllFolder.length > 0 ? (
        <>
          {currentTableView === "folder-view" ? (
            <>
              <div className="flex flex-wrap gap-2 m-2  ml-8">
                {getAllFolder.map((folder) => {
                  return (
                    <Link
                      key={folder.id}
                      to={`/space/${id}/folders/${folder.id}`}
                    >
                      <div className="bg-white w-full md:w-[200px] border rounded-md h-[40px] overflow-hidden flex items-center justify-between px-4 py-1 mx-auto mb-2 dark:bg-secondary  dark:text-primary dark:hover:bg-card">
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
              <div className="flex flex-wrap items-center justify-between mb-2 dark:text-primary  ">
                <table className="min-w-full leading-normal border border-border rounded-lg  ">
                  <thead className="">
                    <tr>
                      <th className="px-5 py-3   dark:text-primary text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider  dark:bg-background "></th>
                      <th className="px-5 py-3   text-left dark:text-primary  text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background ">
                        folder name
                      </th>
                      <th className="px-5 py-3   dark:text-primary  text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background ">
                        folder description
                      </th>
                      <th className="px-5 py-3   dark:text-primary  text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background ">
                        created at
                      </th>
                      <th className="px-5 py-3   dark:text-primary  text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background ">
                        status
                      </th>
                      <th className="px-5 py-3   dark:text-primary  text-left text-xs font-sfpro text-gray-600 uppercase tracking-wider dark:bg-background ">
                        review
                      </th>
                    </tr>
                  </thead>
                  <tbody className=" ">
                    {getAllFolder?.map((folder, index) => {
                      return (
                        <Fragment key={folder.id}>
                          <tr className="border-t border-border">
                            <td className="px-5 py-5   bg-white text-sm dark:bg-background ">
                              <h1>{index + 1}</h1>
                            </td>
                            <td className="px-5 py-5   bg-white text-sm dark:bg-background ">
                              <Link
                                key={folder.id}
                                to={`/space/${id}/folders/${folder.id}`}
                              >
                                <h1>{folder.folder_title}</h1>
                              </Link>
                            </td>
                            <td className="px-5 py-5   bg-white text-sm dark:bg-background ">
                              <h1>{truncateDesc(folder.folder_description)}</h1>
                            </td>
                            <td className="px-5 py-5   bg-white text-sm dark:bg-background ">
                              <h1>{folder.createdAt}</h1>
                            </td>
                            <td className="px-5 py-5   bg-white text-sm dark:bg-background ">
                              <ReviewFInalStatus
                                priority={"default"}
                                permission={permission.owner}
                              />
                            </td>
                            <td className="px-5 py-5   bg-white text-sm dark:bg-background ">
                              <Link
                                to={`/space/${id}/folders/${folder.id}/review`}
                              >
                                open
                              </Link>
                            </td>
                          </tr>
                        </Fragment>
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
