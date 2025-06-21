import {  TabsList, TabsTrigger } from "@radix-ui/react-tabs"



const ProjectReviewTabs = () => {
  return (
      <TabsList
                className={`grid grid-cols-3 sm:grid-cols-5 gap-2 p-2 rounded-lg mb-6 dark:bg-background w-full  `}
              >
                <TabsTrigger
                  value="details"
                  className={`text-sm font-semibold rounded-md dark:bg-background border border-border py-2`}
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="reviewers"
                  className={`text-sm font-semibold rounded-md dark:bg-background border border-border py-2`}
                >
                  Reviewers
                </TabsTrigger>
                       <TabsTrigger
                  value="messages"
                  className={`text-sm font-semibold rounded-md dark:bg-background border border-border py-2`}
                >
                  Messages
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className={`text-sm font-semibold rounded-md dark:bg-background border border-border py-2`}
                >
                  Comments
                </TabsTrigger>
                <TabsTrigger
                  value="attachments"
                  className={`text-sm font-semibold rounded-md dark:bg-background border border-border py-2`}
                >
                  Attachments
                </TabsTrigger>

          
              </TabsList>
  )
}
export default ProjectReviewTabs