
import { MessageCircle } from "lucide-react";
import { BoxCard } from "../card/index";
import {  PhaseexAi } from "./index";

const EmptyPage = () => {
  return (
<>
<div className="flex items-center  justify-center mb-[60px]">
    <PhaseexAi />
  </div>

  <div className="flex flex-wrap gap-4 justify-center">
    <BoxCard
      title={"Create new chat"}
      description={"Hello, create a new chat for the next section"}
      link={"#"}
      icon={MessageCircle}
    />
    <BoxCard
      title={"Create new chat"}
      description={"Hello, create a new chat for the next section"}
      link={"#"}
      icon={MessageCircle}
    />
    <BoxCard
      title={"Create new chat"}
      description={"Hello, create a new chat for the next section"}
      link={"#"}
      icon={MessageCircle}
    />
  </div>
</>
  )
}
export default EmptyPage