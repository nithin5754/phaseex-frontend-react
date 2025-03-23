import { useGetAllAttachmentQuery } from "@/app/redux/api/attachmentApi";
import { Attachment as AttachMentType } from "@/types/attachment";

import { useNavigate, useParams } from "react-router-dom";
import { SingleAttachment } from "./index";
import { ScrollArea } from "../ui/scroll-area";
import EmptyLootieFile from '../../../public/json/empty-file.json'
import { LottieAnimation } from "../lootie/Lootie";

const Attachment = () => {
  const { id, folderId, listId, taskId } = useParams();
  const navigate = useNavigate();
  if (!id || !folderId || !listId || !taskId) {
    navigate(-1);
    return;
  }

  const {
    data: getAllAttachment,
    error,
    isLoading,
  } = useGetAllAttachmentQuery({
    workspaceId: id,
    folderId,
    listId,
    taskId,
  });

  console.log(getAllAttachment, "attachment");
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <ScrollArea className="  w-[100%] h-[400px] rounded-xl bg-muted/50 py-4 ">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Files</h4>
        <div className="w-full flex flex-wrap  mx-auto justify-center items-center">
        <div className="flex m-auto items-center justify-center">
           <LottieAnimation animationData={EmptyLootieFile} height={200} width={200}/>
         </div> 
  </div>
      </div>
    </ScrollArea>
    )
  }

  const attachments: AttachMentType[] = getAllAttachment?.attachmentLists || [];

  return (
    <ScrollArea className="  w-[100%] h-[500px] rounded-xl bg-muted/50 py-4 ">
        <div className="p-4">
          <h4 className="mb-4 text-sm font-medium leading-none">Files</h4>
          <div className="w-full flex flex-wrap  mx-auto justify-center items-center">
          {attachments && attachments.length > 0 ? (
            attachments.map((attachment) => (
              <SingleAttachment attachment={attachment} />
            ))
          ) : (
           <div className="flex m-auto items-center justify-center">
             <LottieAnimation animationData={EmptyLootieFile} height={200} width={200}/>
           </div>    
                )}
    </div>
        </div>
      </ScrollArea>
  );
};
export default Attachment;
