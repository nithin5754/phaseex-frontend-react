import { ResponseCommentList } from "@/features/types/comments";
import { useState } from "react";
import CommentReplyForm from "./CommentReplyForm";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  commentList: ResponseCommentList;
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null) => void;
}

const SingleComments = ({
  commentList,
  activeReplyId,
  setActiveReplyId,
}: Props) => {
  const isReplyOpen = commentList.id === activeReplyId;
  const [isRepliesExpanded, setRepliesExpanded] = useState(false);

  const handleReplyClick = () => {
    setActiveReplyId(isReplyOpen ? null : commentList.id);
  };
  const handleExpandReplies = () => {
    setRepliesExpanded(!isRepliesExpanded);
  };

  return (
    <>
      <article className="p-6 bg-white dark:bg-muted/50 shadow-sm rounded-lg">
        <footer className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {commentList.userId}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {commentList.createdAt}
              </p>
            </div>
          </div>
        </footer>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          {commentList.message}
        </p>
        <div className="flex items-center mt-4 space-x-2">
          <button
            type="button"
            onClick={handleReplyClick}
            className="text-sm text-blue-500 hover:underline dark:text-blue-400 font-medium"
          >
            Reply
          </button>
          {commentList.parent === null && (
            <button
              onClick={handleExpandReplies}
              className="text-gray-500 dark:text-gray-400"
            >
              {isRepliesExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </article>
      <>
        {isReplyOpen && (
          <CommentReplyForm
            parentId={commentList.id}
            setActiveReplyId={setActiveReplyId}
            replyTo={commentList.userId}
          />
        )}
      </>

      <div className="ml-8 flex flex-col gap-4">
        {isRepliesExpanded &&
          commentList.children &&
          commentList.children.length > 0 &&
          commentList.children.map((comments: ResponseCommentList) => {
            return (
              <SingleComments
                key={comments.id}
                commentList={comments}
                activeReplyId={activeReplyId}
                setActiveReplyId={setActiveReplyId}
              />
            );
          })}
      </div>
    </>
  );
};
export default SingleComments;
