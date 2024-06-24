import { SendAddCollabListType, useDeleteCollaboratorToListAssigneeMutation } from "@/app/redux/api/listapi"

import { DeleteIcon } from "lucide-react"


interface Props {
  checkingDetails:SendAddCollabListType
}

  const DeleteCollabListAssignee = ({checkingDetails}:Props) => {
    const [deleteCollaboratorToListAssignee]=useDeleteCollaboratorToListAssigneeMutation()

const handleDelete=async()=>{

  let sendResponseData:SendAddCollabListType={
    workspaceId:checkingDetails.workspaceId,
    folderId:checkingDetails.folderId,
    listId:checkingDetails.listId,
    collabId:checkingDetails.collabId,
  }

 await deleteCollaboratorToListAssignee(sendResponseData).unwrap()


}

    return (
      <DeleteIcon size={18} onClick={handleDelete} />
    )
  }
  export default DeleteCollabListAssignee