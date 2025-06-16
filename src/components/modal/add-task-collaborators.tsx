import { LucideIcon } from "lucide-react";
import {  useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TaskAddDevelopers } from "../search/task/search";



interface OpenModalProps {
  icon: LucideIcon;
}

export function TaskCollabModal({ icon: Icon }: OpenModalProps) {
  const [open, setOpen] = useState<boolean>(false);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Icon size={14} />
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
