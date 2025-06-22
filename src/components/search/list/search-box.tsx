import { User, Plus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { FC, useContext, useEffect, useState } from "react";
import { ReceiveCollaboratorType } from "@/app/redux/api/spaceApi";
import {
  SendAddCollabListType,
  useOnAddManagerViewerListMutation,
} from "@/app/redux/api/listapi";
import { ListContext } from "@/app/context/list.context";
import { Button } from "@/components/ui/button";

interface ISearchBoxProps {
  getAllMembers?: ReceiveCollaboratorType[];
  type?: "search" | "view";
}

const Searchbox: FC<ISearchBoxProps> = ({ getAllMembers }) => {
  const [developers, setDevelopers] = useState<ReceiveCollaboratorType[]>([]);

  const [isManager, setManager] = useState<boolean>(false);

  const { list } = useContext(ListContext);

  const [onAddManagerViewerList] = useOnAddManagerViewerListMutation();

  useEffect(() => {
    if (!getAllMembers || !list) return;

    const isNotAlreadyAssigned = (memberId: string) =>
      !list.list_collaborators.some((collab) => collab.assignee === memberId);

    const isManagerAssigned = list.list_collaborators.some(
      (collab) => collab.role === "manager"
    );

    setManager(isManagerAssigned);

    setDevelopers(
      getAllMembers.filter(
        (m) =>
          m.role === "developer" && m.verified && isNotAlreadyAssigned(m.id)
      )
    );
  }, [getAllMembers, list, onAddManagerViewerList]);

  const handleAddCollaborator = async (data: SendAddCollabListType) => {
    try {
      await onAddManagerViewerList(data).unwrap();
    } catch (error) {
      console.error("Error adding collaborator:", error);
    }
  };

  const CollaboratorItem: FC<{
    name: string;
    role: string;
    showButton?: boolean;
    onAddManager?: () => void;
  }> = ({ name, role, showButton, onAddManager }) => (
    <CommandItem className="flex flex-col items-start gap-2 border border-border rounded-md p-3 mt-2 hover:bg-muted transition-colors">
      <div className="flex items-center w-full gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="ml-auto text-xs text-muted-foreground">{role}</span>
      </div>

      {showButton && !isManager && (
        <div className="flex gap-2 self-end">
          <Button
            onClick={onAddManager}
            className="h-7 px-3 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Manager
          </Button>
        </div>
      )}
    </CommandItem>
  );

  return (
    <Command className="rounded-xl bg-background shadow-lg text-foreground w-full max-w-md mx-auto">

        <div className="px-3 py-2">
          <CommandInput
            placeholder="Search users..."
            className="w-full text-sm placeholder:text-muted-foreground"
          />
        </div>
      

      <CommandList className="py-2">
        <CommandEmpty className="px-4 py-2 text-sm text-muted-foreground">
          No results found.
        </CommandEmpty>

        <CommandGroup heading="List Collaborators" className="px-4">
          {list?.list_collaborators.length ? (
            list.list_collaborators.map((collab, i) => (
              <CollaboratorItem
                key={i}
                name={collab.assignee_name ?? "Unknown"}
                role={collab.role}
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground px-4">
              No collaborators added yet.
            </p>
          )}
        </CommandGroup>

        <CommandSeparator className="my-2" />

        <CommandGroup heading="Developers" className="px-4">
          {developers.length ? (
            developers.map((m, i) => (
              <CollaboratorItem
                key={i}
                name={m.assignee}
                role={m.role}
                showButton
                onAddManager={() =>
                  handleAddCollaborator({
                    folderId: list.folderId,
                    listId: list.id,
                    workspaceId: list.workspaceId,
                    memberId: m.id,
                    role: "manager",
                  })
                }
              />
            ))
          ) : (
            <p className="text-sm text-muted-foreground px-4">
              No managers available.
            </p>
          )}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default Searchbox;
