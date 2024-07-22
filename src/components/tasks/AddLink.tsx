

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

import { Loader2 } from "lucide-react";



import { toast } from "../ui/use-toast";

import { SendDLinkTaskType } from "@/features/types/taskType";
import { useAddLinkToTaskMutation } from "@/app/redux/api/taskapi";

const FormSchema = z.object({
  link_name: z.string().min(6, {
    message: "todo name must be at least 6 characters.",
  }),
  link: z.string()
});

interface Props {
  handleClose: () => void;
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId: string;
}

export function AddLink({
  handleClose,
  workspaceId,
  folderId,
  listId,
  taskId,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      link: "",
      link_name:""
    },
  });

  const [addLinkToTask, { isLoading: todoLoading }] =
  useAddLinkToTaskMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let TaskTodoData: SendDLinkTaskType = {
      taskId,
      workspaceId,
      folderId,
      listId,
      link_name:data.link_name,
      link:data.link
    };

    if (TaskTodoData) {
      try {
        console.log(TaskTodoData, "todo data set");
        const response = await addLinkToTask(TaskTodoData).unwrap();

        if (response) {
          handleClose();
        } else {
          toast({
            title:
              "something went wrong while create new todo task please try after sometimes",
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
          name="link_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-primary">Enter name of the link</FormLabel>
              <FormControl>
                <Input placeholder="eg:todo-1" {...field} className="w-full dark:text-primary " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="dark:text-primary">Enter link </FormLabel>
              <FormControl>
                <Input placeholder="eg:todo-1" {...field} className="w-full dark:text-primary" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full flex justify-center">
          {todoLoading ? (
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
              create new todo
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
