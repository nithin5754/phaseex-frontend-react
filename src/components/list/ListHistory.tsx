
import { Label } from "../ui/label";
import { OpenModal } from "../modal/folderEdit-modal";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";

import { useGetSingleListQuery } from "@/app/redux/api/listapi";
interface Props {

  workspaceId:string
 folderId:string
 listId:string
 
}


const ListHistory = ({workspaceId,folderId,listId}:Props) => {
  const {
    data: singleList,
    error,
    isLoading:isSingleListLoading
  } = useGetSingleListQuery(
    { workspaceId,folderId,listId },
    {
      pollingInterval: 120000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );


  const truncateDesc = (desc: string) => {
    return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
  };
    
  if (isSingleListLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="flex flex-row w-full  gap-2  items-center justify-around ">
    <div className="flex w-[60%] bg-white border border-gray-200 rounded-lg h-26 p-4 dark:bg-background  dark:text-primary dark:border-border">
      {singleList && (
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-between h-full">
            <h1 className="font-sfpro text-lg mb-2">
              LIST: {singleList.list_title}
            </h1>
            <p className="text-gray-600 text-md font-sfpro mb-2 dark:text-primary">
              Description: {singleList.list_description}
            </p>
            <h1 className="text-slate-600 text-[12px] font-sfpro dark:text-foreground ">
              Created at {singleList.createdAt}
            </h1>
            <h1 className="text-slate-600 text-[12px]  dark:text-foreground ">
              updated  at {singleList.updatedAt}
            </h1>
          </div>
          <OpenModal title={"edit"} icon={Plus} spaceId={workspaceId} />
        </div>
      )}
    </div>

 

    <div className="flex items-center w-[40%]  flex-1 justify-center bg-white border border-gray-200 rounded-lg h-36 dark:bg-background  dark:text-primary dark:border-border">
      <div className="flex flex-col items-center justify-center">
        <Label htmlFor="picture" className="font-sfpro text-sm mb-4 ">
          Upload resource for this List
        </Label>
        <Input
          id="picture"
          type="file"
          className="dark:bg-input dark:text-primary text-[12px] h-9 w-[250px] text-center "
        />
      </div>
    </div>
  </div>
  )
}
export default ListHistory