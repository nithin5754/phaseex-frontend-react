import { LottieAnimation } from "../lootie/Lootie";


import ChatIcon from "../../../public/json/chat-icon.json";
import { Button } from "../ui/button";

import { CJModal } from "../modal/Create-Join-modal";

const VideoChatIcon = () => {


  return (
    <div className="flex flex-row items-center justify-center gap-4">

<CJModal/>
      <Button className="h-[100px]">
        <LottieAnimation animationData={ChatIcon} height={100} width={100} />
      </Button>
    </div>
  );
};
export default VideoChatIcon;
