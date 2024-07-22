











import { Button } from "../ui/button"

import { LucideIcon} from "lucide-react";


import { useState } from "react";


import { Dialog, DialogContent, DialogFooter,  DialogTrigger } from "../ui/dialog";

import { CreateRoomId } from "../VideoChat";






interface OpenModalProps{
  icon:LucideIcon;
  title:string
}


  export  function CRoomIdModal({title,icon:Icon}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
    <Button   className='w-full items-center gap-2 justify-end hover:bg-transparent text-black bg-transparent  dark:text-primary'
     >{title} <span>{Icon &&<Icon size={20}/>} </span></Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]  dark:border-border dark:border ">


  

       <CreateRoomId/>


      <DialogFooter>
     <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}