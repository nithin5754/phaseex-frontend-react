import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Ellipsis } from "lucide-react";
import { useState } from "react";
import { AttachMentDetails } from "../attachment/index";
import { Attachment } from "@/types/attachment";

interface Props {
  attachment: Attachment;
}

export function ViewMoreAttachmentModal({ attachment }: Props) {
  const [_open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <Ellipsis size={16} />
        </button>
      </DialogTrigger>
      <DialogContent className=" dark:border-border">
        <AttachMentDetails attachment={attachment} />
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={handleClose}>
              close
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
