
import useAuth from "./useAuth"

import { TodoType } from "@/types/TodoType";

interface Props {
  
  todo:TodoType


}


const UseTodoRoles = ({todo}:Props) => {
  const userId=useAuth()



let isUserExist=todo.assignee===userId?.userId








  return isUserExist
}
export default UseTodoRoles