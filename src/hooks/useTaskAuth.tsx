import { ResponseTaskType } from "@/types"
import useAuth from "./useAuth"

interface Props{
  task:ResponseTaskType
}

 const useTaskAuth = ({task}:Props) => {

  const userId=useAuth()

    let isTaskRole=false
    task.task_collaborators.forEach((collab)=>{
      if(userId?.userId===collab.assigneeId){
             isTaskRole=true
      }
    })

  
   return isTaskRole
 }
 export default useTaskAuth