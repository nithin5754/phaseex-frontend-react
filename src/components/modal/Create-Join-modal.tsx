














import { Button } from "../ui/button"

import { LucideIcon} from "lucide-react";


import { useState } from "react";


import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "../ui/dialog";


import { CJ } from "../VideoChat";
import { LottieAnimation } from "../lootie/Lootie";
import VideoIcon from "../../../public/json/video-icon.json";





interface OpenModalProps{
  icon:LucideIcon;
  spaceId:string,
  folderId:string
  listId:string,
  taskId:string;
}


  export  function CJModal() {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
    <Button className="h-[100px]">
        <LottieAnimation animationData={VideoIcon} height={100} width={100} />
      </Button>
  
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]  dark:border-border dark:border ">
      <DialogHeader>

      </DialogHeader>
        
        <CJ/>
  
      <DialogFooter>
     <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}