


import { Button } from "../ui/button"

import { ListTodo, ListTodoIcon, LucideIcon, PlusCircle } from "lucide-react";


import { useState } from "react";

import { CreateTodo } from "../TodoList";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";








interface OpenModalProps{
  icon:LucideIcon;

  spaceId:string,
  folderId:string
  listId:string,
taskId:string
}


  export  function TodoModalCreate({icon:Icon,spaceId,folderId,listId,taskId}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
  return (

    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>
      <Button variant="outline"><PlusCircle/></Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="dark:text-primary text-white w-full"> New Todo Task</DialogTitle>
        <DialogDescription>
           this will help to divide complex task into simple todo list
        </DialogDescription>
      </DialogHeader>
      <CreateTodo handleClose={handleClose} workspaceId={spaceId} folderId={folderId} listId={listId} taskId={taskId}/>

      <DialogFooter>
     <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}