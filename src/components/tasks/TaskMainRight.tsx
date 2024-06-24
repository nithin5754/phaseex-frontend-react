import { ResponseTaskType } from "@/features/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { useParams } from "react-router-dom"
import { useGetAllTodoTaskQuery } from "@/app/redux/api/todoapi"
import { TodoType } from "@/features/types/TodoType"
import { useEffect, useState } from "react"
import { Footer } from "react-day-picker"
import { TaskProgressTodo } from "./TaskProgressTodo"
import { Calendar, ClipboardCheck, ClipboardList, FileText, UserCheck } from "lucide-react"

interface Props {

  singleTask:ResponseTaskType|null
  }

const TaskMainRight = ({singleTask}:Props) => {

  const {id,folderId,listId,taskId}=useParams()
  const [completedTodosCount, setCompletedTodosCount] = useState(0);

  if(!id||!folderId||!listId||!taskId){
    return <h1>loading...</h1>
  }

  if(typeof id !=='string'||typeof folderId !=='string'||typeof listId !=='string'||typeof taskId !== 'string'){
return <h1>loading....</h1>
  }


const {data:getAllTodoTask}=useGetAllTodoTaskQuery( { workspaceId:id,folderId,listId,taskId },
  {
    pollingInterval:60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })


  useEffect(() => {
    const fetchCompletedTodos = async () => {
      if (getAllTodoTask) {
        const completedTodos = getAllTodoTask.filter(todo => todo.todo_status === 'completed');
        setCompletedTodosCount(completedTodos.length); 
      }
    };

    fetchCompletedTodos(); 
  }, [getAllTodoTask]);
  

  return (

<Card className="border border-border  rounded-lg shadow-md h-full flex flex-col">
  <CardHeader className="p-4 bg-background border-b border-border ">
    <CardTitle className="text-xl font-semibold">Task Details</CardTitle>
    <CardDescription className="text-sm dark:text-foreground">Here is the history of the task</CardDescription>
  </CardHeader>
  <CardContent className="p-4 flex-grow">
  <div className="space-y-4">
    <div className="flex items-center space-x-2">
      <FileText className="w-5 h-5 dark:text-foreground" />
      <p className="text-lg font-normal dark:text-primary"><span className="font-mono dark:text-primary">Task name:</span> {singleTask?.task_title}</p>
    </div>
    <div className="flex items-center space-x-2">
      <ClipboardList className="w-5 h-5 dark:text-foreground" />
      <p className="text-lg font-normal dark:text-primary"><span className="font-mono dark:text-primary">No of todos:</span> {getAllTodoTask ? getAllTodoTask.length : 0}</p>
    </div>
    <div className="flex items-center space-x-2">
      <ClipboardCheck className="w-5 h-5 dark:text-foreground" />
      <p className="text-lg font-normal dark:text-primary"><span className="font-mono dark:text-primary">No of completed todos:</span> {completedTodosCount}</p>
    </div>
    <div className="flex items-center space-x-2">
      <UserCheck className="w-5 h-5 dark:text-foreground" />
      <p className="text-lg font-normal dark:text-primary"><span className="font-mono dark:text-primary">Task status:</span> {singleTask?.status_task}</p>
    </div>
    <div className="flex items-center space-x-2">
      <Calendar className="w-5 h-5 dark:text-foreground" />
      <p className="text-sm font-normal dark:text-primary"><span className="font-mono dark:text-primary">Created At:</span> {singleTask?singleTask.updatedAt:"not mentioned"}</p>
    </div>
    <div className="flex items-center space-x-2">
      <Calendar className="w-5 h-5 dark:text-foreground" />
      <p className="text-sm font-normal dark:text-primary"><span className="font-mono dark:text-primary">Updated At:</span> {singleTask?singleTask.createdAt:"not mentioned"}</p>
    </div>
  </div>
</CardContent>

  <CardFooter className="p-4 bg-background border-t border-border flex items-center justify-center ">
    <div className="flex flex-col items-center gap-3">
      <p className="font-sfpro text-md font-semibold">Progress Bar Todo Task</p>
      <TaskProgressTodo total={getAllTodoTask ? getAllTodoTask.length : 0} completed={completedTodosCount}/>
    </div>
  </CardFooter>
</Card>






 
  )
}
export default TaskMainRight