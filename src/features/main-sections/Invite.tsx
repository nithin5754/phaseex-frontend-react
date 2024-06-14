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
  

  console.log(workspaceId,username,notificationId,spaceOwner,"invitation ids");
  
   return (
     <div>Invite....</div>
   )
 }
 export default Invite