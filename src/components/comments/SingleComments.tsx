import { ResponseCommentList } from "@/types/comments";
import { useState } from "react";
import CommentReplyForm from "./CommentReplyForm";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; 

interface Props {
  commentList: ResponseCommentList;
  activeReplyId: string | null;
  setActiveReplyId: (id: string | null) => void;
  level?: number; 
}

const SingleComments = ({
  commentList,
  activeReplyId,
  setActiveReplyId,
  level = 0,
}: Props) => {
  const isReplyOpen = commentList.id === activeReplyId;
  const [isRepliesExpanded, setRepliesExpanded] = useState(false);

  const handleReplyClick = () => {
    setActiveReplyId(isReplyOpen ? null : commentList.id);
  };

  const handleExpandReplies = () => {
    setRepliesExpanded(!isRepliesExpanded);
  };


  const variants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  return (
    <div
      className={`relative ${level > 0 ? "ml-4 md:ml-8" : ""} mb-4`}
      style={{ marginLeft: `${level * 1.5}rem` }} 
    >
      <motion.article
        className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <header className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-3">
          
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300">
              {commentList.userId.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {commentList.userId}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
             {commentList.createdAt}
              </p>
            </div>
          </div>
        </header>

        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
          {commentList.message}
        </p>

     
        <div className="flex items-center mt-3 gap-3">
          <button
            type="button"
            onClick={handleReplyClick}
            aria-label={isReplyOpen ? "Cancel reply" : "Reply to comment"}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
          >
            {isReplyOpen ? "Cancel" : "Reply"}
          </button>
          {commentList.parent === null && commentList.children?.length > 0 && (
            <button
              onClick={handleExpandReplies}
              aria-label={isRepliesExpanded ? "Collapse replies" : "Expand replies"}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
            >
              {isRepliesExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </motion.article>

    
      <AnimatePresence>
        {isReplyOpen && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="ml-4 md:ml-8 mt-2"
          >
            <CommentReplyForm
              parentId={commentList.id}
              setActiveReplyId={setActiveReplyId}
              replyTo={commentList.userId}
            />
          </motion.div>
        )}
      </AnimatePresence>

   
      <AnimatePresence>
        {isRepliesExpanded && commentList.children?.length > 0 && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3 }}
            className="mt-4 flex flex-col gap-4"
          >
            {commentList.children.map((comment: ResponseCommentList) => (
              <SingleComments
                key={comment.id}
                commentList={comment}
                activeReplyId={activeReplyId}
                setActiveReplyId={setActiveReplyId}
                level={level + 1} 
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SingleComments;