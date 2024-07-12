











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
    <div className="px-3.5 py-2    gap-3 inline-flex fixed right-[205px] bottom-[300px] z-50">
    <button>
    <div className="flex justify-start items-start p-4">
  <div className="relative bg-blue-500 text-white text-sm font-sfpro font-normal leading-snug p-3 rounded-lg max-w-xs">
    <span className="block h-4">Welcome {currentName ? currentName : "to the chat world"}</span>
    <div className="absolute bottom-0 left-0 transform -translate-x-2 translate-y-full w-0 h-0 border-t-[10px] border-t-blue-500 border-r-[10px] border-r-transparent border-l-[10px] border-l-transparent"></div>
  </div>
</div>


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