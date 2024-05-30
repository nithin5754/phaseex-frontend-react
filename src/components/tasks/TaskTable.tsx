import {  Circle, CirclePlus } from "lucide-react"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"

import {  OpenModal as CreateTaskModal} from "../../components/modal/Task-create-modal";
import { useGetAllTaskQuery } from "@/app/redux/api/taskapi";
import PriorityTaskSetting from "./TaskPiroritySetting";
import moment from "moment";
import { UpdateDateTask } from "./index";
import { useGetSingleListQuery } from "@/app/redux/api/listapi";



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
          <TableHead className="w-[350px]" >task name</TableHead>
          <TableHead >assignee</TableHead>
          <TableHead >due date</TableHead>
          <TableHead >due</TableHead>
   
          <TableHead>status</TableHead>
          <TableHead >priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {getAllTask&&getAllTask.length>0&&getAllTask.map((task) =>{
            const due_date = moment(task.task_due_date, 'MMMM D, YYYY - h:mm a').toDate();
          return(
            <TableRow key={task.id}>
                 <TableCell className="font-medium"><Circle className="w-4  flex m-auto"/></TableCell>
              <TableCell className="font-medium">{task.task_title}</TableCell>
              <TableCell>nill</TableCell>
              <TableCell className="flex"><h4>{task.task_due_date}</h4>
              <UpdateDateTask start_date={task.task_start_date} due_date={due_date} folderId={folderId} workspaceId={spaceId} taskId={task.id} listId={listId} />
              </TableCell>
              <TableCell className="font-medium">
                {task.task_due}
              </TableCell>
              <TableCell>{task.status_task}</TableCell>
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