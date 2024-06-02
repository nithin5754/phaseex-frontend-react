import {  Check, Circle, CirclePlus, Square } from "lucide-react"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"

import {  OpenModal as CreateTaskModal} from "../../components/modal/Task-create-modal";
import { useGetAllTaskQuery } from "@/app/redux/api/taskapi";
import PriorityTaskSetting from "./TaskPiroritySetting";
import UpdateTaskStatus from "./UpdateTaskStatus";




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



  console.log(getAllTask,"all task");
  

  return (
    <Table >
      <TableCaption>divide the task to developers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead ></TableHead>
          <TableHead >name</TableHead>
          <TableHead className="" >description</TableHead>
          <TableHead className="w-[300px] items-center text-center">assignee</TableHead>
   
          <TableHead>status</TableHead>
          <TableHead >priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {getAllTask&&getAllTask.length>0&&getAllTask.map((task) =>{
          return(
            <TableRow key={task.id}>
                 <TableCell className="font-medium">
                  <UpdateTaskStatus taskId={task.id} status={task.status_task}/>
                 </TableCell>
              <TableCell className="font-medium">{task.task_title}</TableCell>
              <TableCell>{task.task_description}</TableCell>
              <TableCell className="text-center">nill</TableCell>
              <TableCell className="w-[160px] ">  {task.status_task === 'complete' ? (
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