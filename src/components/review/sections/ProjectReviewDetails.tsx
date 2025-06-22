import { Card, CardContent } from "@/components/ui/card";

import { useContext } from "react";

import { ReviewContext } from "@/app/context/reviewr.context";

interface TabsContentProps {
  value: string;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

export default function ProjectReviewDetails({ value }: TabsContentProps) {
  const { project } = useContext(ReviewContext);
  return (
    <div className="mt-6">
      {value === "details" && (
        <Card className="bg-white dark:bg-background  border-gray-200 border border-border rounded-xl shadow-sm transition-shadow duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Feature Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Attempt:
                  </span>
                  <span className={`text-sm font-semibold px-2 py-1 `}>
                    {project.attempt}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Assignee:
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {project.assignee.name}{" "}
                    <span className="text-gray-500 dark:text-gray-400">
                      ({project.assignee.email})
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Reviewer:
                  </p>
                  {project.reviewers.map((reviewer) => (
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {reviewer.name}{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        ({reviewer.email})
                      </span>
                    </p>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Created:
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {formatDate(project.featureDueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Due Date:
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {formatDate(project.featureDueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description:
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
