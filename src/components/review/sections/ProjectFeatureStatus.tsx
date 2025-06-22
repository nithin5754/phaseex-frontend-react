import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Clock, CheckCircle, XCircle } from "lucide-react";
import { FC, ReactElement } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  setStatus: React.Dispatch<
    React.SetStateAction<"Rejected" | "Approved" | "Pending" | "Completed">
  >;
  project_status: "Rejected" | "Approved" | "Pending" | "Completed";
}

const statusStyles: Record<
  string,
  { text: string; bg: string; border: string; icon: string }
> = {
  Approved: {
    text: "text-green-500",
    bg: "bg-green-500",
    border: "border-green-500/30",
    icon: "text-green-500",
  },
  Pending: {
    text: "text-gray-500",
    bg: "bg-gray-500",
    border: "border-gray-500/30",
    icon: "text-gray-500",
  },
  Rejected: {
    text: "text-red-500",
    bg: "bg-red-500",
    border: "border-red-500/30",
    icon: "text-red-500",
  },
};

const statusIcons: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  "In Review": Clock,
  Approved: CheckCircle,
  Pending: Clock,
  Rejected: XCircle,
};

const statusOptions = ["Rejected", "Approved"];

const ProjectFeatureStatus: FC<Props> = ({
  setStatus,
  project_status,
}): ReactElement => {
  const handleStatusChange = (
    newStatus: "Approved" | "Rejected" | "Pending"
  ) => {
    setStatus(newStatus);
  };

  const currentStyle = statusStyles[project_status] || statusStyles.Pending;
  const StatusIcon = statusIcons[project_status] || Clock;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`flex z-50 items-center gap-2 rounded-md px-3 py-1 text-sm font-medium transition-colors ${currentStyle.bg} ${currentStyle.text} ${currentStyle.border} dark:bg-background `}
          aria-label={`Current status: ${project_status}`}
        >
          <StatusIcon className={`h-4 w-4 ${currentStyle.icon}`} />
          <span>Submit : ({project_status})</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="mt-2 w-40 rounded-md border border-border bg-black/100 p-1 shadow-lg text-white z-50"
      >
        {statusOptions.map((status) => {
          const isSelected = status === project_status;
          const OptionIcon = statusIcons[status] || Clock;

          return (
            <DropdownMenuItem
              key={status}
              onClick={() =>
                handleStatusChange(status as "Approved" | "Rejected")
              }
              className={`cursor-pointer select-none rounded px-3 py-2 text-sm transition-colors flex items-center gap-2 ${
                statusStyles[status].text
              } ${
                isSelected
                  ? "bg-blue-500/20 font-semibold"
                  : "hover:bg-gray-800"
              }`}
              aria-label={`Select status: ${status}`}
            >
              <OptionIcon className={`h-4 w-4 ${statusStyles[status].icon}`} />
              {status}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectFeatureStatus;
