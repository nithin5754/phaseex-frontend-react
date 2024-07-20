


  

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { AddProfile } from "../profile/index"
import { File, PinIcon, Plus, User } from "lucide-react"
import { useState } from "react";
import {AddAttachment} from "../attachment/index";

interface Props {

}

export function AttachmentAddModal() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
     
      <Button >
        <PinIcon size={16} /> Attachment
      </Button>
      </DialogTrigger>
      <DialogContent className=" dark:border-border">
        <DialogHeader>
        
<h1 className="font-sfpro text-2xl text-center dark:text-primary"><File className="mr-4" size={18}/> Add Attachments</h1>
      

        </DialogHeader>
<AddAttachment handleClose={handleClose}/>
        <DialogFooter>
        <DialogTrigger asChild>
        <Button type="submit" onClick={handleClose}>close</Button>
      </DialogTrigger>
   
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
