

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


import { useState } from "react";
import { ListForm } from "../list/index";








interface OpenModalProps{
  icon?:LucideIcon;
  title:string,
  spaceId:string,
  folderId:string
}


  export  function OpenModal({title,icon:Icon,spaceId,folderId}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => setOpen(false);
  return (
    <Credenza open={open} onOpenChange={setOpen} >
      <CredenzaTrigger asChild>
      <Button   className=' items-center gap-2 justify-end  dark:text-black  '
     >{title} <span>{Icon &&<Icon size={20}/>} </span></Button>
      </CredenzaTrigger>
      <CredenzaContent  >
        <CredenzaHeader>
          <CredenzaTitle className="dark:text-primary">create new List</CredenzaTitle>
          <CredenzaDescription className="dark:text-primary">
         We are creating a dedicated space for your project within our tool signifies the inception of a strategic journey towards achieving your objectives
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left dark:text-primary ">
         <ListForm handleClose={handleClose} spaceId={spaceId} folderId={folderId}/>
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