
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { LucideIcon } from "lucide-react";
import React from "react";

interface Props {
  tipTitle:string|LucideIcon;
  tipContent:string;
  iconSize:number
}

 const ToolTipTempalte = ({tipContent,tipTitle,iconSize}:Props) => {
  const isIcon = typeof tipTitle !== "string";
   return (
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button  className="dark:bg-none dark:border-none text-primary font-thin" > {isIcon ? React.createElement(tipTitle as LucideIcon,{ size: iconSize }) : tipTitle}</button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tipContent}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>  
   )
 }
 export default ToolTipTempalte