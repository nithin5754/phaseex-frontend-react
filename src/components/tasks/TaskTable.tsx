import { CheckCircle, ClipboardList, FileText, Star, User } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useGetAllTaskQuery } from "@/app/redux/api/taskapi";

import { SingleTask } from "./index";

interface Props {
  spaceId: string;
  folderId: string;
  listId: string;
}

const TaskTable = ({ folderId, spaceId, listId }: Props) => {
  const { data: getAllTask } = useGetAllTaskQuery(
    { workspaceId: spaceId, folderId, listId },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <Table className="">
      <TableCaption>divide the task to developers</TableCaption>
      <TableHeader className="">
        <TableRow className="dark:border border-r-0 border-l-0 dark:border-border  ">
          <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"></TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider  space-x-2">
            <div className="flex items-start justify-start gap-2">
              <FileText className="w-4 h-4" />
              <span>name</span>
            </div>
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider  space-x-2">
            <div className="flex items-center justify-center gap-2">
              <ClipboardList className="w-4 h-4" />

              <span>description</span>
            </div>
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider  space-x-2">
            <div className="flex items-start justify-start gap-2">
              <User className="w-4 h-4" />
              <span>assignee</span>
            </div>
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider  space-x-2">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>status</span>
            </div>
          </TableHead>
          <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider  space-x-2">
            <div className="flex items-center justify-center gap-2">
              <Star className="w-4 h-4" />
              <span>priority</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="dark:border dark:border-border ">
        {getAllTask &&
          getAllTask.length > 0 &&
          getAllTask.map((task) => {
            return (
              <>
                <SingleTask
                  task={task}
                  spaceId={spaceId}
                  folderId={folderId}
                  listId={listId}
                />
              </>
            );
          })}
      </TableBody>
    </Table>
  );
};
export default TaskTable;
