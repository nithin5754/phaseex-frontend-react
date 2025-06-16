import {
  ReceiveCollaboratorType,
  useDeleteCollaboratorMutation,
} from "@/app/redux/api/spaceApi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FirstTwoCharacter } from "@/lib/FirstTwoCharacter";
import { Trash } from "lucide-react";

import UseSpaceRoles from "@/hooks/useSpaceRoles";

interface Props {
  collab: ReceiveCollaboratorType;
  workspaceId: string;
}

const SingleMembers = ({ collab, workspaceId }: Props) => {
  const isSpaceOwner = UseSpaceRoles({ workspaceId });

  const [deleteCollaborator] = useDeleteCollaboratorMutation();

  const handleDelete = async (workspaceId: string, collaboratorId: string) => {
    try {
      await deleteCollaborator({ workspaceId, collaboratorId }).unwrap();
    } catch (error) {
      console.log(error, "delete collaborator");
    }
  };
  return (
    <div key={collab.id} className="flex items-center gap-4">
      <Avatar className="hidden h-9 w-9 sm:flex">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>{FirstTwoCharacter(collab.assignee)}</AvatarFallback>
      </Avatar>
      <div className="flex gap-2 ">
        <p className="text-sm font-sfpro leading-none">{collab.assignee}</p>
      </div>

      <>
        {collab.verified ? (
          <h1 className="text-green-800">Accepted</h1>
        ) : (
          <h1 className="border border-border rounded-md text-sm w-[100px] px-[5px] text-red-800">
            not Accepted
          </h1>
        )}
      </>

      <div className="ml-auto font-medium flex flex-row gap-4">
        <div className="flex justify-between items-center w-full text-sm">
          <span className="text-muted-foreground ml-2">{collab.role}</span>
        </div>
        {isSpaceOwner && (
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={() => handleDelete(workspaceId, collab.id)}
          >
            <Trash size={17} />
          </button>
        )}
      </div>
    </div>
  );
};
export default SingleMembers;
