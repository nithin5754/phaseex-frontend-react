import { LucideIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TaskAddDevelopers } from "../search/task/search";
import { Button } from "../ui/button";

interface OpenModalProps {
  icon: LucideIcon;
  permission: boolean;
}

export function TaskCollabModal({ icon: Icon, permission }: OpenModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="h-6 w-6 rounded-full flex mx-auto"
          size="icon"
          disabled={!permission}
        >
          <Icon size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-4 border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-white dark:text-primary">
            add developeers
          </DialogTitle>
          <DialogDescription>
            Manager is required. Viewer is optional.
          </DialogDescription>
        </DialogHeader>
        <TaskAddDevelopers />
      </DialogContent>
    </Dialog>
  );
}
