import { useGetSingleFolderQuery } from "@/app/redux/api/FolderApi";

import { useParams } from "react-router-dom";
import { LottieAnimation } from "../lootie/Lootie";
import EmptyList from "../../../public/json/empty-list-1.json";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { OpenModal } from "../modal/folderEdit-modal";

const Single = () => {
  const { id, folderId } = useParams();

  if (!folderId || !id) {
    return <h1>loading....</h1>;
  }

  const {
    data: singleFolder,
    error,
    isLoading,
  } = useGetSingleFolderQuery({ spaceId: id, folderId },{
    pollingInterval:120000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  });

  if (isLoading) {
    return <h1>loading...</h1>;
  }

  const truncateDesc = (desc: string) => {
    return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
  };

  return (
    <div className="flex flex-col w-full p-6 m-auto ">
      <div className="flex flex-row w-full  gap-2  items-center justify-around ">
        <div className="flex flex-1 bg-white border border-gray-200 rounded-lg h-36 p-4 dark:bg-background  dark:text-primary dark:border-border">
          {singleFolder && (
            <div className="flex flex-row">
              <div className="flex flex-col justify-between h-full">
                <h1 className="font-sfpro text-lg mb-2">
                  Folder {singleFolder.folder_title}
                </h1>
                <p className="text-gray-600 text-sm font-sfpro mb-4 dark:text-primary">
                  Description: {truncateDesc(singleFolder.folder_description)}
                </p>
                <h1 className="text-slate-600 text-sm font-sfpro dark:text-foreground ">
                  Created at {singleFolder.createdAt}
                </h1>
              </div>
              <OpenModal title={"edit"} icon={Plus} spaceId={id} />
            </div>
          )}
        </div>

        <div className="flex items-center w-[350px] justify-center bg-primary border border-gray-200 rounded-lg h-36 dark:bg-background  dark:text-primary dark:border-border">
          <div className="text-center">
            <h1 className="font-sfpro text-lg">Create New List</h1>
          </div>
        </div>

        <div className="flex items-center flex-1 justify-center bg-white border border-gray-200 rounded-lg h-36 dark:bg-background  dark:text-primary dark:border-border">
          <div className="flex flex-col items-center justify-center">
            <Label htmlFor="picture" className="font-sfpro text-md mb-4 ">
              Upload resource for this folder
            </Label>
            <Input id="picture" type="file" className="dark:bg-input dark:text-primary" />
          </div>
        </div>
      </div>

      <div className="bg-white my-[50px]  border rounded-lg h-[400px]  overflow-hidden dark:bg-background dark:text-primary dark:border-border">
      <div className="px-6 py-4 border-b flex justify-between dark:border-border">
            <h2 className="text-lg font-sfpro dark:text-primary">Lists</h2>
            <Plus className="text-slate-500 hover:text-slate-800 dark:text-primary " />
        </div>
        <div className=" py-4">
            <table className="min-w-full leading-normal dark:text-primary">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Name
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Color
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Progress
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Start
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            End
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Priority
                        </th>
                        <th className="px-5 py-3 border-b dark:border-border border-gray-200 text-left text-xs font-sfpro text-gray-600 dark:text-primary uppercase tracking-wider">
                            Owner
                        </th>
                    </tr>
                </thead>
                {/* <tbody>
                    <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            List
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="relative pt-1">
                                <div className="flex mb-2 items-center justify-between">
                                    <div className="text-xs font-sfpro inline-block text-gray-600">0/0</div>
                                </div>
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                                    <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500" ></div>
                                </div>
                            </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </td>
                    </tr>
                </tbody> */}
            </table>
            <div className="mt-4">
                <Button className=" m-2 bg-transparent hover:bg-transparent text-slate-700 text-sm p-2 font-sfpro   dark:text-primary">+ New List</Button>
            </div>
            <div className="flex items-center w-full justify-center text-center">
       <LottieAnimation animationData={EmptyList} height={200} width={200}/>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Single;
