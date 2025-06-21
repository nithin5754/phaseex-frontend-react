import { Project } from "../review.type"
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  interface Props {
    project:Project
  }

const ProjectReviewAttachment = ({project}:Props) => {
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
                        <p
                          className={`text-xs `}
                        >
                          Uploaded by {attachment.uploadedBy} on{" "}
                          {formatDate(attachment.uploadedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
  )
}
export default ProjectReviewAttachment