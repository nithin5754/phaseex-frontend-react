import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Project } from "./review.type";
import ProjectReviewDetails from "./sections/ProjectReviewDetails";
import ProjectReviewerReviewsAttemptLogs from "./sections/ProjectReviewerLogs";
import ProjectReviewAttachment from "./sections/ProjectReviewAttachment";
import ProjectComments from "./sections/ProjectComments";
import ProjectReviewTabs from "./sections/ProjectReviewTabs";
import ProjectFeatureStatus from "./sections/ProjectFeatureStatus";
import ProjectReviewMessage from "./sections/ProjectReviewMessage";

interface ProjectReviewCardProps {
  project: Project;
}

export default function ProjectReviewCard({ project }: ProjectReviewCardProps) {
  return (
    <div className="container min-h-[83vh] mb-7 p-0  pt-6 flex  dark:bg-background dark:text-white  ">
      <div className="flex flex-col w-full p-6 m-auto font-sfpro border border-border rounded-lg">
        <header
          className={`z-10 p-4 rounded-lg mb-6  shadow-md flex justify-between items-center bg-gray-600/30`}
        >
          <div className="flex items-center gap-4">
            <CardTitle className="text-2xl font-bold">
              {project.title.toUpperCase()}
            </CardTitle>
          </div>
          <ProjectFeatureStatus project={project} />
        </header>

        <Card className={`rounded-lg shadow-lg border-0`}>
          <CardContent className="p-6">
            <Tabs defaultValue="details" className="w-full ">
              <ProjectReviewTabs />
              <TabsContent value="details" className="mt-4">
                <ProjectReviewDetails value={"details"} project={project} />
              </TabsContent>
                   <TabsContent value="messages" className="mt-4">
                <ProjectReviewMessage project={project} />
              </TabsContent>
              <TabsContent value="reviewers" className="mt-4">
                <ProjectReviewerReviewsAttemptLogs
                  reviewers={project.reviewerLogs}
                />
              </TabsContent>
              <TabsContent value="comments" className="mt-4">
                <ProjectComments />
              </TabsContent>
              <TabsContent value="attachments" className="mt-4">
                <ProjectReviewAttachment project={project} />
              </TabsContent>

            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
