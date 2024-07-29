


import { useEffect, useRef } from "react";

import { useSelector } from "react-redux";
import { selectAllPrompt } from "@/app/redux/slice/geminiSlice";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Copy, Loader } from "lucide-react";
import { useParams } from "react-router-dom";




export function ChatList() {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
 const {groupId}=useParams()

const promptList=useSelector(selectAllPrompt)



  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({behavior:'smooth'})
      
    }


  }, [promptList]);


  const handleCopyText=async(text:string|null)=>{
    
    if(text){
      await navigator.clipboard.writeText(text)
    }
  }




  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col p-4">
    <div className="w-full flex flex-col gap-4">
      {groupId&&promptList&&promptList.find((prompt)=>(prompt.groupId===groupId))?.prompt.map((message, index) => (
        <div key={index} className="p-4 rounded-lg  shadow-md">
         <Markdown remarkPlugins={[remarkGfm]}>{message.question}</Markdown>
          <h1 className="text-gray-600">Answer:</h1>
          <div className="flex items-end justify-end">
          {
           message.answer?(
            <div className="dark:bg-muted/50 max-w-[400px]  rounded-md px-4 py-2 ">
            <Markdown remarkPlugins={[remarkGfm]}>{message.answer}</Markdown>
            <Copy
            size={14}
            className="cursor-pointer "
            onClick={()=>  handleCopyText(message.answer)}
          />
          </div>
           ):(
            <h1 >
            <Loader  size={24} className="animate-spin" />
          </h1>
           )
          }
          </div>

        </div>
      ))}
    </div>
    <div className="flex-grow" ref={messagesContainerRef}></div>
  </div>
    
  );
}
