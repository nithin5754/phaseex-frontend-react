import { useParams } from "react-router-dom";
import {ListHistory} from "./index";
import { Plus } from "lucide-react";
import { TaskTable } from "../tasks/index";


 const SingleListFolder = () => {
  const { id, folderId ,listId } = useParams();

    if(!id||!folderId||!listId){
      return <h1>loading....</h1>
    }


    
   return (
    <div className="flex flex-col w-full p-6 m-auto font-sfpro ">
        <ListHistory workspaceId={id} folderId={folderId} listId={listId}/>

        <div className="bg-white my-[14px]  border rounded-lg min-h-[400px] h-auto overflow-hidden dark:bg-background dark:text-primary dark:border-border">
        <div className="px-6 py-4 border-b flex justify-between dark:border-border">
          <h2 className="text-lg font-sfpro dark:text-primary">Tasks</h2>
          <Plus className="text-slate-500 hover:text-slate-800 dark:text-primary " />
        </div>
        <div className=" py-4">
         <TaskTable spaceId={id} folderId={folderId} listId={listId} />
        </div>
      </div>
      
    </div>
   )
 }
 export default SingleListFolder