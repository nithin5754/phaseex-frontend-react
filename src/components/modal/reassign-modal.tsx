





import { Button } from "../ui/button"

import { LucideIcon} from "lucide-react";


import { useState } from "react";


import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

import {  ReassignSection } from "../TodoList/index";
import { TodoType } from "@/features/types/TodoType";








interface OpenModalProps{
  icon:LucideIcon;
  todo:TodoType


}


  export  function ReassignTodoModal({icon:Icon,todo}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
     <Icon size={14} />
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px] min-h-[400px]  dark:border-border dark:border ">
      <DialogHeader>
        <DialogTitle className="dark:text-primary text-white w-full text-center font-thin"> Re-assign Collaborator to Todo Task</DialogTitle>

      </DialogHeader>
    
 <ReassignSection todo={todo}/>
    

      <DialogFooter>
     <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}