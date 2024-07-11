import * as React from "react";
import { format } from "date-fns";
import {
  CalendarDaysIcon,
  Calendar as CalendarIcon,
  ChevronsUpDown,
} from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppDispatch } from "@/app/redux/api/store";
import { selectListDate, setDateListPicker, setDatePickerNull } from "@/app/redux/slice/listSlice";
import {
  SendDateListType,
  useOnUpdateDateListMutation,
} from "@/app/redux/api/listapi";
import { toast } from "../ui/use-toast";
import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import moment from "moment";

interface Props {
  start_date: Date;
  due_date: Date;
  folderId: string;
  workspaceId: string;
  listId: string;
}

export function UpdateDateList({
  className,
  start_date,
  due_date,
  folderId,
  workspaceId,
  listId,
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: start_date,
    to: due_date,
  });

  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

  const listDatePicker = useSelector(selectListDate);

  const handleClose = () => setOpen(false);

  const [onUpdateDateList] = useOnUpdateDateListMutation();

  React.useEffect(() => {
    if (date && date.from && date.to) {
  

      const startList = format(date.from, "MMMM d, yyyy - h:mm a");
      const dueList = format(date.to, "MMMM d, yyyy - h:mm a");

      if (startList && dueList) {
        dispatch(setDateListPicker({ startList, dueList }));
      }
    }
  }, [dispatch, date?.from, date?.to, date]);

  const handleSubmit = async () => {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - 24*60*60*1000);
    const startDateToDateFormat = moment(
      listDatePicker.startList,
      "MMMM D, YYYY - h:mm a"
    ).toDate();
    const endDateToDateFormat = moment(
      listDatePicker.dueList,
      "MMMM D, YYYY - h:mm a"
    ).toDate();
    let data: SendDateListType = {
      list_start_date: listDatePicker.startList,
      list_due_date: listDatePicker.dueList,
      workspaceId: workspaceId,
      folderId: folderId,
      listId: listId,
    };

    if (data) {
      if (
        startDateToDateFormat < previousDate 
      ) {
        toast({
          title: "date is not valid ",
          variant: "destructive",
        });
      }else if (endDateToDateFormat<previousDate){
        toast({
          title: "date is not valid ",
          variant: "destructive",
        });
      }else {
        const response = await onUpdateDateList(data).unwrap();
       

        if (!response) {
          toast({
            title: "error in updating",
            variant: "destructive",
          });
        }else {
          handleClose();
          dispatch(setDatePickerNull({startList:null,dueList:null}))
        }     
      }
    }
  };

  return (
    <div className={cn("grid gap-2 font-sfpro ", className)}>
      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild >
          <CalendarDaysIcon className="ml-2 h-4 w-4 shrink-0  opacity-50 " />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0  mr-4" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
          <div className="flex gap-2 items-center justify-center mb-4">
          <Button className=" p-2 font-sfpro" onClick={handleClose}>close</Button>
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
                <span className="">Pick a date</span>
              )}
            </Button>

            <Button onClick={handleSubmit}>save</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
