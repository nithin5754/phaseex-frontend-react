import { Link, Notebook, Pin, Turtle } from "lucide-react"
import { Button } from "../ui/button"
import { useDispatch } from "react-redux"
import { setOpenDescTask } from "@/app/redux/slice/taskSlice"



 const TaskSelectionButton = () => {
  const dispatch=useDispatch()
   return (
    <div className="flex p-4 justify-center items-center gap-4 bg-white  border-gray-200 rounded-lg h-[100px] dark:bg-background  dark:text-primaryr">
      <Button onClick={()=>dispatch(setOpenDescTask(true))}><Notebook/> description</Button>
      <Button><Pin/> attachment</Button>
      <Button><Link/> Link</Button>
     </div>
   )
 }
 export default TaskSelectionButton