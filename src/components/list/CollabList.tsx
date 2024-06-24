import { LottieAnimation } from "../lootie/Lootie"
import { AddListCollabInput } from "../search"
import collabLootie from '.././../../public/json/collabrative-1.json'
import {AddListCollabSuggestion, MembersListAddPage  } from "./index";
import { useSelector } from "react-redux";
import { selectSUggestionCollabListOpenClose } from "@/app/redux/slice/listSlice";
import { useGetCollabListByIdQuery } from "@/app/redux/api/listapi";

interface Props {
  workspaceId:string;
  folderId:string;
  listId:string;
}
const CollabList = ({workspaceId,folderId,listId}:Props) => {

  const openClose=useSelector(selectSUggestionCollabListOpenClose)

  const {data:getCollabListById}=useGetCollabListByIdQuery({workspaceId,folderId,listId})  
  return (
     <div className="flex  flex-col mx-auto mt-4  ">
      <AddListCollabInput/>
      <>
      {
        openClose&& <AddListCollabSuggestion workspaceId={workspaceId} folderId={folderId} listId={listId}/>
      }
      </>
    {
      getCollabListById&&getCollabListById.length>0?(
        <>
        <MembersListAddPage workspaceId={workspaceId} folderId={folderId} listId={listId}/>
        </>
      ):(<LottieAnimation animationData={collabLootie} height={300} width={300}/>)
    }
     
     </div>
  )
}
export default CollabList