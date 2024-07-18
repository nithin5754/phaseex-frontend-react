

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
import { Plus, User } from "lucide-react"
import { useState } from "react";

interface Props {
  hovered:boolean
}

export function ProfileModal({hovered}:Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button   className={`absolute z-50 text-white hover:bg-transparent bg-transparent  ${hovered ? 'opacity-100 hover:bg-transparent ' : 'opacity-0 hover:bg-transparent '} transition-opacity duration-700`} 
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} onClick={handleOpen}>    <Plus
          size={74}
        
        /></Button>

      </DialogTrigger>
      <DialogContent className=" dark:border-border">
        <DialogHeader>
        
<h1 className="font-sfpro text-3xl text-center dark:text-primary">upload profile picture</h1>
      

        </DialogHeader>
<AddProfile/>
        <DialogFooter>
        <DialogTrigger asChild>
        <Button type="submit" onClick={handleClose}>close</Button>
      </DialogTrigger>
   
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
