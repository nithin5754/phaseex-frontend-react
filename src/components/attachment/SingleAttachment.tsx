import { Attachment } from "@/types/attachment";
import { PinContainer } from "../aceternityuI/3Dcard/PinContainer";
import { Pin, TrashIcon } from "lucide-react";

import { ViewMoreAttachmentModal } from "../modal/file-modal";
import { useOnDeleteSingleAttachmentMutation } from "@/app/redux/api/attachmentApi";
import { useParams } from "react-router-dom";
import { toast } from "../ui/use-toast";

interface Props {
  attachment: Attachment;
}

const SingleAttachment = ({ attachment }: Props) => {
  let { id, folderId, listId, taskId } = useParams();

  const [onDeleteSingleAttachment] = useOnDeleteSingleAttachmentMutation();

  const handleDelete = async (attachmentId: string) => {
    if (id && folderId && listId && taskId) {
      let isDeleted = await onDeleteSingleAttachment({
        workspaceId: id,
        folderId,
        listId,
        taskId,
        attachment_id: attachmentId,
      }).unwrap();

      if (isDeleted) {
        toast({
          title: "file deleted    ",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex flex-col">
      <PinContainer title={attachment.name} href={attachment.url}>
        <div
          className="flex  flex-col  tracking-tight sm:basis-1/2 max-w-[400px]  max-h-[400px] "
          onClick={() => console.log(attachment.url, "hello")}
        >
          <h3 className="max-w-xs dark:text-primary text-center">
            <Pin size={18} className="text-slate-500" /> {attachment.name}
          </h3>
      
          <div className="w-[200px]  h-[150px] rounded-lg mt-4  ">
            <img src={attachment.url} className="w-full h-full  object-fit" />
          </div>
        </div>
      </PinContainer>

      <div className="flex mx-auto gap-2 my-4">
        <button
          className="bg-transparent text-primary hover:bg-transparent text-slate-300 "
          onClick={() => handleDelete(attachment.id)}
        >
          <TrashIcon size={18} />
        </button>

        <ViewMoreAttachmentModal attachment={attachment} />
      </div>
    </div>
  );
};
export default SingleAttachment;
