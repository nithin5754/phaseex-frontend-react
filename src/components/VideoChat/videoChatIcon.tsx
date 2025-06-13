import { ChefHatIcon } from "lucide-react";
import { CJModal } from "../modal/Create-Join-modal";
import { Button } from "../ui/button";
import { LottieAnimation } from "../lootie/Lootie";

const VideoChatIcon = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
      <CJModal />
      <Button className="h-[100px]">
        <LottieAnimation animationData={ChefHatIcon} height={100} width={100} />
      </Button>
    </div>
  );
};
export default VideoChatIcon;
