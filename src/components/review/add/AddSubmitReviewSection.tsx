import { Card, CardContent } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reviewSubmitSchema } from "./schema/submitReview.schema";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { FC, useContext, useState } from "react";

import ProjectFeatureStatus from "../sections/ProjectFeatureStatus";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useSubmitReviewerReviewMutation } from "@/app/redux/api/FolderApi";
import { ReviewContext } from "@/app/context/reviewr.context";

interface Props {
  handleClose: () => void;
}

const SubmitReviewForm: FC<Props> = ({ handleClose }) => {
  const { project } = useContext(ReviewContext);
  console.log(project,"hello")
  const [isStatus, setStatus] = useState<
    "Rejected" | "Completed" | "Approved" | "Pending"
  >(project && project.status ? project.status : "Pending");

  const [submitReviewerReview] = useSubmitReviewerReviewMutation();
  const form = useForm<z.infer<typeof reviewSubmitSchema>>({
    resolver: zodResolver(reviewSubmitSchema),
    defaultValues: {
      suggestion: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof reviewSubmitSchema>) => {
    try {
      const response = await submitReviewerReview({
        approvalStatus: isStatus,
        reviewId: project.id,
        workspaceId: project.workspaceId,
        folderId: project.folderId,
        listId: project.listId,
        suggestion: data.suggestion,
        approved: isStatus === "Approved" ? true : false,
      });

      if (response) {
        toast({
          title: "updated ",
          variant: "destructive",
        });
        handleClose();
      }
    } catch (error: any) {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mb-7 p-0 pt-6 flex dark:bg-background dark:text-white dark:gap-4 pr-8">
      <Card className="w-full mx-auto border-0 shadow-lg">
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-6"
            >
              <FormField
                control={form.control}
                name="suggestion"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Suggestion:</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={`Enter message..`}
                        className="resize-y min-h-[100px]   border border-border dark:bg-gray-800/30 focus:border-transparent"
                      />
                    </FormControl>
                    <FormDescription>
                      Provide your feedback or suggestions for the feature
                      (approved or rejected).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-4">
                <ProjectFeatureStatus
                  setStatus={setStatus}
                  project_status={isStatus}
                />
                <Button disabled={isStatus === "Pending"} type="submit">
                  Submit Review
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubmitReviewForm;
