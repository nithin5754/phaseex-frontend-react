import {  CirclePlus } from "lucide-react"

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table"

import {  OpenModal as CreateTaskModal} from "../../components/modal/Task-create-modal";



interface Props {
  spaceId:string;
  folderId:string;
  listId:string

}



const TaskTable = ({folderId,spaceId,listId}:Props) => {
  


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
       
      </TableBody>

      
       <CreateTaskModal title={"ADD TASK"} spaceId={spaceId} folderId={folderId} icon={CirclePlus} listId={listId}/>
        
       

    </Table>
  )
}
export default TaskTable