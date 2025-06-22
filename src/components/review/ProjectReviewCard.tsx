import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProjectReviewDetails from "./sections/ProjectReviewDetails";
import ProjectReviewerReviewsAttemptLogs from "./sections/ProjectReviewerLogs";
import ProjectReviewAttachment from "./sections/ProjectReviewAttachment";
import ProjectComments from "./sections/ProjectComments";
import ProjectReviewTabs from "./sections/ProjectReviewTabs";
import ProjectReviewMessage from "./sections/ProjectReviewMessage";
import { SubmitReviewerModal } from "../modal/add-reviewer-submit";
import { Button } from "../ui/button";
import { ReviewContext } from "@/app/context/reviewr.context";
import { useContext } from "react";

interface Props {}

const statusStyles = {
  "In Review": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Approved: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export default function ProjectReviewCard({}: Props) {
  const { project } = useContext(ReviewContext);
  return (
    <div className="container min-h-[83vh] mb-7 p-0  pt-6 flex  dark:bg-background dark:text-white  ">
      <div className="flex flex-col w-full p-6 m-auto font-sfpro border border-border rounded-lg">
        <header
          className={`z-10 p-4 rounded-lg mb-6  shadow-md flex justify-between items-center bg-gray-600/30`}
        >
          <div className="flex items-center  gap-4">
            <CardTitle className="text-2xl font-bold">
              {project.title.toUpperCase()}
            </CardTitle>
          </div>
          <div className="flex gap-4">
            <Button
              disabled
              variant="outline"
              className={`flex items-center gap-2 px-3 py-1 text-sm font-semibold ${
                statusStyles[project.status as keyof typeof statusStyles]
              } dark:bg-background`}
            >
              {project.status}
            </Button>

            {!project.approved&&(<SubmitReviewerModal />)}
          </div>
        </header>

        <Card className={`rounded-lg shadow-lg border-0`}>
          <CardContent className="p-6">
            <Tabs defaultValue="details" className="w-full ">
              <ProjectReviewTabs />
              <TabsContent value="details" className="mt-4">
                <ProjectReviewDetails value={"details"} />
              </TabsContent>
              <TabsContent value="messages" className="mt-4">
                <ProjectReviewMessage />
              </TabsContent>
              <TabsContent value="reviewers" className="mt-4">
                <ProjectReviewerReviewsAttemptLogs />
              </TabsContent>
              <TabsContent value="comments" className="mt-4">
                <ProjectComments />
              </TabsContent>
              <TabsContent value="attachments" className="mt-4">
                <ProjectReviewAttachment />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
