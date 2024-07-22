



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
import { EditFolder } from "../folder/index";







interface OpenModalProps{
  icon?:LucideIcon;
  title:string
  spaceId:string
}


  export  function OpenModal({title,icon:Icon,spaceId}:OpenModalProps) {
    const [open, setOpen] = useState<boolean>(false);

  
    const handleClose = () => setOpen(false);
  return (
    <Credenza open={open} onOpenChange={setOpen} >
      <CredenzaTrigger asChild>
      <Button   className='w-[76px] p-0 font-sfpro items-center gap-2 justify-center text-gray-500 dark:text-primary  border-0 bg-none bg-transparent dark:bg-transparent hover:bg-transparent focus-within:bg-transparent '
     >{title} <span>{Icon &&<Icon size={18}/>} </span></Button>
      </CredenzaTrigger>
      <CredenzaContent  >
        <CredenzaHeader>
          <CredenzaTitle className="dark:text-white  dark:bg-background">Edit Folder </CredenzaTitle>
          <CredenzaDescription className="dark:text-primary dark:bg-background">
         We are creating a dedicated space for your project within our tool signifies the inception of a strategic journey towards achieving your objectives
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left dark:text-primary">
        <EditFolder handleClose={handleClose} spaceId={spaceId}/>
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