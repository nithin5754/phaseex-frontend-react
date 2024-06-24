import { ResponseTaskType } from "@/features/types";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable"
import { TaskMainLeft,TaskMainRight } from "./index";

interface Props {

  singleTask:ResponseTaskType|null
  }
const TaskMainSection = ({singleTask}:Props) => {
  return (
    <ResizablePanelGroup
    direction="horizontal"
    className="   rounded-lg border dark:border-border min-h-[200px]"
  >
   <ResizablePanel defaultSize={65} minSize={35} maxSize={75} >
    <div className="flex flex-col gap-5  p-6 m-auto font-sfpro ">

  <TaskMainLeft singleTask={singleTask} />

</div> 
    </ResizablePanel>
    <ResizableHandle style={{ backgroundColor: 'transparent' }} />
    <ResizablePanel className=" p-4 ">
<TaskMainRight singleTask={singleTask}/>

    </ResizablePanel>
  </ResizablePanelGroup>
  )
}
export default TaskMainSection