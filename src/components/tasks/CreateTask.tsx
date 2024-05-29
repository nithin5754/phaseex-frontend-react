import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import moment from 'moment'

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "../ui/textarea";

import { toast } from "../ui/use-toast";
import { ChevronsUpDown, Loader2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import React from "react";
import { TaskDatePickerRange } from "./index";
import { useSelector } from "react-redux";

import { selectTaskDate, setDateTaskPickerNull } from "@/app/redux/slice/taskSlice";
import { SendTaskType } from "@/features/types";
import { useOnCreateTaskMutation } from "@/app/redux/api/taskapi";
import { useAppDispatch } from "@/app/redux/api/store";


const FormSchema = z.object({
  task_title: z.string().min(2, {
    message: "task name must be at least 4 characters.",
  }),
  task_description: z.string().min(2, {
    message: "description must be at least 4 characters.",
  }),
});

interface Props {
  handleClose: () => void;
  workspaceId: string;
  folderId: string;
  listId:string
}

export function CreateForm({ handleClose, workspaceId, folderId,listId }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      task_title: "",
      task_description: "",
    },
  });
const dispatch=useAppDispatch()
  const [taskPriority, setTaskPriority] = React.useState("low");
  const [onCreateTask, { isLoading: taskLoading }] = useOnCreateTaskMutation();
 const TaskDatePicker=useSelector(selectTaskDate)
 console.log(TaskDatePicker,"het date");
 
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - 24*60*60*1000);
    const startDateToDateFormat = moment(TaskDatePicker.startList, 'MMMM D, YYYY - h:mm a').toDate();
    const endDateToDateFormat = moment(TaskDatePicker.dueList, 'MMMM D, YYYY - h:mm a').toDate();
   
 let TaskData:SendTaskType={
   task_title: data.task_title.toLowerCase(),
   task_description: data.task_description,
   priority_task: taskPriority,
   task_start_date: TaskDatePicker.startTask,
   task_due_date: TaskDatePicker.dueTask,
   workspaceId,
   folderId,
   listId
 }
   
 

    if (TaskData) {
      try {
          if(startDateToDateFormat < previousDate  ){
            toast({
              title:
                "date is not valid ",
              variant: "destructive",
            });
          }else if (endDateToDateFormat < previousDate){
            toast({
              title:
                "date is not valid ",
              variant: "destructive",
            });
          }else{
            console.log(TaskData,"data set");
            const response = await onCreateTask(TaskData).unwrap();

            dispatch(setDateTaskPickerNull)

          
            if (response.id) {
              handleClose()
        


            } else {
              toast({
                title:
                  "something went wrong while create new list please try after sometimes",
                variant: "destructive",
              });
            }
          }
      } catch (error: any) {
        if (!error.status) {
          toast({
            title: "no response",
            variant: "destructive",
          });
        } else if (error.status) {
          toast({
            title: `${error.data.message}`,
            variant: "destructive",
          });
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-5 m-auto font-sfpro  "
      >
        <FormField
          control={form.control}
          name="task_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter name of the task</FormLabel>
              <FormControl>
                <Input placeholder="eg:task-1" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="task_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description about your folder</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write a description about your task"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-center ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="dark:bg-background dark:hover:bg-secondary dark:border-border dark:border dark:text-primary"
              >
                {taskPriority}{" "}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0  opacity-50 " />{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>set priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={taskPriority}
                onValueChange={setTaskPriority}
              >
                <DropdownMenuRadioItem value="high">high</DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="medium">
                  medium
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <TaskDatePickerRange />
        </div>

        <div className="w-full flex justify-center">
          {taskLoading ? (
            <>
              <Button disabled className="w-full ">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            </>
          ) : (
            <Button
              className="bg-transparent  hover:bg-slate-800 text-black border-black border hover:text-white font-bold py-1 px-2 rounded w-1/2 dark:text-primary dark:border-border "
              type="submit"
            >
              create new task
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
