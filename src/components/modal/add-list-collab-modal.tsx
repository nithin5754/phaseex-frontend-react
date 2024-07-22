





import { Button } from "../ui/button"

import { LucideIcon} from "lucide-react";


import { useState } from "react";


import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { CollabList } from "../list";








interface OpenModalProps{
  icon:LucideIcon;
  spaceId:string,
  folderId:string
  listId:string,


}


  export  function ListCollabModal({icon:Icon,spaceId,folderId,listId}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
     <Icon size={14} />
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]  dark:border-border dark:border ">
      <DialogHeader>
        <DialogTitle className="dark:text-primary text-white w-full text-center font-thin"> Add list manager /viewer</DialogTitle>

      </DialogHeader>
    
    <CollabList workspaceId={spaceId} folderId={folderId} listId={listId}/>

      <DialogFooter>
     <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}