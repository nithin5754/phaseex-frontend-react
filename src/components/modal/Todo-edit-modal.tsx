


import { Button } from "../ui/button"

import { LucideIcon } from "lucide-react";


import { useState } from "react";

import { EditTodo } from "../TodoList/index";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";









interface OpenModalProps{
  icon:LucideIcon;


}


  export  function TodoModalEdit({icon:Icon}:OpenModalProps) {


    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
    <DialogTrigger asChild>
     <Icon size={23} />
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="dark:text-primary text-white w-full"> Edit Todo Task</DialogTitle>
        <DialogDescription>
           this will help to divide complex task into simple todo list
        </DialogDescription>
      </DialogHeader>
      <EditTodo handleClose={handleClose} />

      <DialogFooter>
     <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}