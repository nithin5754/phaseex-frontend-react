import { Dna } from "lucide-react"


import useAuth from "@/hooks/useAuth"
import { ReassignTodoModal } from "../modal/reassign-modal"
import { TodoType } from "@/types/TodoType";


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