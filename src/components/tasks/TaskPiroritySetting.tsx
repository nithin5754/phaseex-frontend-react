import { Check, ChevronDown, Flag, FlagIcon } from "lucide-react";
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
import { useContext, useState } from "react";
import { TaskContext } from "@/app/context/task.context";
import { cn } from "@/lib/utils";

interface TaskContextType {
  task: { id: string };
  workspaceId: string;
  folderId: string;
  listId: string;
}

interface Props {
  priority: "high" | "medium" | "low";
  permission: boolean;
}

interface PriorityChangeEvent {
  priority: string;
}

type PriorityStyles = {
  [key in "high" | "medium" | "low"]: {
    text: string;
  };
};

const PriorityTaskSetting = ({ priority, permission }: Props) => {
  const { task, workspaceId, folderId, listId } = useContext(
    TaskContext
  ) as TaskContextType;
  const [onUpdatePriorityTask] = useOnUpdatePriorityTaskMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const priorityStyles: PriorityStyles = {
    high: {
      text: "text-red-500",
    },
    medium: {
      text: "text-blue-500",
    },
    low: {
      text: "text-yellow-500",
    },
  };

  const handleChange = async ({ priority }: PriorityChangeEvent) => {
    setIsLoading(true);
    try {
      const data: SendPriorityTaskType = {
        folderId,
        workspaceId,
        priority,
        listId,
        taskId: task.id,
      };
      const response = await onUpdatePriorityTask(data).unwrap();
      if (!response) {
        toast({
          title: "Error updating priority",
          description: "Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Priority updated",
          description: `Task priority set to ${priority}.`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error updating priority",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild disabled={!permission || isLoading}>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-[130px] justify-between font-medium",
            priorityStyles[priority]?.text,
            (!permission || isLoading) && "opacity-50 cursor-not-allowed"
          )}
          aria-label={`Set task priority, current: ${priority}`}
        >
          <div className="flex items-center gap-2">
            <FlagIcon  />
            <span className="capitalize">{priority}</span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4",
              !permission || isLoading ? "opacity-50" : "opacity-70"
            )}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[150px] bg-transparent" align="start">
        <DropdownMenuLabel className="text-xs font-semibold text-gray-600 dark:text-gray-400 px-2">
          Set Priority
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        <DropdownMenuRadioGroup
          value={priority}
          onValueChange={(value: string) => handleChange({ priority: value })}
        >
          {(["high", "medium", "low"] as const).map((level) => (
            <DropdownMenuRadioItem
              key={level}
              value={level}
              disabled={isLoading}
              className={cn(
                "flex items-center gap-2 text-sm py-1.5 px-2",
                priorityStyles[level].text,
                "bg-transparent",
                isLoading && "opacity-50 cursor-not-allowed"
              )}
              aria-label={`Set priority to ${level}`}
            >
              <FlagIcon  />
              <span className="capitalize">{level}</span>
              {priority === level && (
                <Check className="ml-auto h-4 w-4 opacity-80" />
              )}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PriorityTaskSetting;
