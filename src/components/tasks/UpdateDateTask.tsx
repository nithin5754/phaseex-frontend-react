



"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarDaysIcon, Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useOnUpdateDateTaskMutation } from "@/app/redux/api/taskapi"
import { useAppDispatch } from "@/app/redux/api/store"
import { useSelector } from "react-redux"
import { selectTaskDate, setDateTaskPicker, setDateTaskPickerNull } from "@/app/redux/slice/taskSlice"
import { SendDateTaskType } from "@/features/types/taskType"
import moment from "moment"
import { toast } from "../ui/use-toast"
import { useGetSingleListQuery } from "@/app/redux/api/listapi"
import { Input } from "../ui/input"


interface Props {
  start_date:string;
  due_date: Date;
  folderId: string;
  workspaceId: string;
  taskId:string
  listId: string;
}

export function UpdateDateTask({start_date,due_date,workspaceId,folderId,listId,taskId}:Props) {
  const [date, setDate] = React.useState<Date|undefined>(due_date)
  const dispatch = useAppDispatch();
  const taskDatePicker=useSelector(selectTaskDate)
  const [onUpdateDateTask]=useOnUpdateDateTaskMutation()
  const [open, setOpen] = React.useState<boolean>(false);


  const { data: getSingleList,  } = useGetSingleListQuery(
    { workspaceId, folderId, listId },
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );

  const listStart = getSingleList?.list_start_date;
  const index = listStart&&listStart.indexOf('-'); 
  const listStartSlice = listStart&&index&&listStart.slice(0, index).trim()



  const listDue = getSingleList?.list_due_date;
  const indexDue = listDue&&listDue.indexOf('-'); 
  const listDueSlice = listDue&&indexDue&&listDue.slice(0, indexDue).trim()


  React.useEffect(() => {
    if (date&&start_date) {
    

      const dueTask= format(date, "MMMM d, yyyy - h:mm a");
 
  

      if (start_date && dueTask) {
        dispatch(setDateTaskPicker({ startTask:start_date, dueTask }));
      }
    }
  }, [dispatch, date]);



  const handleClose = () => setOpen(false);


  const handleSubmit = async () => {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - 24*60*60*1000);

    const endDateToDateFormat = moment(
      taskDatePicker.dueTask,
      "MMMM D, YYYY - h:mm a"
    ).toDate();





    
    let data: SendDateTaskType = {
      task_start_date: taskDatePicker.startTask,
      task_due_date: taskDatePicker.dueTask,
      workspaceId: workspaceId,
      folderId: folderId,
      listId: listId,
      taskId:taskId
    };




    if (data&&getSingleList&&getSingleList.list_start_date&&getSingleList.list_due_date) {
      console.log(getSingleList.list_start_date,"got list date");
      
      const startListFormat = moment(
        getSingleList?.list_start_date,
        "MMMM D, YYYY - h:mm a"
      ).toDate();


      const dueListFormat = moment(
        getSingleList?.list_due_date,
        "MMMM D, YYYY - h:mm a"
      ).toDate();


      if (endDateToDateFormat<startListFormat){
        toast({
          title: "date is not valid ",
          variant: "destructive",
        });
      }else if(endDateToDateFormat>dueListFormat){
        toast({
          title: "date is not valid ",
          variant: "destructive",
        });
      }else {
        const response = await onUpdateDateTask(data).unwrap();
       

        if (!response) {
          toast({
            title: "error in updating",
            variant: "destructive",
          });
        }else {
          handleClose();
          dispatch(setDateTaskPickerNull({startTask:null,dueTask:null}))
        }     
      }
    }
  };




  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
      <CalendarDaysIcon className="ml-2 h-4 w-4 shrink-0  opacity-50 " />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex flex-col justify-center items-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
        <div className="w-full flex flex-col items-center justify-center gap-4 ">
          <Input className="text-center dark:border-none border-none " placeholder={`${listStartSlice}-${listDueSlice}`} readOnly/>
    
         <Button className="mb-4 w-[90%] mx-auto" onClick={handleSubmit}>save</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
