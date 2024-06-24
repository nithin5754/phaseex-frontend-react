


 





import { Button } from "../ui/button"

import { LucideIcon} from "lucide-react";


import { useState } from "react";


import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

import { CollabTask } from "../tasks/index";








interface OpenModalProps{
  icon:LucideIcon;
  spaceId:string,
  folderId:string
  taskId:string
  listId:string,
  


}


  export  function TaskCollabModal({icon:Icon,spaceId,folderId,listId,taskId}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
     <Icon size={14} />
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]  dark:border-border dark:border ">
      <DialogHeader>
        <DialogTitle className="dark:text-primary text-white w-full text-center font-thin"> Add to developers</DialogTitle>

      </DialogHeader>
    
    <CollabTask workspaceId={spaceId} folderId={folderId} listId={listId} taskId={taskId}/>

      <DialogFooter>
     <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}