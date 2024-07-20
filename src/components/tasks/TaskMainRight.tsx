import { ResponseTaskType } from "@/features/types";
import ActivityArea from "../activity/ActivtityArea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Attachment } from "../attachment/index";
import { Activity, Pin } from "lucide-react";





interface Props {
  singleTask: ResponseTaskType | null;
}

const TaskMainRight = ({ singleTask }: Props) => {





  return (



    <Tabs defaultValue="attachment" className="w-full ">
  <TabsList className="flex">
    <TabsTrigger value="attachment" className="flex-1" ><Pin size={16} className="mr-4"/> Attachment</TabsTrigger>
    <TabsTrigger value="activity" className="flex-1"><Activity size={16} className="mr-4"/> Activity</TabsTrigger>
  </TabsList>
  <TabsContent value="attachment"><Attachment/></TabsContent>
  <TabsContent value="activity"><ActivityArea/></TabsContent>
</Tabs>


  );
};
export default TaskMainRight;
