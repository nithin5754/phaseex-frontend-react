import { useGetCollabListByIdQuery } from "@/app/redux/api/listapi"

interface Props {
  workspaceId:string
  folderId:string
  listId:string
  taskId:string
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


const UseinviteUserAuth = ({workspaceId,folderId,listId}:Props) => {

  const {data:getCollabListById} =useGetCollabListByIdQuery({workspaceId,folderId,listId})

  





  return getCollabListById
}
export default UseinviteUserAuth