import { useOnDeleteInviteLinkNotificationMutation, useOnDeleteSingleNotificationMutation } from "@/app/redux/api/notiificationApi";
import { useVerifyCollaboratorsMutation } from "@/app/redux/api/spaceApi";
import { removeNotificationDetails } from "@/app/redux/slice/notificationSlice";
import { useSocket } from "@/app/socketContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * 
 * @route   `/invite?workspace=${getSingleWorkSpace.id}&username=${userId}&messageReceiver=${userName}&messageSendBy=${getUserById.userName}&workspaceName=${getSingleWorkSpace.title}notificationId=`;
 */

 const Invite = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const workspaceId = query.get('workspace');
  const username = query.get('username');
  const notificationId = query.get('notificationId');
  const workspaceName = query.get('workspaceName');
  const messageSendBy=query.get('messageSendBy')
  const messageReceiver = query.get('messageReceiver');

  const spaceOwner = query.get('senderId');
  const { socket } = useSocket();

  const [onDeleteInviteLinkNotification]=useOnDeleteInviteLinkNotificationMutation()

  const [verifyCollaborators]=useVerifyCollaboratorsMutation()

  const dispatch=useDispatch()

  const navigate=useNavigate()

  useEffect(()=>{
fetch()
  },[])


  const fetch=async()=>{
     if(workspaceId&&username&&notificationId){
     let response= await verifyCollaborators({workspaceId,collaboratorId:username}).unwrap()
     if(response&&socket){
      socket.emit("sendNotification", {
        senderId:spaceOwner,
        receiverName: username,
        workspaceName:workspaceName,
        Description:`hey ${messageReceiver} successfully verified joined into ${workspaceName}`,
        type: "verified    ",
        messageReceiver:spaceOwner,
        link:'',
        messageSendBy:messageSendBy,
        message: ` verified`,
      });
    
      await onDeleteInviteLinkNotification(notificationId).unwrap()
dispatch(removeNotificationDetails(undefined))

navigate(-1)


     }
     }
  }
  

  console.log(workspaceId,username,notificationId,spaceOwner,"invitation ids");
  
   return (
     <div>Invite....</div>
   )
 }
 export default Invite