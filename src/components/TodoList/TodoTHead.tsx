import { CheckCircle, Dna, FileText, Settings, User2 } from "lucide-react"
import { TableHead, TableHeader, TableRow } from "../ui/table"



const TodoTHead = () => {
  return (
    <TableHeader>
    <TableRow className="">
  <TableHead className="  "></TableHead>
  <TableHead className="  ">
  <div className="flex items-start justify-start gap-2">
     <FileText className="w-4 h-4 text-gray-600" />
     <span>todo</span>
     </div>
  </TableHead>
  <TableHead className="flex  gap-2">
  <div className="flex items-center justify-center gap-2">
    <User2 className="w-4 h-4 text-gray-600" />
    <span>comments</span>

  </div>
  </TableHead>
  <TableHead className=" ">
    <div className="flex items-start justify-start gap-2">
    <CheckCircle className="w-4 h-4 text-gray-600" />
    <span>status</span>
    </div>
  
  </TableHead>
  <TableHead className="   ">
  <div className="flex items-start justify-start gap-2">
    <Settings className="w-4 h-4 text-gray-600" />
    <span>action</span>
    </div>
  
  </TableHead>
  {/* <TableHead className="   ">

  <div className="flex items-start justify-start gap-2">
    <Dna className="w-4 h-4 text-gray-600" />
    <span>re-assign</span>
    </div>
  </TableHead> */}
</TableRow>
    </TableHeader>
  )
}
export default TodoTHead