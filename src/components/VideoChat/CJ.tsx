import UseSpaceRoles from "@/hooks/useSpaceRoles"
import { CreateRoomId } from "./CreateRoomId"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSocket } from "@/app/socketContext"
import VideoNotification from "./VideoNotification"
import { useGetVideoInviteLinkQuery } from "@/app/redux/api/VideoChatApi"
import { useEffect } from "react"







 const CJ = () => {

const {id}=useParams()
const navigate=useNavigate()
const { GetVideoNotification,setVideoNotification } = useSocket();





   
if(!id){
  navigate(-1)
  return
}
const spaceId=UseSpaceRoles({workspaceId:id})


const {data:getALLvideoLinkInvitation}=useGetVideoInviteLinkQuery({workspaceId:id}, {
  pollingInterval: 120000,
  refetchOnFocus: true,
  refetchOnMountOrArgChange: true,
})



useEffect(() => {
  if (getALLvideoLinkInvitation) {
    setVideoNotification(getALLvideoLinkInvitation);
  }
}, [getALLvideoLinkInvitation]);
   

   return spaceId?(<CreateRoomId/>):(<>
    <VideoNotification owner={GetVideoNotification?.ownerName} url={GetVideoNotification?.url}/>
   </>)
 }
 export default CJ