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

import { SendTodoTask } from "@/features/types/TodoType";
import { toast } from "../ui/use-toast";
import { useOnCreateTaskTodoMutation } from "@/app/redux/api/todoapi";
import { useOnCreateActivityMutation } from "@/app/redux/api/activityApi";
import { CActivitySendType } from "@/features/types/TActivity";
import { selectCurrentUserName } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";

const FormSchema = z.object({
  todo: z.string().min(2, {
    message: "todo name must be at least 4 characters.",
  }),
});

interface Props {
  handleClose: () => void;
  workspaceId: string;
  folderId: string;
  listId: string;
  taskId: string;
}

export function CreateTodo({
  handleClose,
  workspaceId,
  folderId,
  listId,
  taskId,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      todo: "",
    },
  });

  const [onCreateTaskTodo, { isLoading: todoLoading }] =
    useOnCreateTaskTodoMutation();

  const currentName = useSelector(selectCurrentUserName);

  const [onCreateActivity] = useOnCreateActivityMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let TaskTodoData: SendTodoTask = {
      todo: data.todo,
      taskId,
      workspaceId,
      folderId,
      listId,
    };

    if (TaskTodoData) {
      try {
        const response = await onCreateTaskTodo(TaskTodoData).unwrap();

        if (response.id) {
          handleClose();

          let ActivityData: CActivitySendType = {
            workspaceId: response.workspaceId,
            folderId: response.folderId,
            listId: response.listId,
            taskId: response.taskId,
            activity: `${currentName} created todo ${response.todo} `,
          };
          await onCreateActivity(ActivityData).unwrap();
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
          name="todo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter name of the todo</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg:todo-1"
                  {...field}
                  className="w-full dark:text-primary"
                />
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
