import { Dna } from "lucide-react"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"



 const ReassignTodo = () => {
   return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
        <Dna size={18}/>
        </TooltipTrigger>
        <TooltipContent className="dark:border-border">
          <p className="font-sfpro">re-assign</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
   )
 }
 export default ReassignTodo