import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./schema/projectReviewForm.schema";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetReviewByListIdQuery,
  useUpdateReviewListByManagerMutation,
  SendFeatureResendReviewByManagerDTO,
} from "@/app/redux/api/FolderApi";
import { useGetSingleListQuery } from "@/app/redux/api/listapi";
import { toast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { Loader2, Trash2, Plus, Upload } from "lucide-react";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AddResendManagerSendForm = () => {
  const { id, folderId, listId } = useParams();
  const [updateReviewListByManager] = useUpdateReviewListByManagerMutation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: list } = useGetSingleListQuery(
    { workspaceId: id!, folderId: folderId!, listId: listId! },
    { skip: !listId || !folderId || !id }
  );

  const { data: getReviewByListId } = useGetReviewByListIdQuery(
    { workspaceId: id!, folderId: folderId!, listId: listId! },
    { skip: !listId || !folderId || !id }
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messages: [""],
      file: undefined,
    },
  });

  const { fields, append, remove } = useFieldArray<any>({
    control: form.control,
    name: "messages",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      if (
        getReviewByListId &&
        getReviewByListId?.status === "Rejected" &&
        list
      ) {
        const data: SendFeatureResendReviewByManagerDTO = {
          listId: list.id,
          folderId: list.folderId,
          workspaceId: list.workspaceId,
          message: values.messages, 
        };

        const result = await updateReviewListByManager(data).unwrap();
        toast({
          title: result ? "Feature sent for review" : "Error sending feature",
          variant: result ? "default" : "destructive",
        });
        if (result) {
          navigate(`/space/${list.workspaceId}/folders/${list.folderId}`, {
            replace: true,
          });
        }
      } else {
        toast({
          title: "Feature already sent for review! Please wait.",
          variant: "destructive",
        });

        navigate(`/space/${id}/folders/${folderId}`, {
          replace: true,
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send feature";
      toast({
        title: `Error: ${errorMessage}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container min-h-screen mb-7 p-0 pt-6 flex  dark:bg-background dark:text-white dark:gap-4 pr-8  ">
      <Card className="w-full mx-auto rounded-2xl border border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Send Feature for Review
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Messages</h3>
                <div className="flex flex-wrap mx-auto ">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="w-[400px] flex flex-col sm:flex-row items-start sm:items-end gap-4 animate-in fade-in-50"
                    >
                      <FormField
                        control={form.control}
                        name={`messages.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel className="text-sm font-medium">
                              Message {index + 1}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder={`Enter message ${index + 1}`}
                                className="resize-y min-h-[100px]   border border-border dark:bg-gray-800/30"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            aria-label={`Remove message ${index + 1}`}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className="dark:text-white">
                              Remove Message
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this message? This
                              action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="dark:text-white">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={() => remove(index)}>
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append("")}
                  className="mt-2 flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Another Message
                </Button>
              </div>

              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Attachment
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-col items-center justify-center w-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-primary transition-colors">
                        <Upload className="h-8 w-8 text-gray-500 mb-2" />
                        <Input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                        <label
                          htmlFor="file-upload"
                          className="cursor-pointer text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                        >
                          {field.value
                            ? field.value.name
                            : "Click to upload or drag and drop"}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                          Max file size: 10MB
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="sticky bottom-0 bg-white dark:bg-background py-4 border-t border-gray-200 dark:border-gray-700 mt-6">
                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddResendManagerSendForm;
