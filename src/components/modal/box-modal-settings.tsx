import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza"
import { Button } from "../ui/button"

import { LucideIcon } from "lucide-react";

import { WorkspaceForm } from "../work-space/index";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectSideCloseOpen } from "@/app/redux/slice/uttilSlice";







interface OpenModalProps{
  icon?:LucideIcon;
  title:string
}


  export  function OpenModal({title,icon:Icon}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const isSideOpenClose=useSelector(selectSideCloseOpen)
  return (
    <Credenza open={open} onOpenChange={setOpen} >
      <CredenzaTrigger asChild>
        <Button   className='w-full  gap-2   text-white dark:bg-primary   dark:text-background'
     >{!isSideOpenClose&&title} <span >{Icon &&<Icon size={20}/>} </span></Button>
      </CredenzaTrigger>
      <CredenzaContent  >
        <CredenzaHeader>
          <CredenzaTitle className="dark:text-primary">Let's  build a Workspace</CredenzaTitle>
          <CredenzaDescription  className="dark:text-primary">
         We are creating a dedicated space for your project within our tool signifies the inception of a strategic journey towards achieving your objectives
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left dark:text-primary">
        <WorkspaceForm handleClose={handleClose}/>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button className="dark:text-primary" variant="outline" onClick={handleClose}>Close</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}