

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

import { Profile } from "../profile/index"
import { User } from "lucide-react"
import { useState } from "react";

export function ProfileModal() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full  border-0 flex gap-2 justify-start  " onClick={handleOpen}><User/> Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] h-[650px] dark:border-border">
        <DialogHeader>
          <DialogTitle className="dark:text-primary text-4xl font-sfpro ">Profile</DialogTitle>

        </DialogHeader>
<Profile/>
        <DialogFooter>
        <DialogTrigger asChild>
        <Button type="submit" onClick={handleClose}>close</Button>
      </DialogTrigger>
   
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
