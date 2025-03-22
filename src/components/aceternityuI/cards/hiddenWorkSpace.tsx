
import { PopOverWorkSpace } from "@/components/workspaces";
import { cn } from "../../../lib/utils";

import {  Earth,Lock } from "lucide-react";




export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    handleHideSubmit: (id: string) => Promise<any>; 
    id:string,
    type:string
  }[];
  className?: string;
}) => {



  return (
    <div
      className={cn(
        "flex flex-row flex-wrap justify-center items-center  gap-2  ",
        className
      )}
    >
      {items.map((item) => {

        
  let color = "bg-orange-500";

  if (/^([a-c])/i.test(item.title[0].toLowerCase())) {
    color = "bg-blue-500";
  } else if (/^([d-g])/i.test(item.title[0].toLowerCase())) {
    color = "bg-green-500";
  } else if (/^([h-k])/i.test(item.title[0].toLowerCase())) {
    color = "bg-yellow-500";
  } else if (/^([l-o])/i.test(item.title[0].toLowerCase())) {
    color = "bg-red-500";
  } else if (/^([p-z])/i.test(item.title[0].toLowerCase())) {
    color = "bg-purple-500";
  }

  const truncateDesc = (desc: string) => {
    return desc.length > 30 ? desc.substring(0, 30) + "..." : desc;
  };

  const truncateTitle = (title: string) => {
    return title.length > 10 ? title.substring(0, 10) + "..." : title;
  };

        return(
          <>
<Card className="w-[360px] min-w-[260px]  h-[200px] bg-white shadow-lg rounded-xl  dark:bg-background dark:text-primary dark:border-border">
  <div className="flex flex-row items-start mb-4  ">
    <div className="flex  w-full mb-2  m-auto">
      <div   className={`w-10 h-10 ${color} rounded-sm flex items-center justify-center text-primary  mr-4 text-xl font-semibold`}
              aria-label={`${item.title.charAt(0).toUpperCase()}`}>
        {(item.title.charAt(0)).toLocaleUpperCase()}
      </div>
      <CardTitle className="text-lg font-semibold my-auto text-slate-700 dark:text-primary">{truncateTitle(item.title)}</CardTitle>
    </div> 

    
<PopOverWorkSpace handleHideSubmit={item.handleHideSubmit} id={item.id} text={"Do yo want make this visible ?"}/>

  </div>
  <CardDescription className="mt-2 dark:text-primary">{truncateDesc(item.description)}</CardDescription>
  <div className="mt-4 flex gap-2 items-center">
    <span className="">Type:</span>
    <span className="">{item.type} </span> <span>{item.type==='shared'?<Earth className="w-4"/>:<Lock className="w-4"/>} </span>
  </div>
</Card>


    </>
        )
      }
      
      
      )}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
