


import { useAppDispatch } from "@/app/redux/api/store"
import { notificationOpen, setOpenNotification } from "@/app/redux/slice/notificationSlice"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,

} from "@/components/ui/sheet"

import { useSelector } from "react-redux"


export function NotificationPage() {

  const dispatch=useAppDispatch()

  const toggle=useSelector(setOpenNotification)


 



  return (
    <Sheet open={toggle} onOpenChange={(open)=>dispatch(notificationOpen(open))} >
 
      <SheetContent >
        <SheetHeader >
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
