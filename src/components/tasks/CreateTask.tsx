import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


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



import { SendTaskType } from "@/types";
import { useOnCreateTaskMutation } from "@/app/redux/api/taskapi";


import { CActivitySendType } from "@/types/TActivity";
import { useSelector } from "react-redux";
import { selectCurrentUserName } from "@/features/auth/authSlice";
import { useOnCreateActivityMutation } from "@/app/redux/api/activityApi";




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

  const [taskPriority, setTaskPriority] = React.useState("low");
  const [onCreateTask, { isLoading: taskLoading }] = useOnCreateTaskMutation();
  const [onCreateActivity]=useOnCreateActivityMutation() 


const currentName=useSelector(selectCurrentUserName)

 
 
  async function onSubmit(data: z.infer<typeof FormSchema>) {
   
 let TaskData:SendTaskType={
   task_title: data.task_title.toLowerCase(),
   task_description: data.task_description,
   priority_task: taskPriority,
   workspaceId,
   folderId,
   listId

 }
   
 

    if (TaskData) {
      try {
     
     
            const response = await onCreateTask(TaskData).unwrap();

      

          
            if (response.id) {
              handleClose()

              let ActivityData:CActivitySendType={
                workspaceId:response.workspaceId,
                folderId:response.folderId,
                listId:response.listId,
                taskId:response.id,
                activity:`${currentName} created task ${response.task_title} `
              }
              await onCreateActivity(ActivityData).unwrap()
            } else {
              toast({
                title:
                  "something went wrong while create new list please try after sometimes",
                variant: "destructive",
              });
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
