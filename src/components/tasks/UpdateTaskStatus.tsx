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
import { Circle } from "lucide-react";
import { useOnUpdateStatusTaskMutation } from "@/app/redux/api/taskapi";
import { useParams } from "react-router-dom";
import { SendStatusTaskType } from "@/features/types/taskType";
import { toast } from "../ui/use-toast";

interface Props {
  taskId: string;
  status: string;
}
interface StatusEvents {
  status: string;
}

const UpdateTaskStatus = ({ taskId, status }: Props) => {
  const { id, folderId, listId } = useParams();

  if (!status || !id || !folderId || !listId) {
    return <h1>loading...</h1>;
  }

  const [onUpdateStatusTask] = useOnUpdateStatusTaskMutation();

  const handleChange = async ({ status }: StatusEvents) => {
    let sendStatusData: SendStatusTaskType = {
      status: status,
      workspaceId: id,
      folderId: folderId,
      taskId: taskId,
      listId: listId,
    };
    if (sendStatusData) {
      const response = await onUpdateStatusTask(sendStatusData).unwrap();
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
      <DropdownMenuTrigger asChild>
        <Button className="border-none dark:border-none" variant="outline">
          <Circle className="w-4  flex m-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>change status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status}
          onValueChange={(value) => handleChange({ status: value })}
        >
          <DropdownMenuRadioItem value="to-do">To-do</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="in progress">
            in progress
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="complete">
            complete
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UpdateTaskStatus;
