


import { useGetSingleListQuery } from "@/app/redux/api/listapi";
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


    
  if (isSingleListLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div className="flex flex-row w-full  gap-2  items-center justify-around ">






<div className="flex  w-[30%] justify-between   flex-1 pl-4 bg-white border border-gray-200 rounded-lg h-36 dark:bg-background  dark:text-primary dark:border-border ">
      <div className="flex flex-col items-center justify-center ">
    
      {singleList && (
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col justify-between h-full">
            <h1 className="font-sfpro text-lg mb-2">
        {singleList.list_title}
            </h1>
            <h1 className="text-slate-600 text-[12px] font-sfpro dark:text-foreground ">
              Created at {singleList.createdAt}
            </h1>
            <h1 className="text-slate-600 text-[12px]  dark:text-foreground ">
              updated  at {singleList.updatedAt}
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