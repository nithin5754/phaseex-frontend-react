import { useParams } from "react-router-dom";
import {ListHistory} from "./index";
import { Group, GroupIcon, Plus } from "lucide-react";
import { TaskTable } from "../tasks/index";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";








import {

  CornerDownLeft,

  Mic,
  Paperclip,

} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"


import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip"

 const SingleListFolder = () => {
  const { id, folderId ,listId } = useParams();

    if(!id||!folderId||!listId){
      return <h1>loading....</h1>
    }
   return (
 

        <ResizablePanelGroup
      direction="horizontal"
      className="   rounded-lg border dark:border-border flex flex-col w-full  mx-4 font-sfpro "
    >
     <ResizablePanel defaultSize={65} minSize={35} maxSize={75} >
      <div className="flex flex-col gap-5  p-6 m-auto font-sfpro ">
      <ListHistory workspaceId={id} folderId={folderId} listId={listId}/> 

    
 <div className="bg-white   overflow-hidden dark:bg-background dark:text-primary dark:border-border">
 <div className="px-6 py-4 border-b flex justify-between dark:border-border">
   <h2 className="text-lg font-sfpro dark:text-primary">Tasks</h2>
   <Plus className="text-slate-500 hover:text-slate-800 dark:text-primary " />
 </div>
 <div className=" py-4">
  <TaskTable spaceId={id} folderId={folderId} listId={listId} />
 </div>
</div>
</div> 
      </ResizablePanel>
      {/* <ResizableHandle/>
      <ResizablePanel>
      <div className="relative flex h-full min-h-[84vh] flex-col  bg-muted/50 p-4 lg:col-span-2">
          <Badge variant="outline" className="absolute right-3 top-3">
          Group Message <GroupIcon/>
          </Badge>
          <div className="flex-1" />
          <form
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring" x-chunk="dashboard-03-chunk-1"
          >
 
        <Label htmlFor="message" className="sr-only">
              Message
            </Label>
    
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
          <TooltipProvider>
          <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Paperclip className="size-4" />
                    <span className="sr-only">Attach file</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Attach File</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Mic className="size-4" />
                    <span className="sr-only">Use Microphone</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Use Microphone</TooltipContent>
              </Tooltip>
          </TooltipProvider>
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </div>

      </ResizablePanel> */}
    </ResizablePanelGroup>
      
  
   )
 }
 export default SingleListFolder


