


import { useGetSingleListQuery } from "@/app/redux/api/listapi";
import { upperCase } from "@/lib/utils.data";
import { List } from "lucide-react";
interface Props {

  workspaceId:string
 folderId:string
 listId:string
 
}


const ListHistory = ({workspaceId,folderId,listId}:Props) => {
  const {
    data: singleList,

    isLoading:isSingleListLoading
  } = useGetSingleListQuery(
    { workspaceId,folderId,listId },
    {
      pollingInterval:60000,
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






<div className="flex  w-[30%] justify-between   flex-1 pl-4 bg-white border border-gray-200 rounded-lg h-36 dark:bg-background  dark:text-primary dark:border-border ">
      <div className="flex flex-col items-center justify-center ">
    
      {singleList && (
  <div className="flex flex-row p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md">
    <div className="flex flex-col justify-between w-full">
 
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center text-lg font-medium text-gray-800 dark:text-white gap-3">
          <List size={18} className="text-primary" />
          {
            upperCase(singleList.list_title)
          }
     
        </div>
        <div className="flex items-center">
      
          {/* {isSpaceOwner && <OpenModal title={""} icon={EllipsisIcon} spaceId={id} />} */}
        </div>
      </div>

   
      <p className="text-gray-600 text-sm mt-2 dark:text-gray-300">
        <span className="font-medium">Description:</span> {truncateDesc(singleList.list_description)}
      </p>

  
      <h1 className="text-gray-500 text-sm mt-2 dark:text-gray-400">
        Created at {singleList.createdAt}
      </h1>
    </div>
  </div>
)}

      </div>

    </div>

 

  </div>
  )
}
export default ListHistory