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
import { FolderForm } from "../folder/createFolder";







interface OpenModalProps{
  icon?:LucideIcon;
  title:string
  spaceId:string
}


  export  function OpenModal({title,icon:Icon,spaceId}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <Credenza open={open} onOpenChange={setOpen} >
      <CredenzaTrigger asChild>
        <Button   className='items-center gap-2 bg-transparent hover:bg-transparent justify-center text-slate-600'
     >{title} <span>{Icon &&<Icon size={20}/>} </span></Button>
      </CredenzaTrigger>
      <CredenzaContent  >
        <CredenzaHeader>
          <CredenzaTitle>create new folder</CredenzaTitle>
          <CredenzaDescription>
         We are creating a dedicated space for your project within our tool signifies the inception of a strategic journey towards achieving your objectives
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left">
        <FolderForm handleClose={handleClose} spaceId={spaceId}/>
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button variant="outline" onClick={handleClose}>Close</Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  )
}