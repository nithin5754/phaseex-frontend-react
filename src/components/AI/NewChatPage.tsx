
import { AISearchBar, ChatBar, EmptyPage } from "./index";

const NewChatPage = () => {
  return (
    <div className="flex flex-col justify-between    lg:w-3/4 m-auto">

  {/* <EmptyPage/> */}
  <ChatBar/>

      <AISearchBar />

    
  </div>
  
  );
};

export default NewChatPage;
