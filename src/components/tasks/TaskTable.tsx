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
import { TaskContext } from "@/app/context/task.context";
import { Fragment } from "react/jsx-runtime";
import { useGetAllCollabInSpaceQuery } from "@/app/redux/api/spaceApi";

import { ListsContext } from "@/app/context/lists.context";
import { useContext } from "react";

interface Props {
  toggle: "table-view" | "folder-view";

}

const TaskTable = ({ toggle }: Props) => {
  const { workspaceId, folderId, listId, lists } = useContext(ListsContext);
  const { data: getAllTask } = useGetAllTaskQuery({
    workspaceId,
    folderId,
    listId,
  });

  const { data: getAllMembers } = useGetAllCollabInSpaceQuery(workspaceId!, {
    skip: !workspaceId,
  });

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
                      <Fragment key={task.id}>
                        <Link
                          key={task.id}
                          to={`/space/${workspaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}
                        >
                          <div className="bg-white w-full md:w-[200px] border rounded-md h-[40px] overflow-hidden flex items-center justify-between px-4 py-1 mx-auto mb-2 dark:bg-secondary dark:border-border dark:text-primary ">
                            <span className="text-slate-400 dark:text-primary">
                              <List className="border-gray-500" />
                            </span>
                            <h1 className="font-sfpro text-slate-600 text-center dark:text-primary capitalize ">
                              {task.task_title}
                            </h1>
                          </div>
                        </Link>
                      </Fragment>
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
                  <TableRow className="dark:border border-r-0 border-l-0 dark:border-border hover:bg-transparent">
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
                <TableBody className="dark:border dark:border-border hover:bg-transparent">
                  {getAllTask &&
                    getAllTask.length > 0 &&
                    getAllTask.map((task) => {
                      return (
                        <Fragment key={task.id}>
                          <TaskContext.Provider
                            value={{
                              folderId,
                              listId,
                              workspaceId: workspaceId,
                              taskId: task.id,
                              task,

                              spaceAllMembers: getAllMembers
                                ? getAllMembers
                                : [],
                              listCollaborators:
                                lists && lists.list_collaborators.length > 0
                                  ? lists.list_collaborators
                                  : [],
                            }}
                          >
                            <SingleTask />
                          </TaskContext.Provider>
                        </Fragment>
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
