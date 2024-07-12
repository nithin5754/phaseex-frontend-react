











import { Button } from "../ui/button"

import { LucideIcon} from "lucide-react";


import { useState } from "react";


import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";

import { VideoChatIcon } from "../VideoChat";

import { useSelector } from "react-redux";
import { selectCurrentUserName } from "@/features/auth/authSlice";





interface OpenModalProps{
  icon:LucideIcon;
  spaceId:string,
  folderId:string
  listId:string,
  taskId:string;
}


  export  function VideoChatModal() {
    const [open, setOpen] = useState<boolean>(false);

    const currentName=useSelector(selectCurrentUserName)

    const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
    <div className="px-3.5 py-2 bg-gray-100 rounded    gap-3 inline-flex fixed right-[205px] bottom-[300px] z-50">
    <button>
    <h5 className="text-gray-900 text-sm font-sfpro  font-normal leading-snug h-4"> welcome {currentName?currentName:"to the chat world "} </h5>

    </button>
    </div>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]  dark:border-border dark:border ">
      <DialogHeader>

      </DialogHeader>
    
    <VideoChatIcon/>
      <DialogFooter>
     <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}