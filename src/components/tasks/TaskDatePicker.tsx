


import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"


import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useAppDispatch } from "@/app/redux/api/store"

import { setDateTaskPicker } from "@/app/redux/slice/taskSlice"


export function TaskDatePickerRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(), 
    to: addDays(new Date(), 20),
  });
  

  const dispatch=useAppDispatch()

  
 
  
  React.useEffect(()=>{
   if(date&&date.from&&date.to){
    console.log(date.from,"hello hello");
    
    const startTask = format(date.from, "MMMM d, yyyy - h:mm a");
    const dueTask = format(date.to, "MMMM d, yyyy - h:mm a");

    if(startTask&&dueTask){
      dispatch(setDateTaskPicker({startTask,dueTask}))
    }
   }

  },[dispatch,date?.from,date?.to,date])
 

  
  

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
