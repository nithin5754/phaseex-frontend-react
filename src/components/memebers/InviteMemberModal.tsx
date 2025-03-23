import { FC } from "react";
import ModalBg from "../modal/modal-bg";
import { IInviteModalProps } from "@/types/modal.interface";
import { Button } from "../ui/button";
import { MembersTabList } from "./MembersTabList";




const InviteMemberModal:FC<IInviteModalProps> = ({onClose}) => {
  return (
    <ModalBg>
      <div className="fixed bottom-0 left-0 right-0 top-0 z-[30] flex  items-center justify-center    ">
        <div className="relative bottom-auto left-auto right-auto top-auto h-[60%] w-[70%] ">
          <Button onClick={onClose} className="absolute bg-gray-900/50 dark:bg-white/40 hover:dark:bg-white hover:bg-gray-900 top-[-15%] z-50">x</Button>

          <MembersTabList/>

        </div>
 
      </div>
    </ModalBg>
  );
};
export default InviteMemberModal;
