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
  ReceiveCollaboratorType,
  useGetAllCollabInSpaceQuery,
} from "@/app/redux/api/spaceApi";

import useAuth from "@/hooks/useAuth";
import { ROLE_PERMISSIONS } from "@/lib/rolesPermission";
import { ListContext } from "@/app/context/list.context";
import UseSpaceRoles from "@/hooks/useSpaceRoles";

export function AddModalMembersList() {
  const { workspaceId } = useContext(ListContext);
  const isSpaceOwner = UseSpaceRoles({ workspaceId });
  const [open, setOpen] = useState(false);
  const user = useAuth();

  const [isPermission, setPermission] = useState<boolean>(false);

  const { data: getAllMembers } = useGetAllCollabInSpaceQuery(workspaceId!, {
    skip: !workspaceId,
  });

  useEffect(() => {
    if (getAllMembers && getAllMembers.length > 0) {
      const userResult = getAllMembers.find(
        (member: ReceiveCollaboratorType) => member.id === user?.userId
      );
      if (userResult) {
        const permission = ROLE_PERMISSIONS[userResult.role];

        const hasPermission: boolean = permission["canInvite"];
        setPermission(hasPermission);
      }
    }
  }, [getAllMembers]);

  if (!workspaceId) {
    return (
      <Button variant="destructive" disabled>
        Invalid space ID
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={!isSpaceOwner}>
        <Button
          variant="default"
          className="h-6 w-8 rounded-sm flex mx-auto"
          size="icon"
          title="Add Member"
        >
          {isPermission ? <UserPlus size={14} /> : <User />}
        </Button>
      </DialogTrigger>

      <DialogContent className="space-y-4 border-gray-600">
        <DialogHeader>
          <DialogTitle className="text-white dark:text-primary">
            {isPermission
              ? "Add Manager and Viewer"
              : "View List Manager and Viewers"}
          </DialogTitle>
          <DialogDescription>
            Manager is required. Viewer is optional.
          </DialogDescription>
        </DialogHeader>

        {isPermission ? (
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
