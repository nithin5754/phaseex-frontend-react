import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { FC, ReactElement, useState } from "react";

import { Project } from "../review.type";
import { Button } from "@/components/ui/button";

interface Props {
  project: Project;
}

const statusStyles = {
  "In Review": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Approved: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const statusOptions = ["Pending", "Rejected", "Approved"];

const ProjectFeatureStatus: FC<Props> = ({ project }): ReactElement => {
  const [currentStatus, setCurrentStatus] = useState(project.status);

  const handleStatusChange = (
    newStatus: "Approved" | "Rejected" | "Pending" | "Completed"
  ) => {
    setCurrentStatus(newStatus);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex items-center gap-2 px-3 py-1 text-sm font-semibold ${
            statusStyles[currentStatus as keyof typeof statusStyles]
          } dark:bg-background`}
        >
          {currentStatus}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`dark:bg-background rounded-lg shadow-lg`}
      >
        {statusOptions.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() =>
              handleStatusChange(
                status as "Approved" | "Rejected" | "Pending" | "Completed"
              )
            }
            className={`dark:bg-background ${
              status === currentStatus ? "font-semibold bg-blue-500/20" : ""
            }`}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProjectFeatureStatus;
