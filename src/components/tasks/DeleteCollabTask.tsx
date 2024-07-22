import {
  SendAddCollabTaskType,
  useDeleteCollaboratorToTaskAssigneeMutation,
} from "@/app/redux/api/taskapi";

import { DeleteIcon } from "lucide-react";


interface Props {
  checkingDetails: SendAddCollabTaskType;
}

const DeleteCollabTask = ({ checkingDetails }: Props) => {
  const [deleteCollaboratorToTaskAssignee] =
    useDeleteCollaboratorToTaskAssigneeMutation();
  const handleDelete = async () => {
    let sendResponseData: SendAddCollabTaskType = {
      workspaceId: checkingDetails.workspaceId,
      folderId: checkingDetails.folderId,
      listId: checkingDetails.listId,
      taskId: checkingDetails.taskId,
      collabId: checkingDetails.collabId,
    };

 await deleteCollaboratorToTaskAssignee(
      sendResponseData
    ).unwrap();
 
      

  };

  return <DeleteIcon size={18} onClick={handleDelete} />;
};
export default DeleteCollabTask;
