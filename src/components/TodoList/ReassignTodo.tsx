import { Dna } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import useAuth from "@/hooks/useAuth"
import { ReassignTodoModal } from "../modal/reassign-modal"
import { TodoType } from "@/features/types/TodoType";
import { useGetAllTodoCollabByIdQuery } from "@/app/redux/api/todoapi";

interface Props {
  collabId:string;
  todo:TodoType
}

 const ReassignTodo = ({collabId,todo}:Props) => {

  const userId=useAuth()
   return (
 <>
    {
      collabId===userId?.userId&&(
        <>
          <ReassignTodoModal icon={Dna} todo={todo} />
        </>
      )
    }
 
 </>

   )
 }
 export default ReassignTodo