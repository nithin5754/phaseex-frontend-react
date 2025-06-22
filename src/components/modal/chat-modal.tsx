

import ChatBox from "../chat/chat-box";
import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";


export function ChatModal({messageOpen,setMessageOpen,details}:{messageOpen:boolean,setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>,details:ResponseWorkspaceDataType}) {



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
