import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";
import { Button } from "../ui/button";

import { LucideIcon } from "lucide-react";

import { useContext, useState } from "react";

import { CreateTask } from "../tasks/index";
import { ListsContext } from "@/app/context/lists.context";

interface OpenModalProps {
  icon?: LucideIcon;
  title: string;
  isManagerExists:boolean
}

export function OpenModal({ title, icon: Icon, isManagerExists}: OpenModalProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { workspaceId, folderId, listId } = useContext(ListsContext);

  const handleClose = () => setOpen(false);
  return (
    <Credenza open={open} onOpenChange={setOpen} >
      <CredenzaTrigger asChild >
        <Button disabled={!isManagerExists} className="w-full items-center gap-2 justify-end hover:bg-transparent font-sfpro  bg-transparent  dark:text-primary">
          {title} <span>{Icon && <Icon size={20} />} </span>
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle className="dark:text-primary">
            create new Task
          </CredenzaTitle>
          <CredenzaDescription className="dark:text-primary">
            We are creating a dedicated space for your project within our tool
            signifies the inception of a strategic journey towards achieving
            your objectives
          </CredenzaDescription>
        </CredenzaHeader>

        <CredenzaBody className="space-y-4 pb-4 text-center text-sm sm:pb-0 sm:text-left dark:text-primary ">
          <CreateTask
            handleClose={handleClose}
            workspaceId={workspaceId}
            folderId={folderId}
            listId={listId}
          />
        </CredenzaBody>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button
              className="dark:text-primary"
              variant="outline"
              onClick={handleClose}
            >
              Close
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
}
