


import { LottieAnimation } from "../lootie/Lootie"
import { AddListCollabInput, AddTaskCollabInput } from "../search/index"
import collabLootie from '.././../../public/json/collabrative-1.json'

import { useSelector } from "react-redux";


import { MembersTaskAddPage, SuggestionTaskCollab } from "../tasks/index";
import { selectSUggestionCollabTaskOpenClose } from "@/app/redux/slice/taskSlice";
import { useGetCollabTaskByIdQuery } from "@/app/redux/api/taskapi";
import { MembersListAddPage } from "../list";


interface Props {
  workspaceId:string;
  folderId:string;
  listId:string;
  taskId:string
}
const CollabTask = ({workspaceId,folderId,listId,taskId}:Props) => {

  const openClose=useSelector(selectSUggestionCollabTaskOpenClose)


  const {data:getCollabTaskById}=useGetCollabTaskByIdQuery({workspaceId,folderId,listId,taskId},    {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })  
  return (
     <div className="flex  flex-col mx-auto mt-4  ">
   
  <AddTaskCollabInput/>
   
      <>
      {
        openClose&& <SuggestionTaskCollab workspaceId={workspaceId} folderId={folderId} listId={listId} taskId={taskId}/>
      }
      </>
    {
      getCollabTaskById&&getCollabTaskById.length>0?(
        <>
        <MembersTaskAddPage workspaceId={workspaceId} folderId={folderId} listId={listId} taskId={taskId}/>
        </>
      ):(<LottieAnimation animationData={collabLootie} height={300} width={300}/>)
    }
     
     </div>
  )
}
export default CollabTask