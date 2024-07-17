

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Profile } from "../profile/index"
import { User } from "lucide-react"

export function ProfileModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full  border-0 flex gap-2 justify-start "><User/> Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[850px] h-[600px] dark:border-border">
        <DialogHeader>
          <DialogTitle className="dark:text-primary text-4xl font-sfpro ">Profile</DialogTitle>
          {/* <DialogDescription className="dark:text-primary">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
<Profile/>
        <DialogFooter>
          <Button type="submit">close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
