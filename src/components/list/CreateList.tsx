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
import { SendListData, useOnCreateListMutation } from "@/app/redux/api/listapi";
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
import { ListDatePicker } from "./index";
import { useSelector } from "react-redux";
import { selectListDate } from "@/app/redux/slice/listSlice";


const FormSchema = z.object({
  list_title: z.string().min(2, {
    message: "list name must be at least 4 characters.",
  }),
  list_description: z.string().min(2, {
    message: "description must be at least 4 characters.",
  }),
});

interface Props {
  handleClose: () => void;
  spaceId: string;
  folderId: string;
}

export function ListForm({ handleClose, spaceId, folderId }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      list_title: "",
      list_description: "",
    },
  });

  const [listPosition, setListPosition] = React.useState("low");
  const [onCreateList, { isLoading: listLoading }] = useOnCreateListMutation();
 const listDatePicker=useSelector(selectListDate)
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const currentDate = new Date();
    const previousDate = new Date(currentDate.getTime() - 24*60*60*1000);
    const startDateToDateFormat = moment(listDatePicker.startList, 'MMMM D, YYYY - h:mm a').toDate();
    const endDateToDateFormat = moment(listDatePicker.dueList, 'MMMM D, YYYY - h:mm a').toDate();

    let listDataSet: SendListData = {
      workspaceId: spaceId,
      folderId: folderId,
      listData: {
        list_title: data.list_title,
        list_description: data.list_description,
        priority_list: listPosition,
        list_start_date:listDatePicker.startList,
        list_due_date:listDatePicker.dueList
      },
    };

    if (listDataSet) {
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
            const response = await onCreateList(listDataSet).unwrap();

            if (response.id) {
              handleClose();
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
          name="list_title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter name of the listr</FormLabel>
              <FormControl>
                <Input placeholder="eg:list-1" {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="list_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description about your folder</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write a description about your list"
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
                {listPosition}{" "}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0  opacity-50 " />{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>set priority</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={listPosition}
                onValueChange={setListPosition}
              >
                <DropdownMenuRadioItem value="high">high</DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="medium">
                  medium
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="low">low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <ListDatePicker />
        </div>

        <div className="w-full flex justify-center">
          {listLoading ? (
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
              create new list
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
