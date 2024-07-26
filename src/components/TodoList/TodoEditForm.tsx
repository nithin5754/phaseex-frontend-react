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

import { SendEditTodoTask } from "@/types/TodoType";
import { toast } from "../ui/use-toast";
import { useOnUpdateTaskTodoMutation } from "@/app/redux/api/todoapi";
import { useOnCreateActivityMutation } from "@/app/redux/api/activityApi";
import { CActivitySendType } from "@/types/TActivity";
import { useSelector } from "react-redux";
import { selectCurrentUserName } from "@/features/auth/authSlice";

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
  todoId: string;
  todo: string;
}

export function EditTodo({
  handleClose,
  workspaceId,
  folderId,
  listId,
  taskId,
  todoId,
  todo,
}: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      todo: todo,
    },
  });

  const [onUpdateTaskTodo, { isLoading: todoLoading }] =
    useOnUpdateTaskTodoMutation();
  const [onCreateActivity] = useOnCreateActivityMutation();
  const currentName = useSelector(selectCurrentUserName);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let TaskTodoData: SendEditTodoTask = {
      todo: data.todo,
      taskId,
      workspaceId,
      folderId,
      listId,
      todoId,
    };

    if (TaskTodoData) {
      try {
        const response = await onUpdateTaskTodo(TaskTodoData).unwrap();

        if (response) {
          handleClose();

          let ActivityData: CActivitySendType = {
            workspaceId: workspaceId,
            folderId: folderId,
            listId: listId,
            taskId: taskId,
            activity: `${currentName} edited todo name ${todo} to ${data.todo}  `,
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
