import { useVerifyCollaboratorsMutation } from "@/app/redux/api/spaceApi";
import { useSocket } from "@/app/socketContext";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * 
 * @route  `/invite?workspace=${getSingleWorkSpace.id}&username=${userId}&notificationId=12345&senderId`;
 */

 const Invite = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const workspaceId = query.get('workspace');
  const username = query.get('username');
  const notificationId = query.get('notificationId');
  const spaceOwner = query.get('senderId');
  const { socket } = useSocket();

  const [verifyCollaborators]=useVerifyCollaboratorsMutation()

  useEffect(()=>{
fetch()
  },[])


  const fetch=async()=>{
     if(workspaceId&&username){
     let response= await verifyCollaborators({workspaceId,collaboratorId:username}).unwrap()
     if(response&&socket){
      socket.emit("sendNotification", {
        senderId:spaceOwner,
        receiverName: username,
        workspaceName:workspaceId,
        Description:`successfully verified`,
        type: "verified    ",
        messageReceiver:spaceOwner,
        link:'',
        messageSendBy:'',
        message: ` verified`,
      });
     }
     }
  }
  

  console.log(workspaceId,username,notificationId,spaceOwner,"invitation ids");
  
   return (
     <div>Invite....</div>
   )
 }
 export default Invite