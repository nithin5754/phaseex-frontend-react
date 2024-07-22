import { useGetAllFolderQuery } from "@/app/redux/api/FolderApi";
import { Link, useParams } from "react-router-dom";
import { LottieAnimation } from "../lootie/Lootie";
import emptyFolder from "../../../public/json/empty-folder-1.json";

const Folder = () => {
  const { id } = useParams();
  if (!id) {
    return <h1>loading....</h1>;
  }
  const { data: getAllFolder } = useGetAllFolderQuery(id,{
    pollingInterval:120000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  });


  const truncateDesc = (desc: string) => {
    return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
  };

  return (
    <div className="p-6">
      <div className="w-full h-[400px] border bg-white text-black font-sfpro shadow-sm rounded-lg overflow-hidden dark:bg-background dark:text-primary dark:border-border ">
        <div className="p-6">
          <h1 className="font-sfpro text-xl">Folder</h1>
          {getAllFolder && getAllFolder?.length > 0 ? (
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
                          <Link  key={folder.id} to={`/space/${id}/folders/${folder.id}`}>
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
          ) : (
            <>
              <div className="flex items-center w-full justify-center text-center">
                <LottieAnimation
                  animationData={emptyFolder}
                  height={200}
                  width={200}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Folder;
