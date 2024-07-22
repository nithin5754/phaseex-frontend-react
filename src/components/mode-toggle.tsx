import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";
import { Skeleton } from "./ui/skeleton";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div className="">
      <h1 className="dark:text-primary mb-2">Theme Setting</h1>
      <div className="flex flex-row gap-4">
        <Button
          onClick={() => setTheme("light")}
          className="bg-white hover:border-2 border-border  border-2 hover:bg-white h-[60px]"
        >
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full  bg-slate-400" />
            <div className="space-y-2 ">
              <Skeleton className="h-2 w-[50px] bg-slate-400" />
              <Skeleton className="h-2 w-[30px] bg-slate-400" />
            </div>
          </div>
        </Button>
        <Button
          onClick={() => setTheme("dark")}
          className="bg-slate-700 hover:border-2 border-border h-[60px] border hover:bg-slate-700"
        >
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-2 w-[50px]" />
              <Skeleton className="h-2 w-[30px]" />
            </div>
          </div>
        </Button>
        <Button
          onClick={() => setTheme("system")}
          className="bg-slate-700 hover:border-2 border-border h-[60px] border hover:bg-slate-700 w-[140px]"
        >
          System
        </Button>
      </div>
    </div>
  );
}
