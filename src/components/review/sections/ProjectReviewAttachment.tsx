import { useContext } from "react";
import { ReviewContext } from "@/app/context/reviewr.context";
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

interface Props {}

const ProjectReviewAttachment = ({}: Props) => {
  const { project } = useContext(ReviewContext);
  return (
    <div className="space-y-2">
      {project.attachments.map((attachment) => (
        <div
          key={attachment.fileId}
          className={`flex items-center justify-between p-3 rounded-md dark:bg-background transition-all`}
        >
          <a
            href={attachment.url}
            className="text-blue-400 hover:underline text-sm font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            {attachment.name}
          </a>
          <p className={`text-xs `}>
            Uploaded by {attachment.uploadedBy} on{" "}
            {formatDate(attachment.uploadedAt)}
          </p>
        </div>
      ))}
    </div>
  );
};
export default ProjectReviewAttachment;
