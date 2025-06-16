import { Link, useParams } from "react-router-dom";
import { LottieAnimation } from "../lootie/Lootie";
import EmptyList from "../../../public/json/empty-list-1.json";
import { Button } from "../ui/button";
import { Folder } from "lucide-react";

import { useGetAllListByPageQuery } from "@/app/redux/api/listapi";
import { useSelector } from "react-redux";
import { selectPage } from "@/app/redux/slice/listSlice";
import { PaginationButton } from "../Pagination/index";
import { ListMap, ListTableTitle } from "../list/index";
import { FolderDetails } from "./index";
import { useState } from "react";
import FolderTableToggleView from "../workspaces/FolderTableToggleView";
import { ListContext } from "@/app/context/list.context";

const Single = () => {
  const { id, folderId } = useParams();

  const [toggle, setToggle] = useState<"table-view" | "folder-view">(
   "table-view"
  );

  const handleToggleHandle = (data: "table-view" | "folder-view"): void => {
    setToggle(data);
  };

  const CurrentPage = useSelector(selectPage);

  if (!folderId || !id) {
    return <h1>loading....</h1>;
  }

  const { data: getAllList } = useGetAllListByPageQuery(
    { workspaceId: id, folderId, page: CurrentPage },
  );
  return (
    <div className="flex flex-col w-full p-6 m-auto font-sfpro  ">
      <FolderDetails id={id} folderId={folderId} />

      <div className="bg-white my-[14px]  border rounded-lg   overflow-hidden dark:bg-background dark:text-primary dark:border-border">
        <div className="px-6 py-4 border-b flex justify-between dark:border-border">
          <h2 className="text-lg font-sfpro dark:text-primary">Lists</h2>
          <div className="flex gap-4">
            <FolderTableToggleView
              handleToggle={handleToggleHandle}
              name={toggle}
            />
          </div>
        </div>
        <div className=" py-4">
          <>
            {getAllList && getAllList.lists && getAllList.lists.length > 0 ? (
              <>
                {toggle === "folder-view" ? (
                  <div className="flex flex-wrap gap-2 m-2  ml-8">
                    {getAllList.lists.map((list) => {
                      return (
                        <Link
                          key={list.id}
                          to={`/space/${id}/folders/${folderId}/lists/${list.id}`}
                        >
                          <div className="bg-white w-full md:w-[200px] border rounded-md h-[40px] overflow-hidden flex items-center justify-between px-4 py-1 mx-auto mb-2 dark:bg-secondary dark:border-border dark:text-primary dark:hover:bg-card">
                            <span className="text-slate-400 dark:text-primary">
                              <Folder className="border-gray-500" />
                            </span>
                            <h1 className="font-sfpro text-slate-600 text-center dark:text-primary capitalize ">
                              {list.list_title}
                            </h1>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <>
                    <table className="min-w-full leading-normal dark:text-primary">
                      <ListTableTitle />

                      <tbody>
                        <>
                          {getAllList.lists.slice(0, 4).map((list, index) => {
                            return (
                              <ListContext.Provider value={{workspaceId:id,folderId,listId:list.id,list}}>
                              <ListMap
                                key={list.id}
                            
                                index={index}
                           
                              />
                              </ListContext.Provider>
                            );
                          })}
                        </>
                      </tbody>
                    </table>
                  </>
                )}
              </>
            ) : (
              <div className="mx-auto m-auto">
                <div className="mt-4 ">
                  <Button className=" m-2 bg-transparent hover:bg-transparent text-slate-700 text-sm p-2 font-sfpro   dark:text-primary">
                    + New List
                  </Button>
                </div>
                <div className="flex items-center m-auto w-full justify-center text-center">
                  <LottieAnimation
                    animationData={EmptyList}
                    height={200}
                    width={200}
                  />
                </div>
              </div>
            )}
          </>
        </div>
      </div>
      <span>
        {getAllList && getAllList.total > 4 && (
          <>
            <PaginationButton
              total={getAllList.total}
              CurrentPage={CurrentPage}
            />
          </>
        )}
      </span>
    </div>
  );
};
export default Single;
