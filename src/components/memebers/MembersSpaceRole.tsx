import {
  ReceiveCollaboratorType,
  SpaceCollabSendType,
  SpaceRole,
  useUpdateCollaboratorRoleMutation,
} from "@/app/redux/api/spaceApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";
import { toast } from "../ui/use-toast";

interface Props {
  workspaceId: string;

  collab: ReceiveCollaboratorType;
  isSOwner: boolean;
}

const MembersSpaceRole = ({ workspaceId, collab, isSOwner }: Props) => {
  const [updateCollaboratorRole] = useUpdateCollaboratorRoleMutation();

  const handleChange = async (spaceRole: SpaceRole) => {
    if (["developer", "manager", "viewer"].includes(spaceRole as SpaceRole)) {
      let data: SpaceCollabSendType & { role: SpaceRole } = {
        workspaceId,
        collaboratorId: collab.id,
        role: spaceRole,
      };
      if (data) {
        const response = await updateCollaboratorRole(data).unwrap();
        if (!response) {
          toast({
            title: "error in updating",
            variant: "destructive",
          });
        }
      }
    }
  };

  return (
    <div className="flex gap-2 ">
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={!collab.verified || !isSOwner}>
          <Button
            variant="outline"
            className="border-none dark:bg-background focus:border-transparent    dark:border-none dark:text-primary w-[100px]"
          >
            {collab.role}{" "}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0  opacity-50 " />{" "}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ">
          <DropdownMenuLabel>set priority</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={collab.role}
            onValueChange={(value) => handleChange(value as SpaceRole)}
          >
            <DropdownMenuRadioItem value="developer">
              developer
            </DropdownMenuRadioItem>

            <DropdownMenuRadioItem value="manager">
              manager
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="viewer">viewer</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default MembersSpaceRole;
