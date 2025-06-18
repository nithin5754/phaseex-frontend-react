
import { CreateRoomId } from "./CreateRoomId"
import { useNavigate, useParams } from "react-router-dom"
import { useSocket } from "@/app/socketContext"
import VideoNotification from "./VideoNotification"
import { useGetVideoInviteLinkQuery } from "@/app/redux/api/VideoChatApi"
import { useEffect } from "react"
import useRolePermission from "@/hooks/useRolePermission"







 const CJ = () => {

const {id}=useParams()
const navigate=useNavigate()
const { GetVideoNotification,setVideoNotification } = useSocket();





   
if(!id){
  navigate(-1)
  return
}
  const permission = useRolePermission({
    workspaceId:id,
   
  });


const {data:getALLvideoLinkInvitation}=useGetVideoInviteLinkQuery({workspaceId:id})



useEffect(() => {
  if (getALLvideoLinkInvitation) {
    setVideoNotification(getALLvideoLinkInvitation);
  }
}, [getALLvideoLinkInvitation]);
   

   return permission.owner?(<CreateRoomId/>):(<>
    <VideoNotification owner={GetVideoNotification?.ownerName} url={GetVideoNotification?.url}/>
   </>)
 }
 export default CJ