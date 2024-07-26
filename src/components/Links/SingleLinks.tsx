import { useDeleteLinkTaskMutation } from "@/app/redux/api/taskapi";
import { TaskLinkType } from "@/types/taskType";
import {  useParams } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import { Copy, Link, Trash } from "lucide-react";
import UseHandleCopyLink from "@/hooks/useLinkCopy";
import { toast } from "../ui/use-toast";

interface Props {
  link: TaskLinkType;
}

const SingleLinks = ({ link }: Props) => {
  const { id, folderId, listId, taskId } = useParams();

  if (
    !id ||
    typeof id !== "string" ||
    !folderId ||
    typeof folderId !== "string" ||
    !listId ||
    typeof listId !== "string" ||
    !taskId ||
    typeof taskId !== "string"
  ) {
    return <h1>loading...</h1>;
  }
  const [deleteLinkTask] = useDeleteLinkTaskMutation();

  const handleDeleteLink = async () => {
    try {
      let response = await deleteLinkTask({
        workspaceId: id,
        folderId,
        listId,
        taskId,
        linkId: link.id,
      }).unwrap();

      if (response) {
        toast({
          title: `link deleted`,
          variant: "destructive",
        });
      } else {
        toast({
          title: `link not deleted`,
          variant: "destructive",
        });
      }
    } catch (error) {}
  };
  return (
    <TooltipProvider key={link.id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <li className="flex items-center mb-2 text-gray-800 hover:text-gray-600 cursor-pointer dark:text-gray-300 dark:hover:text-gray-500">
            <Link className="dark:text-primary mr-2 " size={14} />
            <a href={link.link} className="">
              {link.link_name}
            </a>
          </li>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg">
          <a
            href={link.link}
            className="text-sm text-blue-500 hover:text-blue-700"
          >
            {link.link}
          </a>
          <Trash
            size={14}
            className="cursor-pointer "
            onClick={handleDeleteLink}
          />

          <Copy
            size={14}
            className="cursor-pointer "
            onClick={() => UseHandleCopyLink(link.link)}
          />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default SingleLinks;
