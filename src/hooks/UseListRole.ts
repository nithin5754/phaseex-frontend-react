


import { useGetCollabListByIdQuery } from "@/app/redux/api/listapi"
import useAuth from "./useAuth"
import { useCheckCollabInListGrpQuery } from "@/app/redux/api/taskapi"

interface Props {
  workspaceId:string
  folderId:string
  listId:string

}


/**
 * 
 * @desc listcollab recevie
 * @returns  [
 *   id:string;
  fullName: string; 
  email:string
  imageUrl:string;
  role:"listManager"|"spaceOwner"|"viewer";]
 */


const UseListRole = ({workspaceId,folderId,listId}:Props) => {

  const userId=useAuth()

  const {data:getCollabListById} =useGetCollabListByIdQuery({workspaceId,folderId,listId},{
    pollingInterval:60000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  })

  const { data: getAllList} = useCheckCollabInListGrpQuery(
    { workspaceId,folderId,listId},
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );




let isRole=false
let role =""

  
 getCollabListById?.forEach((collab)=>{
      if(collab.id===userId?.userId){
       isRole=true
       role=collab.role
      }
  })

  let listRole={
    userId:userId?.userId,
    status:isRole,
    taskGrp:!!getAllList,
    role
  }


  
  

  return listRole
}
export default UseListRole