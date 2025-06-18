import { Check, ChevronDown, Flag } from "lucide-react";
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
import {
  SendPriorityListType,
  useOnUpdatePriorityListMutation,
} from "@/app/redux/api/listapi";
import { useContext, useState } from "react";
import { ListContext } from "@/app/context/list.context";
import { cn } from "@/lib/utils";

interface ListContextType {
  list: { id: string };
  folderId: string;
  workspaceId: string;
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
    flag: string;
  };
};

const PriorityListSetting = ({ priority, permission }: Props) => {
  const { list, folderId, workspaceId } = useContext(ListContext) as ListContextType;
  const [onUpdatePriorityList] = useOnUpdatePriorityListMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const priorityStyles: PriorityStyles = {
    high: {
      text: "text-red-500",
      flag: "text-red-500",
    },
    medium: {
      text: "text-blue-500",
      flag: "text-blue-500",
    },
    low: {
      text: "text-yellow-500",
      flag: "text-yellow-500",
    },
  };

  const handleChange = async ({ priority }: PriorityChangeEvent) => {
    setIsLoading(true);
    try {
      const data: SendPriorityListType = {
        folderId,
        workspaceId,
        priority,
        listId: list.id,
      };
      const response = await onUpdatePriorityList(data).unwrap();
      if (!response) {
        toast({
          title: "Error updating priority",
          description: "Please try again later.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Priority updated",
          description: `List priority set to ${priority}.`,
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
          aria-label={`Set list priority, current: ${priority}`}
        >
          <div className="flex items-center gap-2">
            <Flag className={cn("h-4 w-4", priorityStyles[priority]?.flag)} />
            <span className="capitalize">{priority}</span>
          </div>
          <ChevronDown
            className={cn("h-4 w-4", !permission || isLoading ? "opacity-50" : "opacity-70")}
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
              <Flag className={cn("h-4 w-4", priorityStyles[level].flag)} />
              <span className="capitalize">{level}</span>
              {priority === level && <Check className="ml-auto h-4 w-4 opacity-80" />}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PriorityListSetting;