

import { useSelector } from "react-redux";
import { selectCurrentUserName } from "@/features/auth/authSlice";

import ChatBox from "../chat/chat-box";
import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";


export function ChatModal({messageOpen,setMessageOpen,details}:{messageOpen:boolean,setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>,details:ResponseWorkspaceDataType}) {

  const currentName = useSelector(selectCurrentUserName);

  return (
    <>
      {!messageOpen ? (
   <></>
      ) : (
      
          <ChatBox setMessageOpen={setMessageOpen} details={details} />
      
      )}
    </>
  );
}
