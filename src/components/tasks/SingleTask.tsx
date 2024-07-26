import { Link } from "react-router-dom"
import { TableCell, TableRow } from "../ui/table"
import UpdateTaskStatus from "./UpdateTaskStatus"
import { TaskCollabModal } from "../modal/add-task-collaborators"
import { AnimatedTaskProfile } from "./AnimatedTaskProfile"
import { Check, Circle, UserPlus } from "lucide-react"
import PriorityTaskSetting from "./TaskPiroritySetting"
import { ResponseTaskType } from "@/types"
import UseSpaceRoles from "@/hooks/useSpaceRoles"
import UseListRole from "@/hooks/UseListRole"
import { Button } from "../ui/button"
import useTaskAuth from "@/hooks/useTaskAuth"


interface Props {
  task:ResponseTaskType
  spaceId:string;
  folderId:string;
  listId:string;

}

const truncateDesc = (desc: string) => {
  return desc.length > 10 ? desc.substring(0, 10) + "..." : desc;
};

  const SingleTask = ({task,spaceId,folderId,listId}:Props) => {

    const isSpaceOwner=UseSpaceRoles({workspaceId:spaceId})

    const isListRoles=UseListRole({workspaceId:spaceId,folderId,listId})

    const isUserInTask=useTaskAuth({task})


 


    return (
      <TableRow key={task.id} className="dark:border dark:border-border">
      <TableCell  className="font-medium text-center  m-auto">
        <>
        {
        ( isSpaceOwner||(isListRoles.status&&isListRoles.role==='listManager'))?(
            <>
            <UpdateTaskStatus taskId={task.id} status={task.status_task}/>

            </>
          ):(
            <Button className="border-none dark:border-none" variant="outline"><Circle className="w-4  flex m-auto"/></Button>
          )
        }
        
        </>

      </TableCell>
 <>
 {
  ( isSpaceOwner||(isListRoles.role==='listManager')||isUserInTask)?(
    <Link to={`/space/${spaceId}/folders/${folderId}/lists/${listId}/tasks/${task.id}`}>
    <TableCell className="font-medium text-center flex my-auto items-center">{task.task_title}</TableCell>
</Link>
  ):(
    <TableCell className="font-medium text-center flex my-auto center">{task.task_title}</TableCell>
  )
 }
 </>
  
   <TableCell className="text-center  m-auto">{truncateDesc(task.task_description)}</TableCell>
   <TableCell className="text-center m-auto">
   <div className="flex items-center justify-center m-auto gap-2">
    <>
    {
        ( isSpaceOwner||(isListRoles.status&&isListRoles.role==='listManager'))&&(
          <TaskCollabModal icon={UserPlus} spaceId={spaceId} folderId={folderId} taskId={task.id} listId={listId}/>

        )
    }
    
    </>
   <AnimatedTaskProfile workspaceId={spaceId} folderId={folderId} listId={listId} taskId={task.id}/>
   </div>
   </TableCell>
   <TableCell className="w-[160px] text-center  m-auto">  {task.status_task === 'complete' ? (
<div className="flex  ">
<Check className="w-[16px] text-green-800 " style={{ strokeWidth: 6 }}/>
{task.status_task} 
</div>
) : (
task.status_task
)}</TableCell>
   <TableCell className=" text-center  m-auto">
     <PriorityTaskSetting priority={task.priority_task} workspaceId={spaceId} folderId={folderId} taskId={task.id} id={listId}/>
   </TableCell>

 </TableRow>
    )
  }
  export default SingleTask