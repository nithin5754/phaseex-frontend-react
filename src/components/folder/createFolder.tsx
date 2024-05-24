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

import React from "react";

import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { FolderDataType, useOnCreateFolderMutation } from "@/app/redux/api/FolderApi";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  folder_name: z.string().min(2, {
    message: "folder name must be at least 4 characters.",
  }),
  folder_description: z.string().min(2, {
    message: "description must be at least 4 characters.",
  }),
});

interface Props {
  handleClose: () => void;
  spaceId: string;
}

export function FolderForm({ handleClose, spaceId }: Props) {
  let workspaceId = "";
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      folder_name: "",
      folder_description: "",
    },
  });

  const [onCreateFolder, { isLoading }] = useOnCreateFolderMutation();

  // export interface FolderDataType {
  //   folder_title: string;
  //   folder_description: string;
  //   workspaceId: string;
  // }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    let folderData: FolderDataType = {
      workspaceId: spaceId,
      folder_description: data.folder_description,
      folder_title: data.folder_name,
    };

    console.log(folderData, folderData);

    if (folderData) {
      try {
        const response = await onCreateFolder(folderData).unwrap();
        console.log(response, "create folder");
        if (response.id) {
          // navigate('/space')
          handleClose();
        } else {
          toast({
            title: "something went wrong",
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
        className="w-full space-y-5 m-auto  "
      >
        <FormField
          control={form.control}
          name="folder_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter name of the folder</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg:folder-1"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="folder_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description about your folder</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="write a description about your folder"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full flex justify-center">
          {isLoading ? (
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
              create new folder
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
