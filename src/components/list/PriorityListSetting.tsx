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

import {
  SendPriorityListType,
  useOnUpdatePriorityListMutation,
} from "@/app/redux/api/listapi";
import { toast } from "../ui/use-toast";
import UseSpaceRoles from "@/hooks/useSpaceRoles";
import { useContext } from "react";
import { ListContext } from "@/app/context/list.context";

interface Props {
  priority: string;
}

interface PriorityChangeEvent {
  priority: string;
}

const PriorityListSetting = ({ priority }: Props) => {
  const { list, folderId, workspaceId } = useContext(ListContext);

  const isSpaceOwner = UseSpaceRoles({ workspaceId });

  const [onUpdatePriorityList] = useOnUpdatePriorityListMutation();

  const handleChange = async ({ priority }: PriorityChangeEvent) => {
    let data: SendPriorityListType = {
      folderId: folderId,
      workspaceId: workspaceId,
      priority: priority,
      listId: list.id,
    };
    if (data) {
      const response = await onUpdatePriorityList(data).unwrap();
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
      <DropdownMenuTrigger asChild disabled={isSpaceOwner ? false : true}>
        <Button
          variant="outline"
          className="border-none dark:bg-background  dark:border-none dark:text-primary w-[100px]"
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
export default PriorityListSetting;
