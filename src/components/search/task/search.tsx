import { Plus, User } from "lucide-react";

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
import { TaskContext } from "@/app/context/task.context";
import { Button } from "@/components/ui/button";
import {
  SendAddCollabTaskType,
  useAddCollabToTaskMutation,
} from "@/app/redux/api/taskapi";
import { ReceiveCollaboratorType } from "@/app/redux/api/spaceApi";
import { toast } from "@/components/ui/use-toast";

export function TaskAddDevelopers() {
  const { task, spaceAllMembers, listCollaborators } = useContext(TaskContext);
  const [developers, setDevelopers] = useState<ReceiveCollaboratorType[]>([]);
  const [addCollabToTask] = useAddCollabToTaskMutation();
  useEffect(() => {
    const isNotAlreadyAssigned = (memberId: string) =>
      !task.task_collaborators.some((collab) => collab.assignee === memberId);

    const isNotManagerInList = (memberId: string) =>
      !listCollaborators.some(
        (collab) => collab.assignee === memberId && collab.role === "manager"
      );

    setDevelopers(
      spaceAllMembers.filter(
        (m) =>
          m.role === "developer" &&
          m.verified &&
          isNotAlreadyAssigned(m.id) &&
          isNotManagerInList(m.id)
      )
    );
  }, [spaceAllMembers, task, listCollaborators]);

  const handleAddCollaborator = async (data: SendAddCollabTaskType) => {
    const isManagerInList = listCollaborators.some(
      (c) => c.assignee === data.memberId && c.role === "manager"
    );

    if (isManagerInList) {
      toast({
        title:
          "This user is already a manager in the list and cannot be added as a developer.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addCollabToTask(data).unwrap();
    } catch (error) {
      console.error("Error adding collaborator:", error);
    }
  };

  const CollaboratorItem: FC<{
    name: string;
    role: string;
    showButton?: boolean;
    onAddDeveloper?: () => void;
  }> = ({ name, role, showButton, onAddDeveloper }) => (
    <CommandItem className="flex flex-col items-start gap-2 border border-border rounded-md p-3 mt-2 hover:bg-muted transition-colors">
      <div className="flex items-center w-full gap-2">
        <User className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="ml-auto text-xs text-muted-foreground">{role}</span>
      </div>

      {showButton && role === "developer" && (
        <div className="flex gap-2 self-end">
          <Button
            onClick={onAddDeveloper}
            className="h-7 px-3 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-sm"
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add Developer
          </Button>
        </div>
      )}
    </CommandItem>
  );

  return (
    <Command className="rounded-xl bg-background shadow-lg text-foreground w-full max-w-md mx-auto">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Members">
       {task.task_collaborators.map((collaborator) => (
  <CollaboratorItem
    key={collaborator.assignee}
    name={collaborator.assignee_name as string}
    role={collaborator.role}
    showButton={false}
    onAddDeveloper={() =>
      handleAddCollaborator({
        memberId: collaborator.assignee,
        listId: task.listId,
        folderId: task.folderId,
        taskId: task.id,
        workspaceId: task.workspaceId,
      })
    }
  />
))}

        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Developers">
          {developers &&
            developers.map((collaborator, i) => (
              <>
                <CollaboratorItem
                  key={i || collaborator.assignee}
                  name={collaborator.assignee}
                  role={collaborator.role}
                  showButton
                  onAddDeveloper={() =>
                    handleAddCollaborator({
                      memberId: collaborator.id,
                      listId: task.listId,
                      folderId: task.folderId,
                      taskId: task.id,
                      workspaceId: task.workspaceId,
                    })
                  }
                />
              </>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
