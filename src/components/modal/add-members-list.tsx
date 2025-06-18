import { useContext, useEffect, useState } from "react";
import { User, UserPlus } from "lucide-react";
import { Button } from "../ui/button";

import Searchbox from "../search/list/search-box";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {

  useGetAllCollabInSpaceQuery,
} from "@/app/redux/api/spaceApi";

import useAuth from "@/hooks/useAuth";

import { ListContext } from "@/app/context/list.context";
import useRolePermission from "@/hooks/useRolePermission";


export function AddModalMembersList() {
  const { workspaceId } = useContext(ListContext);
  const permission = useRolePermission({
    workspaceId
   
  });
  const [open, setOpen] = useState(false);
  const user = useAuth();

  const { data: getAllMembers } = useGetAllCollabInSpaceQuery(workspaceId!, {
    skip: !workspaceId,
  });



  if (!workspaceId) {
    return (
      <Button variant="destructive" disabled>
        Invalid space ID
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={!permission.owner}>
        <Button
          variant="default"
          className="h-6 w-8 rounded-sm flex mx-auto"
          size="icon"
          title="Add Member"
        >
          {permission.owner ? <UserPlus size={14} /> : <User />}
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-4 border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-white dark:text-primary">
            {permission.owner
              ? "Add Manager and Viewer"
              : "View List Manager and Viewers"}
          </DialogTitle>
          <DialogDescription>
            Manager is required. Viewer is optional.
          </DialogDescription>
        </DialogHeader>

        {permission.owner ? (
          <div className="flex gap-2">
            <Searchbox getAllMembers={getAllMembers} type="search" />
          </div>
        ) : (
          <Searchbox getAllMembers={getAllMembers} type="view" />
        )}
      </DialogContent>
    </Dialog>
  );
}
