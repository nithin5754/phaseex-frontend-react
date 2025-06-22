import { ReviewContext } from "@/app/context/reviewr.context";
import { Card, CardContent } from "@/components/ui/card";

import { useContext } from "react";

interface TabsContentProps {

}

export default function ProjectReviewMessage({  }: TabsContentProps) {

  const {project}=useContext(ReviewContext)
  return (
    <div className="mt-6">
      <Card className="bg-white dark:bg-background  border-gray-200 border border-border rounded-xl shadow-sm transition-shadow duration-300">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Messages
          </h3>
          <div className="grid grid-cols-1 gap-8">
            {project ? (
              project.message.map((msg, i) => (
                <div key={i} className="space-y-4">
                  <div className="py-2 px-4 bg-gray-900/50 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {msg || "No description provided."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>No messages</h1>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
