import { Button } from "../ui/button";

import { LucideIcon } from "lucide-react";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { AddLink } from "../../components/tasks/index";

interface OpenModalProps {
  icon: LucideIcon;
  spaceId: string;
  folderId: string;
  listId: string;
  taskId: string;
  permission: boolean;
}

export function TaskLinkModal({
  icon: Icon,
  spaceId,
  folderId,
  listId,
  taskId,
  permission,
}: OpenModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={!permission}>
        <Button>
          {" "}
          <Icon size={14} /> Link
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]  dark:border-border dark:border ">
        <DialogHeader>
          <DialogTitle className="dark:text-primary text-white w-full text-center font-thin">
            {" "}
            Add link to the task
          </DialogTitle>
        </DialogHeader>

        <AddLink
          workspaceId={spaceId}
          folderId={folderId}
          listId={listId}
          taskId={taskId}
          handleClose={handleClose}
        />

        <DialogFooter>
          <Button
            className="dark:text-primary"
            variant="outline"
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
