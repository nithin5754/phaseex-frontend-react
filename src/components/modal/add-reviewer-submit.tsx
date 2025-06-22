import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus } from "lucide-react";
import { useState } from "react";
import AddSubmitReviewSection from "../review/add/AddSubmitReviewSection";

interface Props {}

export function SubmitReviewerModal({}: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} >
      <DialogTrigger asChild>
        <Button
          className={` z-50 text-white hover:bg-transparent bg-transparent border border-border`}
          onClick={handleOpen}
        >
          Submit
          {" "}
          <Plus size={74} />
        </Button>
      </DialogTrigger>
      <DialogContent className="border  dark:border-border focus:border-black">
        <DialogHeader>
          <h1 className="font-sfpro text-3xl text-center dark:text-primary">
            Reviewer Evaluation
          </h1>
        </DialogHeader>
        <AddSubmitReviewSection handleClose={handleClose} />
     <DialogFooter className=" flex items-end">
      <Button className="bg-transparent hover:bg-transparent text-black dark:text-white" variant={'outline'} onClick={handleClose}>close</Button>
    </DialogFooter>
      </DialogContent>
 
    </Dialog>
  );
}
