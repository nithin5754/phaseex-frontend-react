import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import { toast } from "../ui/use-toast";
import { useOnUpdatePriorityTaskMutation } from "@/app/redux/api/taskapi";
import { SendPriorityTaskType } from "@/types/taskType";


import { useContext } from "react";
import { TaskContext } from "@/app/context/task.context";

interface Props {
  priority: string;
  permission: boolean;
}

interface PriorityChangeEvent {
  priority: string;
}

const PriorityTaskSetting = ({ priority, permission }: Props) => {
  const { task, workspaceId, folderId, listId } = useContext(TaskContext);
  const [onUpdatePriorityTask] = useOnUpdatePriorityTaskMutation();


  const handleChange = async ({ priority }: PriorityChangeEvent) => {
    let data: SendPriorityTaskType = {
      folderId: folderId,
      workspaceId: workspaceId,
      priority: priority,
      listId: listId,
      taskId: task.id,
    };
    if (data) {
      const response = await onUpdatePriorityTask(data).unwrap();
      if (!response) {
        toast({
          title: "error in updating",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={permission ? false : true}>
        <Button
       
      
          variant="outline"
          className="border-none dark:bg-background hover:bg-transparent  dark:border-none dark:text-primary w-[100px]"
        >
          {priority}{" "}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0  opacity-50 " />{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>set priority</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={priority}
          onValueChange={(value) => handleChange({ priority: value })}
        >
          <DropdownMenuRadioItem value="high">high</DropdownMenuRadioItem>

          <DropdownMenuRadioItem value="medium">medium</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="low">low</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default PriorityTaskSetting;
