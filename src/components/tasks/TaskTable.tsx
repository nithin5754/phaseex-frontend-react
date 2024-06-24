import {  Check, CheckCircle, Circle, CirclePlus, ClipboardList, FileText, Square, Star, User, UserPlus } from "lucide-react"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"

import {  OpenModal as CreateTaskModal} from "../../components/modal/Task-create-modal";
import { useGetAllTaskQuery } from "@/app/redux/api/taskapi";
import PriorityTaskSetting from "./TaskPiroritySetting";
import UpdateTaskStatus from "./UpdateTaskStatus";
import { Link } from "react-router-dom";
import { TaskCollabModal } from "../modal/add-task-collaborators";
import { AnimatedTaskProfile } from "./index";






interface Props {
  spaceId:string;
  folderId:string;
  listId:string;



}



const TaskTable = ({folderId,spaceId,listId}:Props) => {
  const { data: getAllTask, isLoading: listLoading } = useGetAllTaskQuery(
    { workspaceId:spaceId, folderId, listId },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );








  const truncateDesc = (desc: string) => {
    return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
  };
  

  return (
    <Table >
      <TableCaption>divide the task to developers</TableCaption>
      <TableHeader>
      <TableRow className="">
      <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
      </TableHead>
      <TableHead className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider  space-x-2">
      <div className="flex items-center justify-center gap-2">

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
      <TableBody>
        {getAllTask&&getAllTask.length>0&&getAllTask.map((task) =>{
          return(
            <TableRow key={task.id}>
                 <TableCell className="font-medium text-center">
                  <UpdateTaskStatus taskId={task.id} status={task.status_task}/>
                 </TableCell>
                 <Link to={`/space/${spaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}>
                 <TableCell className="font-medium text-center">{task.task_title}</TableCell>
     </Link>
             
              <TableCell className="text-center">{truncateDesc(task.task_description)}</TableCell>
              <TableCell className="text-center m-auto">
              <div className="flex items-start justify-start m-auto gap-4">
                  <TaskCollabModal icon={UserPlus} spaceId={spaceId} folderId={folderId} taskId={task.id} listId={listId}/>
         
    
              <AnimatedTaskProfile workspaceId={spaceId} folderId={folderId} listId={listId} taskId={task.id}/>
              </div>
              </TableCell>
              <TableCell className="w-[160px] text-center">  {task.status_task === 'complete' ? (
      <div className="flex  ">
        <Check className="w-[16px] text-green-800 " style={{ strokeWidth: 6 }}/>
        {task.status_task} 
      </div>
    ) : (
      task.status_task
    )}</TableCell>
              <TableCell>
                <PriorityTaskSetting priority={task.priority_task} workspaceId={spaceId} folderId={folderId} taskId={task.id} id={listId}/>
              </TableCell>
        
            </TableRow>
          )
        } )}
      </TableBody>

      
       <CreateTaskModal title={"ADD TASK"} spaceId={spaceId} folderId={folderId} icon={CirclePlus} listId={listId}/>
        
       

    </Table>
  )
}
export default TaskTable