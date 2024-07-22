import { useOnCreateTopCommentMutation } from "@/app/redux/api/commentApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";



 const CommentForm = () => {

  const { id, folderId, listId, taskId, todoId } = useParams();

  
  const [input,setInput]=useState('')

  const [onCreateTopComment]=useOnCreateTopCommentMutation()


  const onAddTopComment =async(e:any)=>{
    e.preventDefault()

    if (id && folderId && listId && taskId && todoId) {
      try {
        await onCreateTopComment({ message: input, workspaceId:id, folderId, listId, taskId, todoId }).unwrap();
        setInput('');
      } catch (err) {
        console.error('Failed to add comment:', err);
      }
    }
  }
   return (
    <form className="mb-6" onSubmit={onAddTopComment}>
    <div >
        <label  className="sr-only">Your comment</label>
        <Textarea
  id="comment"
  rows={5}    
  value={input}
  placeholder="type your comment..."
  onChange={(e) => setInput(e.target.value)}
  className="px-2 w-full text-sm text-gray-900 border-0  focus:border-transparent focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-muted/50" 
/>

    </div>
    <Button type="submit"
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800 mt-4">
       post your comment
    </Button>
</form>
   )
 }
 export default CommentForm