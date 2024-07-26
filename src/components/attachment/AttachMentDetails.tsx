import { useOnDeleteSingleAttachmentMutation } from "@/app/redux/api/attachmentApi"
import { Attachment } from "@/types/attachment"
import { Trash } from "lucide-react"
import { Link, useParams } from "react-router-dom"

interface Props {
  attachment:Attachment
}

const AttachmentDetails = ({ attachment }: Props) => {
  let {id,folderId,listId,taskId}=useParams()
  const [onDeleteSingleAttachment]=useOnDeleteSingleAttachmentMutation()
  
  const handleDelete=async(attachmentId:string)=>{
     if(id&&folderId&&listId&&taskId){
     await onDeleteSingleAttachment({workspaceId:id,folderId,listId,taskId,attachment_id:attachmentId}).unwrap()
     }

  }
  return (
    <div className="flex flex-col w-full gap-4 items-center">
      <div className="text-center">
        <h1 className="font-sfpro text-lg dark:text-primary">{attachment.name}</h1>
      </div>

      <div className="w-[300px] h-[150px]">
        <img src={attachment.url} alt={attachment.name} className="w-full h-full object-cover" />
      </div>

      <div className="text-center">
        <p className="dark:text-primary">{attachment.description}</p>
      </div>

      <div className="flex gap-4 items-center">
        <button onClick={()=>handleDelete(attachment.id)}><Trash className="cursor-pointer dark:text-primary" /></button>
        <Link to={attachment.url} target="_blank" rel="noopener noreferrer" className="dark:text-primary cursor-pointer">
          View Full Photo
        </Link>
      </div>
    </div>
  )
}

export default AttachmentDetails
