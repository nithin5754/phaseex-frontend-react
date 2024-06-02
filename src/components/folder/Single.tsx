

import { useParams } from "react-router-dom";
import { LottieAnimation } from "../lootie/Lootie";
import EmptyList from "../../../public/json/empty-list-1.json";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

import { useGetAllListByPageQuery } from "@/app/redux/api/listapi";
import { useSelector } from "react-redux";
import { selectPage } from "@/app/redux/slice/listSlice";
import { PaginationButton } from "../Pagination/index";
import { ListMap, ListTableTitle } from "../list/index";
import { FolderDetails } from "./index";

const Single = () => {
  const { id, folderId } = useParams();

  const CurrentPage = useSelector(selectPage);

  if (!folderId || !id) {
    return <h1>loading....</h1>;
  }

  const { data: getAllList, isLoading: listLoading } = useGetAllListByPageQuery(
    { workspaceId: id, folderId, page: CurrentPage },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <div className="flex flex-col w-full p-6 m-auto font-sfpro ">
      <FolderDetails id={id} folderId={folderId} />

      <div className="bg-white my-[14px]  border rounded-lg h-[450px]  overflow-hidden dark:bg-background dark:text-primary dark:border-border">
        <div className="px-6 py-4 border-b flex justify-between dark:border-border">
          <h2 className="text-lg font-sfpro dark:text-primary">Lists</h2>
          <Plus className="text-slate-500 hover:text-slate-800 dark:text-primary " />
        </div>
        <div className=" py-4">
          <>
            {getAllList && getAllList.lists && getAllList.lists.length > 0 ? (
              <table className="min-w-full leading-normal dark:text-primary">
                <ListTableTitle />

                <tbody>
                  <>
                    {getAllList.lists.slice(0, 4).map((list, index) => {
                      return (
                        <ListMap
                        key={list.id}
                          list={list}
                          index={index}
                          folderId={folderId}
                          workspaceId={id}
                        />
                      );
                    })}
                  </>
                </tbody>
              </table>
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
