import { ScrollArea } from "../ui/scroll-area";
import { Chat } from "./Chat/Chat";

const ChatBar = () => {
  return (
    <ScrollArea className="h-[500px] w-full  flex m-auto">
      <div className="p-4">
        <Chat />
      </div>
    </ScrollArea>
  );
};
export default ChatBar;
