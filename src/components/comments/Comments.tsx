import SingleComment from "./SingleComments";

import CommentForm from "./CommentForm";
import { useGetAllCommentQuery } from "@/app/redux/api/commentApi";
import { useNavigate, useParams } from "react-router-dom";
import {
  ResponseCommentList,
  SendGetAllComment,
} from "@/features/types/comments";
import { useState } from "react";
import Count from "./Count";

export interface CommentItem {
  id: string;
  name: string;
  items: CommentItem[];
}

export interface CommentsList {
  items: CommentItem[];
}

interface Props {}

const Comments = ({}: Props) => {
  const { id, folderId, listId, taskId, todoId } = useParams();
  const navigate = useNavigate();
  if (!id || !folderId || !listId || !taskId || !todoId) {
    navigate(-1);
    return;
  }

  let commentSendData: SendGetAllComment = {
    workspaceId: id,
    folderId,
    listId,
    taskId,
    todoId,
  };
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const { data: getAllComment } = useGetAllCommentQuery(commentSendData,{
    pollingInterval:60000,
    refetchOnFocus:true,
    refetchOnMountOrArgChange:true
  });
 

  return (
    <div className="flex flex-col items-center mx-auto p-4">
      <Count
        workspaceId={id}
        folderId={folderId}
        listId={listId}
        taskId={taskId}
        todoId={todoId}
      />
      <div className="w-full max-w-screen-md mb-4">
        <CommentForm />
      </div>

      <div className="w-full max-w-screen-md flex flex-col gap-4">
        {getAllComment &&
          getAllComment.length > 0 &&
          getAllComment.map((comments: ResponseCommentList) => (
            <SingleComment
              key={comments.id}
              commentList={comments}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
            />
          ))}
      </div>
    </div>
  );
};
export default Comments;
