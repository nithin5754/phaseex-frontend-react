import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge"; 
import { Card, CardContent } from "@/components/ui/card"; 
import { cn } from "@/lib/utils"; 
import { User } from "lucide-react";
import { ProjectReviewer } from "../review.type";



interface ProjectReviewerReviewsAttemptLogsProps {
  reviewers: ProjectReviewer[];
}

const ProjectReviewerReviewsAttemptLogs = ({
  reviewers,
}: ProjectReviewerReviewsAttemptLogsProps) => {
  const statusStyles: Record<ProjectReviewer["approvalStatus"], string> = {
    Approved: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-200 dark:border-green-800",
    Rejected: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-200 dark:border-red-800",
    Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
  };

  const formatReviewDate = (date: string | Date | undefined) => {
    if (!date) return null;
    try {
      return format(new Date(date), "MMM dd, yyyy 'at' h:mm a");
    } catch {
      return null;
    }
  };

  return (
    <div className="my-4 space-y-3 rounded-xl bg-gradient-to-b from-background to-background/80 p-4 dark:from-background/90 dark:to-background/70 border border-border/50 shadow-sm">
      {reviewers.length === 0 ? (
        <Card className="border-none bg-transparent shadow-none">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No reviewer logs available.
            </p>
          </CardContent>
        </Card>
      ) : (
        reviewers.map((reviewer) => (
          <Card
            key={reviewer.id}
            className="group relative overflow-hidden border border-border/50   dark:bg-background/30 "
            role="article"
            aria-labelledby={`reviewer-${reviewer.id}-name`}
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-background " />
            <CardContent className="p-4 sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
                <Avatar className="h-12 w-12 flex-shrink-0 rounded-full border border-border/50">
                  <AvatarImage
                    src={reviewer.avatar}
                    alt={`${reviewer.name}'s avatar`}
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback className="flex items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <User className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">{reviewer.name[0]}</span>
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                    <h3
                      id={`reviewer-${reviewer.id}-name`}
                      className="truncate text-base font-semibold text-foreground"
                    >
                      {reviewer.name}
                    </h3>
                    <p className="truncate text-sm text-muted-foreground">
                      {reviewer.email}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
                        statusStyles[reviewer.approvalStatus]
                      )}
                      aria-label={`Status: ${reviewer.approvalStatus}`}
                    >
                      {reviewer.approvalStatus}
                    </Badge>
                    {formatReviewDate(reviewer.reviewedAt) && (
                      <p
                        className="text-xs text-muted-foreground"
                        aria-label={`Reviewed on ${formatReviewDate(reviewer.reviewedAt)}`}
                      >
                        {formatReviewDate(reviewer.reviewedAt)}
                      </p>
                    )}
                  </div>
                  {reviewer.suggestion && (
                    <p className="mt-2 rounded-md bg-muted/50 p-2 text-sm text-foreground/90">
                      <span className="font-medium text-foreground">Suggestion: </span>
                      {reviewer.suggestion}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ProjectReviewerReviewsAttemptLogs;