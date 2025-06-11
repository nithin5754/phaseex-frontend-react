import { CheckCircle, FileText, List, Star, User } from "lucide-react";

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

import { Link } from "react-router-dom";

interface Props {
  spaceId: string;
  folderId: string;
  listId: string;
  toggle:"table-view" | "folder-view"
}

const TaskTable = ({ folderId, spaceId, listId,toggle }: Props) => {




  const { data: getAllTask } = useGetAllTaskQuery(
    { workspaceId: spaceId, folderId, listId },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      {getAllTask && getAllTask.length > 0 && (
        <>
          {toggle === "folder-view" ? (
            <>
              <div className=" gap-2   dark:border border-r-0 border-l-0 dark:border-border ">
            <div className="m-2 flex flex-wrap w-full gap-4">
                  {getAllTask.map((task) => {
                  return (
                    <Link
                      key={task.id}
                      to={`/space/${spaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
                    >
                      <div className="bg-white w-full md:w-[200px] border rounded-md h-[40px] overflow-hidden flex items-center justify-between px-4 py-1 mx-auto mb-2 dark:bg-secondary dark:border-border dark:text-primary dark:hover:bg-card">
                        <span className="text-slate-400 dark:text-primary">
                          <List className="border-gray-500" />
                        </span>
                        <h1 className="font-sfpro text-slate-600 text-center dark:text-primary capitalize ">
                          {task.task_title}
                        </h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
              </div>
            </>
          ) : (
            <>
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
                    <TableHead className="pr-6 py-3 text-left text-xs font-medium  uppercase tracking-wider  space-x-2">
                      <div className="flex items-center justify-center gap-2">
                        <Star className="w-4 h-4" />
                        <span>View More</span>
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
            </>
          )}
        </>
      )}
    </>
  );
};
export default TaskTable;
