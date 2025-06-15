import { useRef, useState } from "react";
import { FaPaperPlane, FaTimes } from "react-icons/fa";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { ResponseWorkspaceDataType } from "@/app/redux/api/spaceApi";

const ChatBox = ({
  setMessageOpen,
  details,
}: {
  setMessageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  details: ResponseWorkspaceDataType;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState<
    { username: string; read: string[]; text: string; isUser: boolean }[]
  >([
    {
      username: "nithin joji",
      text: "Hello! How can I help you?",
      isUser: false,
      read: ["amala", "resvin"],
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages([
        ...messages,
        { text: message, isUser: true, read: ['testing'], username: "hello " },
      ]);
      setMessage("");
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  return (
    <div className="fixed bottom-4 right-12 w-full max-w-[360px] h-[450px] bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col md:w-[360px] md:h-[500px] z-50">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <img
            src={`https://placehold.co/40x40?text=${
              details?.title[0].toUpperCase() ?? ""
            }`}
            className="h-10 w-10 rounded-full object-cover"
            alt="profile image"
          />
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
              {details?.title}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Avg. response time: 1 hour
            </p>
          </div>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          aria-label="Close chat"
          onClick={() => setMessageOpen(false)}
        >
          <FaTimes className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-800"
      >
        <div className="space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={` max-w-[70%] flex gap-2  rounded-lg p-3 text-sm ${
                  msg.isUser
                    ? "bg-sky-500 text-white"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                }`}
              >
                <img
                  src={`https://placehold.co/40x40?text=${
                    msg.username[0].toUpperCase() ?? ""
                  }`}
                  className="h-6 w-6 rounded-full object-cover "
                  alt="profile image"
                />
                <div className="flex flex-col my-auto">
                  <div className="text-gray-500">@{msg?.username}</div>{" "}
                  <div className="">{msg.text} </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center p-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-b-lg"
      >
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 text-sm bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 focus:ring-sky-500 dark:focus:ring-sky-400 rounded-l-lg"
        />
        <Button
          type="submit"
          className="bg-sky-500 hover:bg-sky-600 text-white rounded-r-lg px-4 py-2 ml-1"
          aria-label="Send message"
        >
          <FaPaperPlane className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
